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
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = { origin: (origin, callback) => {
    if(whiteList.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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

/* Socket IO */
import { Server } from 'socket.io';
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL
  }
})

io.on("connection", socket => {
  console.log("New client connected");

  // params to join a room
  socket.on('open project', id => {
    socket.join(id)
  });

  // task created and sended to the room
  socket.on('createTask', data => {
    socket.to(data.project).emit('addedTask', data)
  })

  socket.on('deletedTask', data => {
    socket.to(data.project).emit('deletedTask', data)
  })

  socket.on('updateTask', data => {
    socket.to(data.project).emit('updatedTask', data)
  })

  socket.on('statusTask', data => {
    console.log(data)
    socket.to(data.project._id).emit('statusTask', data)
  })
})