import {createConnection} from 'typeorm';

//codigo fonte referente a parte 11.

//createConnection().then(() => console.log('Connectou no Banco de dados!!'));


export async function setup() {
    //console.log(__dirname);
    await createConnection().then(() => console.log('Connectou no Banco de dados!!'))
}