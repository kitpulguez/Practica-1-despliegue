// Archivo donde se crean las funciones para cargar y guardar los juegos, y este se exporta al index para poder ser usado.

const fs = require('fs');
const { arrayBuffer } = require('stream/consumers');

let cargarJuegos = (fichero) => {
    let juegos = [];

    if (fs.existsSync(fichero))
    {
        juegos = JSON.parse(fs.readFileSync(fichero, 'utf8'));
    }   

    return juegos;
};

let guardarJuegos = (fichero, juegos) => {
    if (juegos != null)
        fs.writeFileSync(fichero, JSON.stringify(juegos));
};

module.exports = {cargarJuegos, guardarJuegos};