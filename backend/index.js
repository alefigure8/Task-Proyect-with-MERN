import express from 'express';
import contectarDB from './config/db.js'
import dotenv from 'dotenv';
import users from './routes/userRoutes.js';
import projects from './routes/projectRoutes.js';
import tasks from './routes/taskRoutes.js';
import cors from 'cors';

/* init */
const app = express();
app.set('PORT', process.env.PORT || 8080);
dotenv.config()
contectarDB()

// CORS
const whiteList = ['http://localhost:3000', 'http://localhost:8080'];
const corsOptions = { origin: (origin, callback) => {
    if(whiteList.includes(origin)){
      console.log('origin: ', origin);
    } else {

    }
  }
};
app.use(cors(corsOptions));

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Routing */
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);

/* Servidor  */
const server = app.listen(app.get('PORT'), ()=> {
  console.log("Server on port", app.get('PORT'));
})

/* Error */
server.on('error', err => {
  console.log(err);
})