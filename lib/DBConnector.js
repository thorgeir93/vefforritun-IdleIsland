'use strict';

var hash = require('../lib/pass').hash;
var pg = require('pg');
var fs = require('fs');




////
//DATABSE CONNECTION
////
////
//var DATABASE = process.env.DATABASE_URL;

//thorgeirs pc local Database connection string
//var DATABASE = "postgres://postgres:M39JPD@localhost/vefforritunLokaverkefni";

//thorgeirs laptop local Database connection string
var DATABASE = "postgres://postgres:MaxvTQ@localhost/vefforritunLokaverkefni";

//máni local Database connection string
//var DATABASE = "postgres://thorkellmani:1234@localhost/lokaverkefni";


//josua local connection
//var DATABASE = "postgres://postgres:123@localhost/verkefni6";





//
//  INFORMATION - SELECT query
//    result = [ {attrb_1, attrb_2, ...}, {attrb_1, attrb_2, ...}, ... ]
//    e.g. users table, select all ->
//    result = [ {username:goggi, salt: '...', hash: '...'} ]






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

    //fyrir insert inn i users
    console.log("Connection to DataBase done!");
    var values = [username, salt, hash];
    var query = 'INSERT INTO users (username, salt, hash) VALUES($1, $2, $3)';
    client.query(query, values, function (err, result) {
      
      done();
      var settings = 'some string that will be JSON';
      //fyrir insert inn í gamestate
      var JSONstring = '{"userName": "'+username+'", "upgrades": [[1,0,3],[0,3,3],[3,3,3]], "currency": 0, "settings": "'+settings+'", "currFactor": 0, "treeFactor": 1, "timestamp": '+ Date.now() +' }'
      var values = [username,JSONstring,0];
      var query = 'INSERT INTO gamestate (username, gamestate, score) VALUES($1, $2, $3)';
      client.query(query, values, function (err, result) {
      done();

        //fyrir insert inn í friends
        var values = [username,username+','];
        var query = 'INSERT INTO friends (username, friendid) VALUES($1, $2)';
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



module.exports.findRandomUserN=function findRandomUser(userN, cb){
  //TODO:   create random usernames, like adding numbers after the name
  //        return a array with minimum three usernames.
  return cb(null, ["tempTröll95", "tempTöll93"]);
};


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



//returns callback(error, isTaken),
//isTaken is true if the username is already taken, otherwise false
//error return null if all is ok, otherwise error object or String errMessage 
module.exports.isUserNTaken=function isUserNTaken(userN, cb){
  findUser(userN, function(error, resultRow){
    if(error){
      cb(error, null);
    } else if( resultRow[0] ){
        if( resultRow[0].username === userN){
          cb(null, true);
        }
    } else {
      cb(null,false);
    }
  });
};


//returns callback(error, isValid), 
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

module.exports.getGameState=function getGameState(userN, callback){

  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return callback(error);
    }
    var values = [userN];
    var query = 'SELECT gamestate FROM gamestate WHERE username = $1';
    client.query(query, values, function (err, result) {
      
      done();
      console.log("Select user done ! data = ", result.rows[0]['gamestate']);
      if (err) {
        return callback(error);
      } else {
        return callback(null, result.rows[0]['gamestate']);
      }
    });
  });
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

