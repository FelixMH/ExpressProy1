var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express ()

app.set('port', 79);
console.log('Express escucha el puerto ' + app.get('port'));
app.set('variable', 'Hola Edmundo!');
console.log(app.get('variable'));

app.set('aprendiendo', true);
app.enable(app.get('aprendiendo'));
console.log('Estoy aprendiendo ' + app.enabled('aprendiendo'));


app.set('env', 'test');
process.env.NODE_ENV= 'test';
console.log(app.get('env'));

app.get('/user', function (req,res){
    res.send('users');
});

app.get('/users/', function (req,res){
    res.send('users/');
});

app.set('query parser', 'simple')
app.set('query parser', false)
app.set('query parser', function() {})


/*
*  ENTORNOS
*/


process.env.NODE_ENV 

if ( 'development' === process.env.NODE_ENV )
{
    // conectarse a una base de datos de desarrollo.

} else if( 'production' === process.env.NODE_ENV ) {
    // conectarse a una base de datos de producciòn

}


if ( 'development' === app.get('env') ) {

} else if ( 'production' === app.get('env') ) {

}


app.configure( () => {
    app.set('appName', 'App demo fullstack 1')
    app.set('emailAuthor', 'felixmtzh.fm@gmail.com')
})


app.configure('development', () => {
    app.set('dbUri', 'mongodb://localhost:27017/db')
})

app.configure('production', () => {
    app.set('dbUri', process.env.MONGOHO_URL)
})




/*
* MIDDLEWARE
*/

var middleware = (req, res, next) => {
    // hacer ago con req y/o res
    next()
}


var compression = require('compression')
app.use(compression())

app.use(compression({
    level: 7
}))


/*
* body-parser
    * json()
    * urlencoded()
    * raw()
    * text()
    * 
    *   req.body.object -> req.body
    * 
    * 
    *   strict  : [false | true | 'error']
    *   reviver : transforma la salida, es el segundo parametro de JSON.parse()
    *   limit   : maximo de bytes
    *   inflate : infla el cuerpo ( body ) de la petición
    *   type    : 'json' | 'form' | 'text' define el tipo de contenido para parsear
    *   verify  : verifica el cuerpo ( body ).
*/


var bodyParser = require('body-parser');


app.use(bodyParser.json({
    strict: false,
    reviver: (key, value) => {
        if (key.substr(0, 1) === '_') {
            return undefined
        } else {
            return value
        }
    },
    limit: '5000',
}))


app.use(bodyParser.urlencoded({
    limit: '10000',
}))


/*
* cookie-parser
* req.cookie.object -> req.cookie
*
* path
* expires
* maxAge
* domain
* secure
* httpOnly

* JSONCookie(string) analiza y transforma la cadena en un formato JSON
* JSONCookies(cookies) --> cookies
* SignedCookie(string, secret)
* SignedCookies(cookies, secret)
*/

var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(cookieParser('Esta cadena es un secreto'))


/*
* express-session
* 
* req.session.object -> req.session
* key   connect.sid
* store -> se almacena la instancia de la sesión
* secret -> se almacena el secreto de la sesión.
* cookies -> nombre de la cookie. { path: '/', httpOnly: true, maxAge: null }
* proxy -> true | false
* saveUninitialized -> true | false , permite crear una sesión nueva si no existe una. sesión de usuario invitado.
* unset   -> true | false , permite borrar una sesión.  keep, destroy.
* resave
* rolling -> true | false
* genid 

* por default en express las sesiones se almacenan en memoria. 
* para tener persistencia de datos en memoria, express proporciona Redis.
*
*

* csurf
*
*
*
*
* Cross-Site Request Forgery ( CSRF ) -> XSRF
*   value
*   cookie
*   ignoreMethods   ['GET', 'HEAD', 'OPTIONS']
* 
*
*
*
*
*
*
*/


var csrf = require('csurf');
const { path } = require('./app');

app.use(csrf())

/*
*   express.static()  ->  serve-static      sirve para servir archivos estáticos.
*   
*   
*   
*   
*   
*/


// opciones para servir archivos estáticos con express-static...
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.static('public')) // sirve para servir archivos estáticos con una ruta relativa.