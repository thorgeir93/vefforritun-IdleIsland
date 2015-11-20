var express = require('express');
var router = express.Router();

var sql = require('../lib/DBConnector');
var ensureUser = require('../lib/ensureLoggedIn');
var xss = require('xss');


////
//HOME PAGE
////

router.get('/', homePage);

//TEMP MEHTOD SOLUTION
function homePage(req, res, next){
	//Initialize tables and then render main screen
	sql.createTables( function(error){
		if( error ){
			console.log(error);
		}
		res.redirect('/login');
		//res.render('login', { title: 'Log In' });
	});
}

////
//AUTHERATION / CREATE USER
////

//VILLA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! KV ÞORGEIR
router.get('/menu', ensureUser, menu);

router.get('/viewFriends', ensureUser, viewFriends);
router.post('/viewFriends', chooseFriend);

router.get('/addFriends', ensureUser, addFriends);
router.post('/addFriends', addFriendsHandler);

router.get('/highScores', ensureUser, highScores);
router.get('/settings', /*ensureUser,*/ settings);

router.get('/highScores', ensureUser, highScores);
router.get('/settings', ensureUser, settings);

router.get('/idleisland', ensureUser, play);
router.get('/logout', ensureUser, logout);


router.post('/exit', ensureUser ,exit);

/*router.get('/viewFriendsIsland', viewFriendsIsland);

function viewFriendsIsland(req, res, next) {
  res.render('viewFriendsIsland');
}*/

function chooseFriend(req, res, next) {
  var friend = xss(req.body.who);
  sql.getGameState(friend, function(error, result) {
    var gamestate;
    gamestate = result
    var data = {username: friend,
                userData: gamestate }
    res.render('viewFriendsIsland', {data:data});
  });
}

function exit(req, res, next){
  var gameState = xss(req.body.submitString)
  var score = xss(req.body.score)
  sql.setGameState(req.session.user, gameState, score, function(){
    console.log('allt gekk upp')
    res.redirect('/menu');
  })
}

function logout(req, res, next) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

function menu(req, res, next) {
  res.render('menu', { title: 'Idle Island'});
}

function viewFriends(req, res, next) {
  username = req.session.user;
  sql.findFriendList(username, function(err, result) {
    if (err) {
      console.error(err);
    } 
    friends = result[0]['friendid'].split(',');
    var friended = [];
    for (var i = 0; i < friends.length; i++) {
      friended.push(friends[i]);
    }
    if (friended.length > 2) {
      res.render('viewFriends', { status: 'Your friends', entries: friended});
    } else {
      res.render('viewFriends', { status: 'Get some friends, loser', entries: false});
    }
  });
}

function addFriends(req, res, next) {
  res.render('addFriends', { title: 'Add Friends'});
}

function addFriendsHandler(req, res, next) {
  var username = req.session.user;
  var friend = xss(req.body.friend);
  if (friend === username) {
    res.render('addFriends', {status: "You can't add yourself, ya dingus"});
  }
  
  if (friend === '') {
    res.render('addFriends', {status: 'Username is required!'});
  } else {
    sql.isUserNTaken(friend, function (error, result) {
      if (error) {
        console.error(error);
      }
      if (result) {
        sql.findFriendList(username, function(err, result) {
          if (err) {
            console.error(err);
          } 
          friends = result[0]['friendid'].split(',');
          friended = friends[1];
          if (friend === friended) {
            res.render('addFriends', { status: "User is already a friend!"});
          } else {  
            if (result) {
              sql.addFriend(username, friend, function(err, result) {
                if (err) {
                  console.error(err);
                }
                else {
                  res.render('addFriends', { status: 'Friend added!'});
                }
              });
            }
          }
        });
      } else {
        console.log("add friend: user doesn't exist");
        res.render('addFriends', { status: "User doesn't exist"});
      }
    });
  }
}

function highScores(req, res, next) {
  sql.findAllHighScore(function(error, result) {
    if (error) {
      console.error(error);
    }
    var entries = [];
    for(var i = 0; i < result.rows.length; i++) {
      entries.push(result.rows[i]);
    }
    res.render('highScores', { entries: entries});
  });
}

  

function settings(req, res, next) {
  res.render('settings', { title: 'Change Settings'});
}


function play(req, res, next) {
  var gamestate;
  sql.getGameState(req.session.user, function(error, dataa){
    console.log('success');
    gamestate = dataa

    var data = {username: req.session.user,
                userData: gamestate }

    res.render('idleisland', {data});
  });
}

module.exports = router;
	