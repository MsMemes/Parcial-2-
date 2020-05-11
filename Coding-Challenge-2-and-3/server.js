const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { Sports } = require('./models/sport-model');

const app = express();


app.post( '/sports/addSport/:sportId', jsonParser, (req, res) => {
    
    let name = req.body.name;
    let num_players = req.body.num_players;
    let id = req.body.id;
    let sportId = req.params.sportId;


    if(!name || !num_players || !id){
        res.statusMessage = "Please send all the fields";
        return res.status( 406 ).end();
    }

    if( sportId !== id ){
        res.statusMessage = "The id sent and the sportId don't match";
        return res.status( 409 ).end();
    }

    const newSport = { id, name, num_players };

    Sports
        .createSport( newSport )
        .then( result => {
            return res.status( 201 ).json( result );
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status( 500 ).end();
        })

})


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});