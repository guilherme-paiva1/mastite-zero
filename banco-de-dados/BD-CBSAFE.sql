DROP DATABASE cbsafe;
CREATE DATABASE cbsafe;
USE cbsafe;


-- CRIAÇÃO DA TABELA EMPRESA
CREATE TABLE Empresa (
	id_empresa INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(45),
	nome_fantasia VARCHAR(50),
  razao_social VARCHAR (50),
	representante_legal VARCHAR(45),
	cnpj CHAR (18)
);

-- INSERIR DADOS NA TABELA EMPRESA
INSERT INTO Empresa (nome_fantasia,razao_social,representante_legal, cnpj) VALUES
	('Grupo Compost Barn S/A', 'Leite Feliz','Lucas Hernandes Furquim' ,'01.200.477/0001-03'),
	('Grupo LA Laticínios', 'Fazenda Raio de Sol', 'Guilherme Vieira','37.570.300/0001-74'),
	('JohnEnterprises Milk', 'Vaca Sorridente','Lucca Barbosa', '20.780.209/0001-20'), 
    ('Grupo João & Maria Laticínios', 'João & Maria', 'Diego Furtado','33.790.210/0001-30');
    
-- MOSTRAR O NOME DA EMPRESA EM QUE O ID É 1
SELECT nome_fantasia FROM Empresa
	WHERE id_empresa = 1;

SELECT * FROM Empresa;

SELECT emp.nome_fantasia
	FROM Empresa AS emp;
    
SELECT cnpj FROM Empresa;

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
);

INSERT INTO Endereco (logradouro, numero, cep, cidade, estado, complemento) VALUES
	('Rua Ari Rodrigues', '777', '69900-013', 'Rio Branco',  'AC', 'Portão 2'),
	('Rua Manoel Soares Londres', '71', '58010-010', 'João Pessoa', 'PA', 'Apartamento Nº45'),
	('Rua Miramar', '87', '59010-015', 'Natal', 'RN', 'Portaria 5'), 
	('Rua Libero', '242', '60011-014', 'Londrina', 'PR', 'Portão 1');

CREATE TABLE Fazenda (
	id_fazenda INT AUTO_INCREMENT,
	nome VARCHAR(45),
	fk_endereco INT,
	fk_empresa INT,

	CONSTRAINT PRIMARY KEY (id_fazenda, fk_empresa),

	CONSTRAINT fk_endereco_fazenda
	FOREIGN KEY (fk_endereco)
		REFERENCES Endereco(id_endereco)
);

INSERT INTO Fazenda (nome, fk_endereco, fk_empresa)VALUES
("Fazenda muito alegre", 1, 1),
("Fazenda mais alegre ainda", 2, 1),
("Piracanjuba", 3, 2),
("Chocolate", 4, 3);


CREATE TABLE Usuario (
	id_usuario INT AUTO_INCREMENT,
    nome VARCHAR (45),
    email VARCHAR (30),
    senha VARCHAR (15),
    fk_supervisor INT,
    fk_empresa INT,
		fk_fazenda INT,
    CONSTRAINT PRIMARY KEY (id_usuario, fk_empresa),
        
    CONSTRAINT fk_empresa_user
		FOREIGN KEY (fk_empresa)
			REFERENCES Empresa (id_empresa),
	
    CONSTRAINT fk_usuario_supervisor
		FOREIGN KEY (fk_supervisor)
			REFERENCES Usuario (id_usuario),

			CONSTRAINT fk_fazenda_user
		FOREIGN KEY (fk_fazenda)
			REFERENCES Usuario (id_usuario)
);

-- DESCREVER TABELA USUÁRIO
DESC Usuario;

-- INSERIR DADOS NA TABELA
INSERT INTO Usuario (nome, email, senha, fk_empresa,fk_fazenda) VALUES
	('Marcos', 'marcos@compost.com', '12345', 1,1),
    ('Paulo', 'paulo@la.com', 'amominhamae', 2,1),
    ('Fiona', 'fiona@johnent.com', 'shrek123', 3,1),
    ('Ruan', 'ruan@jmlat.com', 'maionesedeovo', 4,2);
    
