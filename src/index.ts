import express from 'express';
import routes from './routes';
import 'reflect-metadata';


//alteracoes referente ao passo 11.
//import './database/connect.ts'
import { setup } from "./database/connect"


const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});
app.use(routes); 


//alteracoes referente ao passo 11.

export {app, setup};


//app.listen(3000, () => 
//    console.log('Server started at http://‐localhost:3000')
//);