

INSERT INTO user_data(uname,password)
VALUES("monali","monali");

UPDATE user_data
SET fav_genre="rock,pop"
WHERE uid=1;

UPDATE user_data
SET rainy_choices="happy,mellow,joyful"
WHERE uid=1;

UPDATE user_data
SET sunny_choices="joyful,uplifting,elegant"
WHERE uid=1;

UPDATE user_data
SET cloudy_choices="joyful,uplifting,elegant"
WHERE uid=1;



INSERT INTO playList(uid) VALUES(1);

UPDATE playList
SET sunny_List="jas,amsjcadksaj"
WHERE uid=1;

UPDATE playList
SET cloudy_List="jas,amsjcadksaj"
WHERE uid=1;

UPDATE playList
SET rainy_List="jas,amsjcadksaj"
WHERE uid=1;

INSERT INTO playList_by_week(uid,day,playList)
VALUES(1,'Tuesday','hsbchc,jnwdejjd');

INSERT INTO favorite_songs(uid,song)
VALUES(1,"sbshaj");


