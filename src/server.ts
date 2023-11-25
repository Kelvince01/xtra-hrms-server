import express, {
  Request,
  Response,
  Application,
  NextFunction,
  urlencoded,
} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

//For env File
dotenv.config()

import pingRoutes from './routes/ping.routes'
import taskRoutes from './routes/tasks.routes'
import chatbotRoutes from './routes/chatbot.routes'
import { ValidateError } from 'tsoa'

const app: Application = express()
const port = process.env.PORT || 3000

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
)
app.use(express.json()) // Add this line to enable JSON parsing in the request body
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(
  cors({
    origin: '*',
  })
)

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server')
})

app.use('/api/ping', pingRoutes)
app.use('/api/tasks', taskRoutes) // Add this line to mount the Task API routes
app.use('/api/chatbot', chatbotRoutes) // Add this line to mount the Chatbot API routes

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  // res.status(500).send('Something went wrong')

  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  res.status(404).send({
    message: 'Not Found',
  })

  next()
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
