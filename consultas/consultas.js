const { Pool } = require('pg');
// conexion a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',
    password: 'desarrollo',
    port: 5432
});

// insertar registros a la la tabla

async function agregar (titulo, img, descripcion) {
    console.log("Valores recibidos: " , titulo, img, descripcion);
    const result = await pool.query({ 
        text: 'INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *',
        values: [titulo, img, descripcion, 0]
    })
    console.log("Registro agregado: " , result.rows[0]);
    //Respuesta de la funcion
    return result.rows[0];
};

async function todos () {
    const result = await pool.query("SELECT * FROM posts");
    console.log("Todos los registros: " , result.rows);
    return result.rows;
}


//editar el registro
async function editar (id) {
    console.log("id recibido: " , id);
    const result = await pool.query("UPDATE posts SET likes = likes+1 WHERE id = $1 RETURNING *", [id]);
    console.log("Registro editado: " , result.rows[0]);
    return result.rows[0];
}
//exportar los modulos
module.exports = {agregar, todos, editar};