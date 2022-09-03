-- Triggers and procedures

-- RN-C01: Limitación en el número de fotos

DELIMITER //
CREATE OR REPLACE TRIGGER triggerMaxNumberOfPhotos
BEFORE INSERT ON Photos FOR EACH ROW

BEGIN

	DECLARE numberOfPhotos INT;
	SELECT COUNT(*) INTO numberOfPhotos
		FROM Photos
		WHERE userId=NEW.userId;
		
	IF(numberOfPhotos >= 50) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
	'RN-C01: A user cannot have more than 50 photos uploaded to the database!';
	END IF;

END //
DELIMITER ;



-- RN-C03: Unicidad de cuentas
DELIMITER //
CREATE OR REPLACE TRIGGER triggerUniqueUserEmails
BEFORE INSERT ON Users FOR EACH ROW

BEGIN

	DECLARE sameEmailExists INT;
	SELECT COUNT(email) OR COUNT(username) INTO sameEmailExists
		FROM Users
		WHERE email=NEW.email;
	
	IF(sameEmailExists >=1) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
	'RN-C03: This email already exists in our database, you MUST use a new one!';
	END IF;
	
END //
DELIMITER ;



-- RN-C04: Limitación de valoraciones
DELIMITER //
CREATE OR REPLACE TRIGGER triggerMaxRatingInPhotoByUser
BEFORE INSERT ON RATINGS FOR EACH ROW

BEGIN

    DECLARE ratingCounter INT;
    SELECT COUNT(userId) INTO ratingCounter
        FROM RATINGS
        WHERE userId=NEW.userId
        AND photoId=NEW.photoId;
        
    IF (ratingCounter >=1) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'RN-C04: A user cannot rate a photo more than once!';
    END IF;

END //
DELIMITER ;



-- RN-B05: Eliminación de fotos
DELIMITER //
CREATE OR REPLACE TRIGGER triggerDeletePhotoWithComments
BEFORE DELETE ON photos FOR EACH ROW 

BEGIN

	 DECLARE commentCounter INT;
	 SELECT COUNT(photoId) INTO commentCounter
	 	FROM comments
	 	WHERE comments.photoId=OLD.photoId;
    IF (OLD.visibility = 'Private' OR commentCounter>=1) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'RN-B05: You cannot delete a photo with comments or with visibility private!';
    END IF;

END //
DELIMITER ;


-- RN-B06: Unicidad de categorias
DELIMITER //
CREATE OR REPLACE TRIGGER triggerUniqueCategories
BEFORE INSERT ON categories FOR EACH ROW 

BEGIN 

    DECLARE sameCategoryExists INT;
    SELECT COUNT(NAME) INTO sameCategoryExists
        FROM categories
        WHERE NAME=NEW.NAME;

    IF(sameCategoryExists >=1) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'RN-B06: This category already exists!';
    END IF;

END //
DELIMITER ;

