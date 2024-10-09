CREATE DATABASE cbsafe;

USE cbsafe;


    CREATE TABLE endereco (
id_endereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45),
numero CHAR(9),
cep CHAR(9),
bairro VARCHAR(45),
cidade VARCHAR(45),
estado VARCHAR (45),
CONSTRAINT chckEstado CHECK (estado IN("AC", "AL", "AP", "AM",
 "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
 "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
 ))
)AUTO_INCREMENT = 200;

INSERT INTO endereco (id_endereco, rua, numero, cep, bairro, cidade, estado) VALUES

(default, 'Rua Ari Rodrigues', '777', '69900-013', 'São João',  'Rio Branco',  'AC'),
(default, 'Rua Manoel Soares Londres', '71', '58010-010', 'Manaira', 'João Pessoa', 'PA'),
(default, 'Rua Miramar', '87', '59010-015', 'Alecrim', 'Natal', 'RN'), 
(default, 'Rua Libero', '242', '60011-014', 'Tucanos', 'Londrina', 'PR');

select * from endereco;

CREATE TABLE empresa (
	id_empresa INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR (50),
	cnpj CHAR (18),
	fk_endereco INT,
    CONSTRAINT fk_Endereco FOREIGN KEY (fk_endereco)
    REFERENCES endereco(id_endereco)
) AUTO_INCREMENT = 10000;

-- INSERIR DADOS NA TABELA EMPRESA
INSERT INTO empresa (nome, cnpj, fk_endereco) VALUES
	('Grupo gui', '01.200.477/0001-03', 200),
	('Grupo LA', '37.570.300/0001-74', 201),
	('JohnEnterprises', '20.780.209/0001-20', 202), 
    ('Grupo Lucca & Lucas', '33.790.210/0001-30', 203);
    
    -- MOSTRAR O NOME DA EMPRESA EM QUE O ID É 10001
SELECT nome FROM empresa
	WHERE id_empresa = 10001;


SELECT * FROM empresa;

SELECT emp.nome, ende.rua FROM Empresa AS emp JOIN Endereco AS ende ON id_endereco = fk_endereco;



CREATE TABLE usuario (
	id_usuario INT AUTO_INCREMENT,
    supervisor VARCHAR (20),
    email VARCHAR (30),
    senha VARCHAR (15),
    fk_empresa INT,
    
    CONSTRAINT fk_empresa_user
		FOREIGN KEY (fk_empresa)
			REFERENCES empresa(id_empresa),
	
    CONSTRAINT pk_user_empresa
		PRIMARY KEY (id_usuario, fk_empresa)
    );

-- DESCREVER USUÁRIO
DESC usuario;

-- INSERIR DADOS NA TABELA
INSERT INTO usuario (supervisor, email, senha, fk_empresa) VALUES
	('marcos', 'marcos@amanteigado.com', '12345', 10000),
    ('paulo', 'paulo@vinho.com', 'amominhamae', 10001),
    ('fiona', 'fiona@suco.com', 'shrek123', 10002),
    ('ruan', 'ruan@maionese.com', 'maionesedeovo', 10003);

-- MOSTRAR OS DADOS DA TABELA
SELECT * FROM usuario;

-- MOSTRAR OS DADOS DA TABELA EM QUE O SUPERVISOR TEM 'A' NO NOME E ORDENAR PELO CNPJ
SELECT * FROM usuario
    WHERE supervisor LIKE "%a%"
        ORDER BY id_usuario;
        
SELECT empresa.nome, usuario.supervisor 
FROM empresa
JOIN usuario 
    ON id_empresa = fk_empresa;
    
    -- TABELA 3 - COMPOST BARN

-- CRIAR TABELA Compost_barn
CREATE TABLE compost_barn (
	id_cb INT PRIMARY KEY AUTO_INCREMENT,
	area_m2 VARCHAR (30),
	qtd_vacas INT,
    data_ultima_manutencao DATE,
	fk_empresa INT,
    
    CONSTRAINT fk_empresa_cb
		FOREIGN KEY (fk_empresa)
			REFERENCES empresa(id_empresa)
) AUTO_INCREMENT = 1000;

-- INSERIR VALORES NA TABELA
INSERT INTO compost_barn (area_m2, qtd_vacas, data_ultima_manutencao, fk_empresa) VALUES
	('1500',100,'2024-05-20', 10001),
	('1000',90,'2024-09-02', 10002),
	('1200',80,'2024-02-17', 10003),
    ('1100', 110, '2024-03-15', 10000);

-- EXIBIR TODOS OS DADOS DA TABELA
SELECT * FROM compost_barn;

-- EXIBIR TODOS OS DADOS DA TABELA EM QUE A DATA É 2 MESES DA DATA ATUAL
SELECT * FROM compost_barn 
	WHERE data_ultima_manutencao < '2024-07-04';
    
SELECT 
	empresa.nome, 
	compost_barn.area_m2, 
    compost_barn.qtd_vacas, 
    compost_barn.data_ultima_manutencao 
		FROM empresa
		JOIN compost_barn 
			ON id_empresa = fk_empresa;
            
SELECT * FROM compost_barn;
    
-- TABELA 4 - DADOS COLETADOS DO SENSOR

-- CRIAR TABELA DADOS DO SENSOR
CREATE TABLE dados_sensor(
	id_dado INT PRIMARY KEY auto_increment,
	umidade DECIMAL (4,2),
	data_hora DATETIME,
	alerta VARCHAR(20),
    fk_compost_barn INT,
    
    CONSTRAINT fk_compost_barn_dados
		FOREIGN KEY (fk_compost_barn)
			REFERENCES compost_barn(id_cb),
    
    CONSTRAINT chk_alerta
		CHECK (alerta IN ('verde', 'amarelo', 'vermelho'))
        
) AUTO_INCREMENT = 100;

-- INSERIR DADOS NA TABELA
INSERT INTO dados_sensor (umidade, data_hora, alerta, fk_compost_barn) VALUES
	(70.9, '2024-08-01 16:44:00', 'vermelho', 1000),
	(35.6, '2024-08-09 16:50:09', 'verde', 1001),
	(44.8, '2024-08-09 18:00:01', 'amarelo', 1002),
    (25.6, '2024-08-09 18:00:01', 'vermelho', 1003);

-- MOSTRAR OS DADOS DO SENSOR EM QUE O ALERTA É VERDE
SELECT * FROM dados_sensor
	WHERE alerta = 'verde';

-- MOSTRAR OS DADOS DO SENSOR EM QUE O ALERTA É VERMELHO
SELECT * FROM dados_sensor
	WHERE alerta = 'vermelho';
        
-- MOSTRAR UMA MENSAGEM QUE UNE O HORÁRIO, REGISTRO E O ALERTA
SELECT CONCAT('A leitura de umidade no dia e no horário ', data_hora, ' foi ', umidade, '%, o que gerou um alerta ', alerta) AS "Registro do dado"
	FROM dados_sensor;
    
SELECT 
	compost_barn.area_m2, 
    compost_barn.qtd_vacas, 
    compost_barn.data_ultima_manutencao,
	dados_sensor.umidade,
    dados_sensor.data_hora,
    dados_sensor.alerta
		FROM dados_sensor
		JOIN compost_barn 
			ON id_cb = fk_compost_barn;

    

