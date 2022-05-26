import express from 'express';
import contectarDB from './config/db.js'
const app = express();

/* init */
app.set('PORT', process.env.PORT || 8080);

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