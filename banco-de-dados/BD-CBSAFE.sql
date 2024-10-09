CREATE DATABASE cbsafe;

USE cbsafe;

CREATE TABLE Endereco (
	id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(9),
    cidade VARCHAR(45),
	estado VARCHAR (45),
	logradouro VARCHAR(45),
	numero CHAR(9),
	complemento VARCHAR(45),
	
	CONSTRAINT chkEstado 
		CHECK (estado IN(
				"AC", "AL", "AP", "AM",
				"BA", "CE", "DF", "ES", 
                "GO", "MA", "MT", "MS", 
                "MG", "PA", "PB", "PR", 
                "PE", "PI", "RJ", "RN", 
                "RS", "RO", "RR", "SC", 
                "SP", "SE", "TO")
			)
) AUTO_INCREMENT = 200;

INSERT INTO Endereco (logradouro, numero, cep, cidade, estado, complemento) VALUES
	('Rua Ari Rodrigues', '777', '69900-013', 'Rio Branco',  'AC', 'Portão 2'),
	('Rua Manoel Soares Londres', '71', '58010-010', 'João Pessoa', 'PA', 'Apartamento Nº45'),
	('Rua Miramar', '87', '59010-015', 'Natal', 'RN', 'Portaria 5'), 
	('Rua Libero', '242', '60011-014', 'Londrina', 'PR', 'Portão 1');

-- CRIAÇÃO DA TABELA EMPRESA
CREATE TABLE Empresa (
	id_empresa INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR (50),
	cnpj CHAR (18),
    responsavel VARCHAR(45),
	fk_endereco INT,
    CONSTRAINT fk_empresa_endereco 
		FOREIGN KEY (fk_endereco)
			REFERENCES endereco(id_endereco)
) AUTO_INCREMENT = 10000;

-- INSERIR DADOS NA TABELA EMPRESA
INSERT INTO Empresa (nome, cnpj, responsavel, fk_endereco) VALUES
	('Grupo Compost Barn', '01.200.477/0001-03', 'Marcelo Noronha', 200),
	('Grupo LA', '37.570.300/0001-74', 'Lauro Gomes', 201),
	('JohnEnterprises Milk', '20.780.209/0001-20', 'Karoline Almeida', 202), 
    ('Grupo João & Maria Laticínios', '33.790.210/0001-30', 'Maria Madalena', 203);
    
    -- MOSTRAR O NOME DA EMPRESA EM QUE O ID É 10001
SELECT nome FROM Empresa
	WHERE id_empresa = 10001;

SELECT * FROM Empresa;

SELECT emp.nome, ende.logradouro 
	FROM Empresa AS emp 
    JOIN Endereco AS ende 
		ON id_endereco = fk_endereco;
        
SELECT nome, responsavel FROM Empresa;

CREATE TABLE Usuario (
	id_usuario INT AUTO_INCREMENT,
    nome VARCHAR (45),
    email VARCHAR (30),
    senha VARCHAR (15),
    fk_supervisor INT,
    fk_empresa INT,
    CONSTRAINT pk_usuario_empresa
		PRIMARY KEY (id_usuario, fk_empresa),
        
    CONSTRAINT fk_empresa_user
		FOREIGN KEY (fk_empresa)
			REFERENCES Empresa (id_empresa),
	
    CONSTRAINT fk_usuario_supervisor
		FOREIGN KEY (fk_supervisor)
			REFERENCES Usuario (id_usuario)
);

-- DESCREVER TABELA USUÁRIO
DESC Usuario;

-- INSERIR DADOS NA TABELA
INSERT INTO Usuario (nome, email, senha, fk_empresa) VALUES
	('Marcos', 'marcos@compost.com', '12345', 10000),
    ('Paulo', 'paulo@la.com', 'amominhamae', 10001),
    ('Fiona', 'fiona@johnent.com', 'shrek123', 10002),
    ('Ruan', 'ruan@jmlat.com', 'maionesedeovo', 10003);
    
