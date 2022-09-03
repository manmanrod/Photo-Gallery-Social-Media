DELETE FROM userfollowings;
DELETE FROM comments;
DELETE FROM photocategories;
DELETE FROM photos;
DELETE FROM categories;
DELETE FROM users;
DELETE FROM inappropriatewords;


INSERT INTO inappropriatewords
VALUES
	(1, 'cabron'),
	(2, 'asshole'),
	(3, 'gilipollas');

INSERT INTO Users
VALUES
	(1, 'John', 'Doe', '+01 (541) 754-3010', 'john.doe@gallery.com', 'john', 'pbkdf2:sha256:150000$KKgd0xN5$d778b27800d8b89e001843285475a0da3f6f6c664ec8e8a9590ed1c49603b194', '/images/default_profile.png'),
	(2, 'Jane', 'Smith', '+34 678 387 155', 'jane.smith@gallery.com', 'jane', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png');
-- Password = username

INSERT INTO categories
VALUES
	(1, 'landscape'),
	(2, 'foodie');

INSERT INTO Photos
VALUES
	(1, 'Tortilla', 'A typical Spanish tortilla. With onion, of course.', '2012-05-12 18:25:43', 'https://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg', 'Public', 1),
	(2, 'Samoyed', 'A very fluffy dog', '2020-01-12 13:37:01', 'https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Samoyed-.jpg', 'Public', 2),
	(3, 'Sleepy cat', 'A drawing of a cat about to sleep', '2019-08-24 21:20:21', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public', 1),
	(4, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-02 09:16:58', 'https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg', 'Public', 2),
	(5, 'Fruits', 'Some fruits', '2018-04-02 09:16:58', 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png', 'Public', 1);

-- Add some more data for your other tables...


INSERT INTO photocategories
VALUES
	(1, 2, 1),
	(2, 2, 5);
	
	
INSERT INTO comments
VALUES
	(1, 1, 1, 'this is so tasty!', null),
	(2, 1, 5, 'niceee', null);


INSERT INTO userfollowings
VALUES
	(1, 1, 2);

INSERT INTO ratings
VALUES
	(1, 1, 1, '2016-04-02 12:16:58', 3),
    (2, 2, 1, '2019-04-02 03:16:58', 5),
    (3, 1, 2, '2017-04-02 12:16:58', 5),
    (4, 2, 2, '2019-04-02 03:16:58', 1);