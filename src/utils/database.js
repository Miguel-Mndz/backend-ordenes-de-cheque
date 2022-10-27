import {Pool} from "pg"

let conexion

if(!conexion){

    conexion = new Pool({
        user:'postgres',
        password:'Miguelnell9',
        database:'apipdf',
        host:'localhost',
        port:'5432'
    })
}

export {conexion}