var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var Nedb = require('nedb')

var database = new Nedb({filename:'./data/data.db',autoload: true})

app.use(express.static('../client'))

app.use(bodyParser.json())

app.post('/saveCurrent',function (req,res){
    var data = { word: req.body.word, date: Date.now()}

    var done = function (){
        console.log("I just wrote something to the database")
        res.end("done")
        }
    database.insert(data,done)
    })

app.get('/getSaved', function (req, res){
    // setup database query
    var query = {}

    var done = function(err, data) {

        console.log("I just read from the database")
        res.send(data)

    }
    database.find(query, done)
})

var PORT = 8080
app.listen(PORT)

console.log("listening on " + PORT)