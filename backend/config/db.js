import mongoose from 'mongoose';

const contectarDB = async () => {
  try {
      const connection = await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const url = `${connection.connection.host}:${connection.connection.port}`;
      console.log( `MongoDB Conectado en ${url}` );
  } catch (err) {
    console.log(`Error database: ${err.message}`);
    process.exit(1);
  }
}

export default contectarDB;