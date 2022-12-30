import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';//cross origin requests
import { Configuration, OpenAIApi } from 'openai';
dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());

app.use(express.json());//pass frontend to backend

app.get('/',async(req,res) =>{
    res.status(200).send({
        message: 'Success',
    })
})
app.post('/',async(req,res) =>{
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt: `${prompt}`,
            //amount of risk
            temperature:0,
            max_tokens:1000,
            top_p:1,
            frequency_penalty:0.6,//chance of it saying the same thing
            presence_penalty:0,
            stop:["\"\"\""]
              
});
res.status(200).send({
    bot: response.data.choices[0].text
});
}
catch(error){
    console.log(error);
    res.status(500).send({error});
}
})

app.listen(5000,() =>console.log('Server listening on port https://chatgptbydivesh.onrender.com'));