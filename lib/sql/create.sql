CREATE TABLE IF NOT EXISTS users  
(
	id serial NOT NULL,
	username VARCHAR(255),
  	salt character varying(256),
  	hash character varying(256),
	CONSTRAINT users_pkey PRIMARY KEY (id),
  	CONSTRAINT users_username_key UNIQUE (username)
);


CREATE TABLE IF NOT EXISTS gameState  
(
	username VARCHAR(255), --var svona: id VARCHAR(255)
	gameState VARCHAR(2000),
	score INTEGER,
	PRIMARY KEY ( username )
);


CREATE TABLE IF NOT EXISTS friends
(
	username VARCHAR(255),   
	friendID VARCHAR(255000), 
	PRIMARY KEY ( username )
);