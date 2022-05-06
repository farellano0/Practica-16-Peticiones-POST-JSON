const express = require('express'); //Inyección de la dependencia
var app = express(); //declaramos una App de Express
var PORT = process.env.PORT || 3000; //definición del puerto de escucha
app.use('/assets', express.static(__dirname + '/public')); //Contenido estático

app.use(express.urlencoded({ extended: false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html><html lang="en"> <head><link rel="stylesheet" href="/assets/style.css" > 
    <title>Document</title> </head> 
    <body> <h1>Hola mundo</h1> 
    <p> Este es un parrafo y su contenido debe ser azul</p></body> </html>`)
});

app.get('/person/:id', (req, res) => {
    res.render('person', { ID: req.params.id, Msg: req.query.msg, Times: req.query.times}); //Recolección de parametros: person, message & times
});

app.get('/student', (req, res) => {
    res.render('index');
});

//Enviamos como parámetro extra, el callback, para que se ejecute antes que el router handler
app.post('/student', (req, res) => {
    res.send(`First Names es: ${req.body.fname}, Last Name es: ${req.body.lname}`); //res.send(req.body)
});

app.post('/personjson', express.json({type: '*/*'}), (req, res) => {
    console.log('El objeto contiene: ', (req.body));
    console.log('Nombre: ', req.body.firstname);
    console.log('Apellido: ', req.body.lastname);
})

app.listen(PORT); //levantar el server y ponerlo a la escucha