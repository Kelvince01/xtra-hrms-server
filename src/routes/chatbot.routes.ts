import { Request, Response, Router } from 'express'
import { DiscussServiceClient } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'

const chatbotRouter = Router()

const MODEL_NAME = 'models/chat-bison-001'
const API_KEY: string = process.env.API_KEY as string
const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
})

const CONTEXT =
  'Respond to all questions with a rhyming poem. Poem only. No more than 200 words.'
const EXAMPLES = [
  {
    input: { content: 'What is the capital of California?' },
    output: {
      content: `If the capital of California is what you seek,
Sacramento is where you ought to peek.`,
    },
  },
]

const messages: any[] = []

chatbotRouter.post('/', async (req: Request, res: Response) => {
  const requestData = req.body

  if (requestData && requestData.message) {
    const message = requestData.message
    messages.push({ content: message })

    const result = await client.generateMessage({
      model: MODEL_NAME,
      prompt: {
        context: CONTEXT,
        examples: EXAMPLES,
        messages,
      },
    })

    const messageResult = result[0].candidates![0].content
    messages.push({ content: messageResult })

    res.json({ message: messageResult, agent: 'chatbot' })
  } else {
    res.status(400).json({ error: 'Content not provided' })
  }
})

export default chatbotRouter
