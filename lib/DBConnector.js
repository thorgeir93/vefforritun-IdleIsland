'use strict';

var hash = require('../lib/pass').hash;
var pg = require('pg');
var fs = require('fs');

//var DATABASE = process.env.DATABASE_URL;

//thorgeirs pc local Database connection string
var DATABASE = "postgres://postgres:M39JPD@localhost/vefforritunLokaverkefni";

//thorgeirs laptop local Database connection string
//var DATABASE = "postgres://postgres:MaxvTQ@localhost/vefforritunLokaverkefni";


////
//HELPER FUNCTIONS
////

//returns function(error, resultRows)
function findUser (username, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values = [username];
    var query = 'SELECT username, salt, hash FROM users WHERE username = $1';
    client.query(query, values, function (err, result) {
      
      console.log("Select user done !");
      done();
      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
}

function createUserWithHashAndSalt (username, salt, hash, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      console.log("error to connect to DataBase!");
      return cb(error);
    }

    console.log("Connection to DataBase done!");
    var values = [username, salt, hash];
    var query = 'INSERT INTO users (username, salt, hash) VALUES($1, $2, $3)';
    client.query(query, values, function (err, result) {
      console.log("Insert user into table done !");
      done();

      if (err) {
        console.error(err);
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
}

function friendList(username, cb){
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values = [username];
    var query = 'SELECT friendID FROM friends WHERE username = $1;'; //it was FROM users LIMIT 20;
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
}





////
//MODULES
////
module.exports.createTables = function createTables( cb ){
  fs.readFile('./lib/sql/create.sql', 'utf-8', function(error, sqlQuery){
    if( error ){
      console.log( "Get sql query text failed !");
      console.log( error );
    }

    pg.connect(DATABASE, function (error, client, done) {
      if (error) {
        return cb(error);
      }

      client.query(sqlQuery, function (err, result) {
        done();
        if (err) {
          console.error(err);
          return cb(error);
        } else {
          return cb(false);
        }
      });
    });
  });
};


//returns function(error, isValid), 
//isValid is true if user exist otherwise false
module.exports.isValidUser=function isValidUser(username, password, cb){
  findUser(username, function (err, result) {
    var user = null;

    if (result.length === 1) {
      user = result[0];
    }

    if (!user) {
      return cb(new Error('cannot find user'));
    }

    hash(password, user.salt, function(err, hash){
      if (err) {
        return cb(err);
      }
      
      if (hash === user.hash) {
        return cb(null, true);//cb(null, user);
      }

      cb(new Error('invalid password'), false);
    });
  });
};

// returns function(error, successBoolean)
module.exports.createNewUser = function createNewUser (userN, passW, cb) {
  console.log("try to createUser !");
  hash(passW, function (err, salt, hash) {
    console.log("hash done !");
    if (err) {
      return cb(err);
    }
    createUserWithHashAndSalt(userN, salt, hash, cb);
  });
};

//TODO: test this module
//returns function(error, friends), friends is a String
module.exports.findFriendList = function findFriendList (username, cb) {
  friendList(username, cb);
};

//TODO: test this module
//returns function(error, playersHighScores),
//object playerHighScores contains 10 or less players name and score
module.exports.findAllHighScore = function findHighScoreForAll( cb ){
   pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    //getum sleppt DESC með því að skrifa út röðina í öfugri röð.
    //Þá erum við búinn að spara keyrsluna við að keyra DESC
    var query = 'SELECT username, score FROM gamestate ORDER BY score DESC LIMIT 10;';
    client.query(query, function (err, result) {
      done();
      if (err) {
        return cb(error);
      } else {
        return cb(null, result);
      }
    });
  });
};


//TODO: test this module
module.exports.findUserHighScore=function findUserHighScore(userN,cb){
  friendList( userN, function(error, friends){
    
    pg.connect(DATABASE, function (error, client, done) {
      if (error) {
        return cb(error);
      }

      //variable friends is a String, it keeps the 
      //username friends and the username itself.
      var values = [friends];
      var query = 'SELECT username, score FROM gamestate WHERE username = ANY($1) ORDER BY score DESC LIMIT 10;';
      client.query(query, function (err, result) {
        done();
        if (err) {
          return cb(error);
        } else {
          return cb(null, result);
        }
      });
    });
  });
};

module.exports.setGameState=function storeGameState(userN, gameS, cb){
  //TODO: replace gameS to gamestate table where userN is.
};

module.exports.getGameState=function getGameState(userN, cb){
  //TODO: get gamesate from gamestate table where userN is.
};

module.exports.addFriend=function addFriend(userN, friendsN, cb){
  //TODO: add friendN to friends table where userN is.
  

  /*pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    //getum sleppt DESC með því að skrifa út röðina í öfugri röð.
    //Þá erum við búinn að spara keyrsluna við að keyra DESC
    var query = 'INSERT INTO friends (username, friendid) FROM gamestate ORDER BY score DESC LIMIT 10;';
    client.query(query, function (err, result) {
      done();
      if (err) {
        return cb(error);
      } else {
        return cb(null, result);
      }
    });*/
  //});


};
