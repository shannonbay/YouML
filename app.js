var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const OpenAI = require('openai'); // Import OpenAI from openai v4
const plantumlEncoder = require('plantuml-encoder')
const axios = require('axios');

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default, so you can omit it if it is already set
});

function extractCodeBlock(response) {
  const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/;
  const match = response.match(codeBlockRegex);

  if (match) {
    const language = match[1];
    const code = match[2];
    return { language, code };
  } else {
    return null;
  }
}

const fs = require('fs');

app.post('/generate-uml', async (req, res) => {
  try {
    const { prompt, isUpdate } = req.body;

    // Define the path to the file
    const filePath = path.join(__dirname, 'resources', 'plantUML-keywords.txt');
    let data;
    try {
      data = fs.readFileSync(filePath, 'utf8');
      console.log('File contents:', data);
    } catch (err) {
      console.error('Error reading file:', err);
    }

    // Determine the prompt based on whether it's an update
    let finalPrompt = prompt;
    let keywords = `Valid PlantUML keywords: \n\`\`\`ascii\n${data}\n\`\`\`\n`;
    if (isUpdate && lastPlantUmlCode) {
      finalPrompt = `${keywords}Here is the existing PlantUML diagram:\n\`\`\`plantuml\n${lastPlantUmlCode}\n\`\`\`\nPlease make the following changes, ensuring no syntax errors: ${prompt}`;
    } else {
      finalPrompt = `${keywords}Generate a valid PlantUML diagram for: ${prompt}. It should be free from syntax errors.`;
    }

    console.log('Final prompt:', finalPrompt);

    // Create a chat completion
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [{ role: 'user', content: finalPrompt }],
      max_tokens: 1500,
    });

    const { language, code: plantUmlCode } = extractCodeBlock(openaiResponse.choices[0].message.content.trim());

    console.log(plantUmlCode);

    if (plantUmlCode) {
      // Update the last diagram
      lastPlantUmlCode = plantUmlCode;

      // Step 2: Encode the PlantUML code
      const encodedPlantUml = plantumlEncoder.encode(plantUmlCode);

      try {
        // Step 3: Request the SVG from the PlantUML server
        const plantUmlSvgUrl = `http://www.plantuml.com/plantuml/svg/${encodedPlantUml}`;
        const plantUmlResponse = await axios.get(plantUmlSvgUrl, { responseType: 'arraybuffer' });

        // Step 4: Send both the SVG and encoded PlantUML back to the client
        res.json({
          svgData: Buffer.from(plantUmlResponse.data, 'binary').toString('utf8'),
          encodedDiagram: encodedPlantUml
        });
      } catch (error) {
        console.error('Error generating SVG from PlantUML:', error);
        // Return only the encoded diagram if SVG generation fails
        res.json({
          svgData: null,
          encodedDiagram: encodedPlantUml
        });
      }
    } else {
      res.status(400).send('No valid PlantUML code found in response');
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);  // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code);    // e.g. 'invalid_api_key'
      console.error(error.type);    // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.error(error);
    }
    res.status(500).send('Error generating UML diagram');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
