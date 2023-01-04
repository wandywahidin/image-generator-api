const { Configuration, OpenAIApi} = require('openai')

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const generateImage = async (req, res) => {
    const {prompt, size} = req.body

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'
    try {
        const respnse = await openai.createImage({
            prompt:prompt,
            n : 1,
            size : imageSize,
            response_format : 'b64_json'
        })

        const imageUrl = respnse.data.data[0].b64_json

        res.status(200).json({
            success : true,
            data : imageUrl
        })
    } catch (err) {
        if (err.response) {
            const errMessage = err.response.data.error.message
            res.status(err.response.status).json({
                success : false,
                error : errMessage
            })
            console.log( err.response.status);
            console.log( err.response.data);
        } else {
            console.log(error.message);
        }
    }
}

module.exports = {generateImage}