INSERT INTO Usuario (nome, email, senha, fk_supervisor, fk_empresa,fk_fazenda) VALUES
	('João', 'joao@compost.com', '54321', 1, 1,1),
    ('Genildo', 'genildo@la.com', 'amominhatia', 2, 2,2),
    ('Ana', 'ana@johnent.com', 'john123', 3, 3,1),
    ('Sara', 'sara@jmlat.com', 'queijominhavida', 4, 4,3);

-- MOSTRAR OS DADOS DA TABELA
SELECT * FROM Usuario;

-- MOSTRAR OS DADOS DA TABELA EM QUE O SUPERVISOR TEM 'A' NO NOME E ORDENAR PELO CNPJ
SELECT * FROM Usuario
    WHERE nome LIKE "%a%"
        ORDER BY id_usuario;

SELECT e.nome_fantasia as 'Empresa', f.nome as 'Funcionário', s.nome as 'Supervisor' 
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
	fk_fazenda INT,
    
    CONSTRAINT fk_fazenda_cb
		FOREIGN KEY (fk_fazenda)
			REFERENCES Fazenda (id_fazenda)
) AUTO_INCREMENT = 1000;

ALTER TABLE Compost_barn ADD COLUMN apelido VARCHAR(45);

-- INSERIR VALORES NA TABELA
INSERT INTO Compost_barn (area_m2, data_ultima_manutencao, fk_fazenda) VALUES
	('1100', '2024-03-15', 1),
    ('1500', '2024-05-20', 2),
	('1000', '2024-09-02', 3),
	('1200', '2024-02-17', 4);

UPDATE Compost_barn SET apelido = 'CB Girolanda' WHERE id_cb = 1000;
UPDATE Compost_barn SET apelido = 'CB Gir' WHERE id_cb = 1001;
UPDATE Compost_barn SET apelido = 'CB Holandesa' WHERE id_cb = 1002;
UPDATE Compost_barn SET apelido = 'CB Jersey' WHERE id_cb = 1003;

INSERT INTO Compost_barn (area_m2, data_ultima_manutencao, apelido, fk_fazenda) VALUES
	('800', '2024-07-18', 'CB Variado', 1);

-- CRIAR TABELA SENSOR
CREATE TABLE Sensor(
	id_sensor INT PRIMARY KEY AUTO_INCREMENT,
  grupo VARCHAR (45),
    fk_cb INT,
    
    CONSTRAINT fk_sensor_cb 
		FOREIGN KEY (fk_cb)
			REFERENCES Compost_barn(id_cb)
);

INSERT INTO Sensor (grupo, fk_cb) VALUES
	('Grupo 1', 1000),
    ('Grupo 1', 1000),
    ('Grupo 2', 1000),
    ('Grupo 1', 1001);

-- CRIAR TABELA DADOS DO SENSOR
CREATE TABLE Dados_sensor(
	id_dado INT AUTO_INCREMENT,
	umidade DECIMAL (4,2),
	data_hora DATETIME,
    fk_sensor INT,
    
    CONSTRAINT PRIMARY KEY (id_dado, fk_sensor),
    
    CONSTRAINT fk_sensor_dados
		FOREIGN KEY (fk_sensor)
			REFERENCES Sensor(id_sensor)
);
    
CREATE TABLE Adm (
	id_admin INT PRIMARY KEY AUTO_INCREMENT,	
    email VARCHAR(45),
    senha VARCHAR(45)
);

INSERT INTO Adm (email, senha) VALUES
	('viniaoki@gmail.com', 'Urubu100@'),
    ('lucasfurquim@gmail.com', 'Urubu100@');

/* SELECT
	Sensor.grupo, 
	Dados_sensor.umidade,
    Dados_sensor.data_hora,
	Empresa.nome_fantasia,
	Compost_barn.area_m2,
    Compost_barn.data_ultima_manutencao
		FROM Dados_sensor
        JOIN Sensor
			ON id_sensor = fk_sensor
		JOIN Compost_barn 
			ON id_cb = fk_cb
		JOIN Empresa 
			ON id_empresa = fk_empresa;

select Sensor.grupo as 'Grupo do sensor', 
	dados.umidade as 'Umidade registrada', 
    dados.data_hora as 'Data e hora'
    from Sensor join Dados_sensor as dados
    on id_sensor = fk_sensor; */
    
