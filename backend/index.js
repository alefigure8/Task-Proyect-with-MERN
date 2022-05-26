import express from 'express';
import contectarDB from './config/db.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config()

/* init */
app.set('PORT', process.env.PORT || 8080);
contectarDB()

app.get('/', (req, res)=>{
  res.send('Hello world!');
})

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Servidor  */
const server = app.listen(app.get('PORT'), ()=> {
  console.log("Server on port", app.get('PORT'));
})

/* Error */
server.on('error', err => {
  console.log(err);
})