INSERT INTO Usuario (nome, email, senha, fk_supervisor, fk_empresa) VALUES
	('João', 'joao@compost.com', '54321', 1, 10000),
    ('Genildo', 'genildo@la.com', 'amominhatia', 2, 10001),
    ('Ana', 'ana@johnent.com', 'john123', 3, 10002),
    ('Sara', 'sara@jmlat.com', 'queijominhavida', 4, 10003);

-- MOSTRAR OS DADOS DA TABELA
SELECT * FROM Usuario;

-- MOSTRAR OS DADOS DA TABELA EM QUE O SUPERVISOR TEM 'A' NO NOME E ORDENAR PELO CNPJ
SELECT * FROM Usuario
    WHERE nome LIKE "%a%"
        ORDER BY id_usuario;

SELECT e.nome as 'Empresa', f.nome as 'Funcionário', s.nome as 'Supervisor' 
	FROM Empresa as e
	JOIN Usuario as f
		ON e.id_empresa = f.fk_empresa
	JOIN Usuario as s
		ON s.id_usuario = f.fk_supervisor;

-- CRIAR TABELA Compost_barn
CREATE TABLE Compost_barn (
	id_cb INT PRIMARY KEY AUTO_INCREMENT,
	area_m2 VARCHAR (30),
    data_ultima_manutencao DATE,
	fk_empresa INT,
    
    CONSTRAINT fk_empresa_cb
		FOREIGN KEY (fk_empresa)
			REFERENCES empresa (id_empresa)
) AUTO_INCREMENT = 1000;

-- INSERIR VALORES NA TABELA
INSERT INTO compost_barn (area_m2, data_ultima_manutencao, fk_empresa) VALUES
	('1100', '2024-03-15', 10000),
    ('1500', '2024-05-20', 10001),
	('1000', '2024-09-02', 10002),
	('1200', '2024-02-17', 10003);
    

-- EXIBIR TODOS OS DADOS DA TABELA
SELECT * FROM Compost_barn;

-- EXIBIR TODOS OS DADOS DA TABELA EM QUE A DATA É 2 MESES DA DATA ATUAL
SELECT * FROM Compost_barn 
	WHERE data_ultima_manutencao < '2024-07-04';
    
SELECT 
	Empresa.nome, 
	Compost_barn.area_m2,
    Compost_barn.data_ultima_manutencao 
		FROM Empresa
		JOIN Compost_barn 
			ON id_empresa = fk_empresa;

-- CRIAR TABELA DADOS DO SENSOR
CREATE TABLE Dados_sensor(
	id_dado INT PRIMARY KEY auto_increment,
	umidade DECIMAL (4,2),
	data_hora DATETIME,
    fk_compost_barn INT,
    
    CONSTRAINT fk_compost_barn_dados
		FOREIGN KEY (fk_compost_barn)
			REFERENCES compost_barn(id_cb)
) AUTO_INCREMENT = 100;

-- INSERIR DADOS NA TABELA
INSERT INTO dados_sensor (umidade, data_hora, fk_compost_barn) VALUES
	(70.9, '2024-08-01 16:44:00', 1000),
	(35.6, '2024-08-09 16:50:09', 1001),
	(44.8, '2024-08-09 18:00:01', 1002),
    (25.6, '2024-08-09 18:00:01', 1003);
        
-- MOSTRAR UMA MENSAGEM QUE UNE O HORÁRIO E O REGISTRO
SELECT CONCAT('A leitura de umidade no dia e no horário ', data_hora, ' foi ', umidade, '%') AS "Registro do dado"
	FROM Dados_sensor;
    
SELECT 
	Compost_barn.area_m2,
    Compost_barn.data_ultima_manutencao,
	Dados_sensor.umidade,
    Dados_sensor.data_hora
		FROM Dados_sensor
		JOIN Compost_barn 
			ON id_cb = fk_compost_barn;

    

