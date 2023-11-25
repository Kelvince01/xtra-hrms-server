import { type Application, Request, Response } from 'express'
// import { authRoutes } from "./auth.routes";
// import { adminRoutes } from "./admin.routes";
import userRoutes from "./user.routes";
import pingRoutes from './ping.routes'
import taskRoutes from './tasks.routes'
import chatbotRoutes from './chatbot.routes'

export const startRoutes = (app: Application) => {
  app.get("/health", (req, res) => {
    res.send("healthy");
  });

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server')
  })

  app.use('/api/ping', pingRoutes)
  app.use('/api/users', userRoutes) // Add this line to mount the User API routes
  app.use('/api/tasks', taskRoutes) // Add this line to mount the Task API routes
  app.use('/api/chatbot', chatbotRoutes) // Add this line to mount the Chatbot API routes

  // authRoutes(app);
  // adminRoutes(app);
};
