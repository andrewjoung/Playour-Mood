DROP DATABASE IF EXISTS playour_mood_db;
CREATE DATABASE playour_mood_db;

USE playour_mood_db;

CREATE TABLE user_data(
	uid INT NOT NULL AUTO_INCREMENT,
    uname VARCHAR(50),
    password VARCHAR(16),
    fav_genre TEXT ,
    rainy_choices TEXT,
    cloudy_choices TEXT,
    sunny_choices TEXT, 
    PRIMARY KEY(uid)
);

CREATE TABLE playList(
	uid INT,
    sunny_List TEXT,
    rainy_List TEXT,
    cloudy_List TEXT,
    PRIMARY KEY(uid),
    FOREIGN KEY(uid) REFERENCES user_data(uid)
);


CREATE TABLE playList_by_week(
    uid INT,
    day VARCHAR(20),
    playList VARCHAR(50),
    PRIMARY KEY(uid),
    FOREIGN KEY(uid) REFERENCES user_data(uid)
);

CREATE TABLE favorite_songs(
    uid INT,
    song VARCHAR(30),
    PRIMARY KEY(uid),
    FOREIGN KEY(uid) REFERENCES user_data(uid)
);






