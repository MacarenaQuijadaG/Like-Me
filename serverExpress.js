//Carga de servidor y definicion de las rutas
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log("Servidor escuchado en puerto 3000"));

//Importando funcion desde el modulo consultas.js
console.log("Ruta del archivo consultas.js:", __dirname + '/consultas/consultas.js');
const { agregar, todos, editar } = require('./consultas/consultas.js');

//middleware para recibir desde el front como json
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//Ruta para agregar un ejercicio a la tabla ejercicios
app.post("/post", async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    const result = await agregar(titulo, img, descripcion);
    console.log("Valor devuelto por la funcion de base de datos: ", result);
    res.json(result);
})
//Ruta para consultar todos los registros de la tabla ejercicios
app.get("/posts", async (req, res) => {
    const result = await todos();
    console.log("Respuesta de la funcion todos: ", result);
    res.json(result);
    // res.send({
    //     message : "lista exitosa", 
    //     lista : result
    // });
})



//Ruta para editar un registro de la tabla ejercicios
app.put("/post", async (req, res) => {
    const { id } = req.query;
    const result = await editar(id);
    console.log("Respuesta de la funcion editar: ", result);
    res.json(result);
})

