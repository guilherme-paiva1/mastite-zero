CREATE DATABASE mastite_zero;

USE mastite_zero;

CREATE TABLE usuario (
	id INT PRIMARY KEY auto_increment,
    empresa VARCHAR(50),
    supervisor VARCHAR(20),
    cnpj CHAR(18),
    email VARCHAR(30),
    senha VARCHAR(15)
);

DESC usuario;

INSERT INTO usuario (empresa, supervisor, cnpj, email, senha) VALUES
	('Fazenda Manteiga', 'marcos', '11.111.111/0001-00', 'marcos@amanteigado.com', '12345'),
    ('Fazenda Vinho', 'paulo', '12.345.678/0001-00', 'paulo@vinho.com', 'amominhamae'),
    ('Fazenda Suco de Uva', 'fiona', '87.654.321/0001-00', 'fiona@suco.com', 'shrek123'),
    ('Fazenda Maionese', 'ruan', '13.579.246/0001-00', 'ruan@maionese.com', 'maionesedeovo');
    
SELECT * FROM usuario;

SELECT * FROM usuario
    WHERE supervisor LIKE "%a%"
        ORDER BY cnpj;

CREATE TABLE leitura (
	id INT PRIMARY KEY AUTO_INCREMENT,
    umidade FLOAT(4,1),
    data_hora DATETIME
);

DESC leitura;

INSERT INTO leitura (umidade, data_hora) VALUES
	(40.3, '2024-08-28	17:30:00'),
    (52.5, '2024-08-28	18:30:00'),
    (33.6, '2024-08-28	19:30:00'),
    (25.6, '2024-08-28	20:30:00'),
    (47.9, '2024-08-28	21:30:00');
    
SELECT * FROM leitura;

SELECT CONCAT('A leitura de umidade às ', data_hora, ' foi ', umidade, '%, o que está acima do recomendado.') AS mensagem
	FROM leitura
		WHERE umidade > 45;
        
SELECT CONCAT('A leitura de umidade às ', data_hora, ' foi ', umidade, '%, o que está abaixo do recomendado.') AS mensagem
	FROM leitura
		WHERE umidade < 30;
        
CREATE TABLE controle_vaca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lote INT,
    producao FLOAT,
    raca VARCHAR(10),
    
    CONSTRAINT chkLote 
		CHECK (lote in (1, 2, 3))
);

INSERT INTO controle_vaca (lote, producao, raca) VALUES
	(1, 40, 'Girolanda'),
    (1, 37, 'Gir'),
    (1, 42, 'Girolanda'),
	(2, 35, 'Holandesa'),
    (2, 32, 'Gir'),
	(3, 18, 'Holandesa');

SELECT * FROM controle_vaca
	WHERE lote = 1;
    
SELECT * FROM controle_vaca
	WHERE producao <= 35;