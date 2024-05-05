import express from 'express';
import urlRouter from './routes/url.js';
import connectDB from './connection.js';

const app = express();
const PORT = 8000;

connectDB('mongodb://127.0.0.1:27017/URL').then(()=> {
    console.log("MongoDB Connected!");
});

app.use(express.json());

app.use('/url', urlRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});