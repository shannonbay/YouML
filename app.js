const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY; // Replace with a secure secret

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

// Middleware to issue a JWT to a guest user
app.use((req, res, next) => {
  if (!req.cookies.guestToken) {
    // Create a new token for the guest user
    const guestToken = jwt.sign({ role: 'guest' }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('guestToken', guestToken, { httpOnly: true, secure: false }); // Secure should be true for HTTPS
  }
  next();
});

// Middleware to verify the guest token
function authenticateGuest(req, res, next) {
  const token = req.cookies.guestToken;

  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided');
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; // Add user info (in this case, guest) to the request
    next();
  } catch (err) {
    // just issue them a new token
    const guestToken = jwt.sign({ role: 'guest' }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('guestToken', guestToken, { httpOnly: true, secure: false }); // Secure should be true for HTTPS
    next()
  }
}

app.use(express.json({ limit: '10mb' })); // Increase payload limit for base64 images

// Configure multer to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload-image', authenticateGuest, upload.single('image'), async (req, res) => {
  console.log("upload-image Received POST");

  if (!req.file || !req.body.instructions) {
    return res.status(400).json({ error: 'No file or instructions provided' });
  }

  try {
    // Logging the data
    console.log("Image received");
    console.log("Instructions: ", req.body.instructions);

    // Use a fixed URL for the image (reverting to URL-based approach)
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg';

    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [{ role: 'user', content: [{"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            "detail": "high"
          },
        },] }],
      max_tokens: 1500,
    });
   
    console.log(openaiResponse.choices[0].message);
    res.json({
      svgData: null,
      encodedDiagram: openaiResponse.choices[0].message.content
    });
  } catch (error) {
    console.error('Error while sending image to OpenAI:', error);
    res.status(500).json({ error: 'Failed to analyze image with OpenAI API' });
  }
});

// Make sure to define authenticateGuest
function authenticateGuest(req, res, next) {
  // Authentication logic here
  next();
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


app.post('/generate-uml', authenticateGuest, async (req, res) => {
  try {
    const { prompt, isUpdate, lastPlantUmlCode } = req.body;

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
      const decodedLastPlantUML = plantumlEncoder.decode(lastPlantUmlCode);
      finalPrompt = `${keywords}\nHere is the existing PlantUML diagram:\n\`\`\`plantuml\n${decodedLastPlantUML}\n\`\`\`\nPlease make the following changes, ensuring no syntax errors: ${prompt}`;
    } else {
      finalPrompt = `${keywords}\nGenerate a valid PlantUML diagram for: ${prompt}. It should be free from syntax errors.`;
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
