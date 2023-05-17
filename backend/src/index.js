import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routers from './router/router.js';
import morgan from 'morgan';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routers);

const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, HOST, () => console.log(`Starting server ! at ${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);
