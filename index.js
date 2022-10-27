// Archivo principal que hace todos los servicios get, put, delete y post, ademas de inicializar las constantes con las utilidades necesarias.

const utils = require("./utilidades.js");
const ficheroJuegos = "juegos.json";
const express = require("express");

let juegos = utils.cargarJuegos(ficheroJuegos);

let app = express();
app.use(express.json());

app.listen(8080);

app.get("/juegos", (req, res) => {
    if (juegos && juegos.length > 0)
    {
        let resultado = juegos;
        console.log(req.query);
        console.log(req.query.anyos);

        if (req.query.anyos && req.query.tipo)
        {
            if (req.query.anyos >= 0)
            {            
                resultado = juegos.filter(juego => juego.edadMinima >= req.query.anyos && juego.tipo == req.query.tipo);
                res.status(200).send({ ok: true, resultado: resultado});
            }
            else
                res.status(400).send({ok: false, error: "Edad minima recomendada en años invalida"});
        }
        else if (req.query.anyos)
        {
            if (req.query.anyos >= 0)
            {            
                resultado = juegos.filter(juego => juego.edadMinima >= req.query.anyos);
                res.status(200).send({ ok: true, resultado: resultado});
            }
            else
                res.status(400).send({ok: false, error: "Edad minima recomendada en años invalida"});  
        }
        else if (req.query.tipo)
        {
            resultado = juegos.filter(juego => juego.tipo == req.query.tipo);
            res.status(200).send({ ok: true, resultado: resultado});
        }
        else
            res.status(200).send({ ok: true, resultado: resultado});
    }
    else
    {
        res.status(500).send({ok: false, error: "No se encontraron juegos"});
    }
});

app.get("/juegos/:id", (req, res) => {
    if (juegos && juegos.length > 0)
    {
        let resultado = juegos.filter(juego => juego.id == req.params["id"]);

        if (resultado.length > 0)
            res.status(200).send({ok: true, resultado: resultado[0]});
        else
            res.status(400).send({ok: false, error: "No hay ningun juego con semejante id"});
    }
    else
    {
        res.status(500).send({ok: false, error: "No se encontraron juegos"});
    }
});

app.post("/juegos", (req, res) => {
    if (juegos && juegos.length > 0)
    {
        if (req.body.id && req.body.nombre && req.body.descripcion && req.body.edadMinima && req.body.jugadores && req.body.tipo && req.body.precio)
        {
            let nuevoJuego = {
                id: req.body.id, nombre: req.body.nombre, descripcion: req.body.descripcion, edadMinima: req.body.edadMinima, jugadores: req.body.jugadores, tipo: req.body.tipo, precio: req.body.precio
            };

            if ((juegos.filter(juego => juego.id == req.body.id)).length == 0)
            {
                juegos.push(nuevoJuego);
                res.status(200).send({ok: true, resultado: nuevoJuego});
                utils.guardarJuegos(juegos);
            }
            else
                res.status(400).send({ok: false, error: "El juego ya existe"});
        }
        else
            res.status(400).send({ok: false, error: "Faltan parametros"});
    }
    else
        res.status(500).send({ok: false, error: "No se encontraron juegos"});
});

app.put("/juegos/:id", (req, res) => {
    if (juegos && juegos.length > 0)
    {
        let existe = juegos.filter(juego => juego.id == req.params['id']);
        if (existe.length > 0)
        {
            let juego = existe[0];
            juego.nombre = req.body.nombre;
            juego.descripcion = req.body.descripcion;
            juego.edadMinima = req.body.edadMinima;
            juego.jugadores = req.body.jugadores;
            juego.tipo = req.body.tipo;
            juego.precio = req.body.precio;

            res.status(200).send({ok: true, resultado: juego});
            utils.guardarJuegos(juegos);
        }
        else
            res.status(400).send({ok: false, error: "Juego no encontrado"});
    }
    else
        res.status(500).send({ok: false, error: "No se encontraron juegos"});
});

app.delete('/juegos/:id', (req, res) => {
    if (juegos && juegos.length > 0)
    {
        let filtrado = juegos.filter( juego => juego.id != req.params['id'] );
        let borrado = juegos.filter(juego => juego.id == req.params["id"]);
        
        if (filtrado.length != juegos.length)
        {
            juegos = filtrado;
            res.status(200).send({ok: true, resultado: borrado[0]});
            utils.guardarJuegos(juegos);
        }
        else
            res.status(400).send({ok: false, error: "Juego no encontrado"});
    }
    else
        res.status(500).send({ok: false, error: "No se encontraron juegos"});
});