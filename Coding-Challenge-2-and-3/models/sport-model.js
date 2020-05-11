const mongoose = require( 'mongoose' );


const sportSchema = mongoose.Schema({
    id : {
        type : Number,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    num_players : {
        type : Number,
        require : true
    }
});

const sportsCollection = mongoose.model( 'sports', sportSchema);

const Sports = {
    createSport : function( newSport ){
        return sportsCollection
        .create( newSport )
        .then( createdSport => {
            return createdSport;
        })
        .catch( err => {
            return err;
        })
    }
}

module.exports = {
    Sports
};