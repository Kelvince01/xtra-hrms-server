import express, {
  Application,
  urlencoded,
} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'

//For env File
dotenv.config()

import { startRoutes } from './routes'
import { errorHandler } from './utils/custom.error'

const app: Application = express()

app.use(compression())
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

startRoutes(app);

// Add this error handling middleware
app.use(errorHandler);

export default app
