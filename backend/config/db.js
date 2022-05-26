import mongoose, { connect } from 'mongoose';

const contectarDB = async () => {
  try {
      const connection = await mongoose.connect('mongodb+srv://root:pago7611@cluster0.pdkml.mongodb.net/uptask?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const url = `${connection.connection.host}:${connection.connection.port}`;
      console.log( `MongoDB Conectado en ${url}` );
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}

export default contectarDB;