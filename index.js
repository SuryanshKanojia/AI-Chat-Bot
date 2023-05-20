//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

const { Configuration, OpenAIApi } = require
("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-3LFUPL325gR9hHPIHmjUdBzr",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);



const app = express()
app.use(bodyParser.json())
app.use(cors())


const port = 3080

app.post('/', async (req,res) => {
    const {message, currentModel} = req.body;
    const response = await openai.createCompletion({
         model: `${currentModel}`, 
        prompt: `${message}`,
        max_tokens: 300,
        temperature: 0.5,
    });
    res.json({
       message: response.data.choices[0].text,
    })
});

app.get('/models', async (req,res) => {
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
       models: response.data.data
    })
});

app.listen(port,() => {
        console.log(`Example app listening at http://localhost:${port}`)
});

 