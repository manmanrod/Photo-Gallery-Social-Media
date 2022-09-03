DROP TABLE IF EXISTS photoCategories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS UserFollowings;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS InappropriateWords;


CREATE TABLE InappropriateWords(
	inappropriateWordId INT NOT NULL AUTO_INCREMENT,
	word VARCHAR(128) NOT NULL,
	PRIMARY KEY (inappropriateWordId)
);


CREATE TABLE Users(
	userId INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL,
	lastName VARCHAR(256) NOT NULL,
	telephone VARCHAR(32) NOT NULL,
	email VARCHAR(128) UNIQUE NOT NULL,
	username VARCHAR(64) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	avatarUrl VARCHAR(1024),
	PRIMARY KEY (userId)
);

CREATE TABLE Photos(
	photoId INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(256) NOT NULL,
	description VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(512) NOT NULL,
	visibility VARCHAR(16) NOT NULL,
	userId INT NOT NULL,
	PRIMARY KEY (photoId),
	FOREIGN KEY (userId) REFERENCES users (userId),
	CONSTRAINT invalidVisibilityConstraint CHECK (visibility IN ('Public', 'Private'))
);

CREATE TABLE Categories(
	categoryId INT NOT NULL AUTO_INCREMENT,
	NAME VARCHAR(64) UNIQUE NOT NULL,
	PRIMARY KEY (categoryId)
);

CREATE TABLE UserFollowings(
	userFollowingId INT NOT NULL AUTO_INCREMENT,
	userWhoFollows INT NOT null,
	userWhoIsFollowed INT NOT null,
	PRIMARY KEY (userFollowingId),
	FOREIGN KEY (userWhoFollows) REFERENCES Users (userId),
	FOREIGN KEY (userWhoIsFollowed) REFERENCES Users (userId),
	CONSTRAINT invalidUserFollowConstraint CHECK (userWhoFollows != userWhoIsFollowed)
);

CREATE TABLE Ratings(
	ratingId INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
	VALUE INT,
	PRIMARY KEY (ratingId),
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId),
	UNIQUE(userId,photoId),
	CONSTRAINT invalidRatingValueConstraint CHECK (VALUE BETWEEN 1 AND 5)
);

CREATE TABLE Comments(
	commentId INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	TEXT VARCHAR(512),
	DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (commentId),
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId)
);


CREATE TABLE PhotoCategories(
	photoCategoryId INT NOT NULL AUTO_INCREMENT,
	categoryId INT NOT NULL,
	photoId INT NOT NULL,
	PRIMARY KEY (photoCategoryId),
	FOREIGN KEY (categoryId) REFERENCES Categories (categoryId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId),
	UNIQUE(photoId, categoryId)
);
