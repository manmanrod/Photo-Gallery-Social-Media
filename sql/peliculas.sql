CREATE OR REPLACE TABLE Peliculas (
  pId 		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  pelicula 	VARCHAR(50) NOT NULL,
  genero 	VARCHAR(50) DEFAULT NULL,
  año 		INT,
  cartelURL VARCHAR(100),
  sinopsis 	VARCHAR(1024)
);

INSERT INTO peliculas (pelicula, genero, año, cartelURL, sinopsis) VALUES 
	('El Exorcista', 'Terror', 1973, 
	'https://storage.googleapis.com/www-paredro-com/uploads/2013/10/posterexorcist.jpg', 
	'Adaptación de la novela de William Peter Blatty que se inspiró en un exorcismo real ocurrido en Washington en 1949. Regan, una niña de doce años, es víctima de fenómenos paranormales como la levitación o la manifestación de una fuerza sobrehumana. Su madre, aterrorizada, tras someter a su hija a múltiples análisis médicos que no ofrecen ningún resultado, acude a un sacerdote con estudios de psiquiatría. Éste, convencido de que el mal no es físico sino espiritual, es decir que se trata de una posesión diabólica, decide practicar un exorcismo. Seguramente la película de terror más popular de todos los tiempos.' )
	
	,('Manhattan', 'Comedia', 1979, 
	'https://storage.googleapis.com/www-paredro-com/uploads/2013/10/manhattan.jpg', 
	'Isaac Davis, un neoyorquino de mediana edad tiene un trabajo que odia, una novia de 17 años a la que no ama y una ex esposa con la que se lleva muy mal, porque está escribiendo un libro en el que cuenta las intimidades de su matrimonio. Cuando conoce a Mary, la sexy y snob amante de su mejor amigo, se enamora perdidamente de ella. La idea de dejar a su novia, irse con Mary y abandonar su trabajo supone para él el comienzo de una nueva vida.' )
	
	,('A.I. Artificial Intelligence', 'Ciencia Ficción', 2001, 
	'https://storage.googleapis.com/www-paredro-com/uploads/2013/10/ai_artificial_intelligence.jpg', 
	'En un mundo futuro, los seres humanos conviven con sofisticados robots llamados Mecas. Los sentimientos son lo único que diferencia a los hombres de las máquinas. Pero, cuando a un robot-niño llamado David se le programa para amar, los hombres no están preparados para las consecuencias, y David se encontrará solo en un extraño y peligroso mundo.' )
	;
