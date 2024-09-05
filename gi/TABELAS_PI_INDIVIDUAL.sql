-- CRIAR BANCO DE DADOS
CREATE DATABASE sprint_1;
-- USAR BANCO DE DADOS
USE sprint_1;
-- CRIAR TABELA USUARIO
CREATE TABLE usuario (
id_usuario int PRIMARY KEY AUTO_INCREMENT,
nome_empresa varchar(30),
nome_resposavel varchar (30),
numero_CNPJ varchar(30),
email varchar(30),
senha varchar(8)
);
-- COLOCAR VALORES NA TABELA
INSERT INTO usuario (nome_empresa,nome_resposavel,numero_CNPJ,email,senha) VALUES 
('Delicari','Geraldo', '15.432.378/0001-31','delicari@gmail.com','CSD32567'),
('Salles','Julio', '15.432.378/0001-31','salles@gmail.com','XDS18905'),
('Agroleite','Junior', '05.321.226/0001-08','agroleite@gmail.com','PFDV2098');
-- SELECITNAR NA TABELA ONDE O NOME DA ENMPRESA COMEÇA COM D
SELECT * FROM usuario WHERE nome_empresa LIKE 'D%';
-- SELECIONAR NA TABELA ONDE O NUMERO DO CNPJ TERMINE COM 31
SELECT * FROM usuario WHERE numero_CNPJ LIKE '%31';
-- CRIAR TABELA SENSOR
CREATE TABLE sensor ( 
idSensor int PRIMARY KEY AUTO_INCREMENT ,
umidade varchar(10),
data_hora datetime,
alerta varchar(30)
);
-- INSERIR VALORES NA TABELA
INSERT sensor (umidade, data_hora, alerta) VALUES
('20%', '2024-09-04 10:30:02', 'não'),
('40%', '2024-09-03 10:31:23', 'sim'),
('37%', '2024-09-02 10:32:40', 'sim');
-- ORDENAR OS VALORES POR UMIDADE
SELECT * FROM sensor ORDER BY umidade;
-- SELECIONAR NA TABELA ONDE A UMIDADE ESTÁ ENTRE 30% E 45%
SELECT * FROM sensor WHERE umidade BETWEEN '30%' AND '45%';
-- CRIAR TABELA Compost_barn
CREATE TABLE Compost_barn (
idCb int PRIMARY KEY AUTO_INCREMENT,
Area_m2 varchar (30),
Qtd_lotes int,
Qtd_vacas int,
data_ultima_manutencao date
);
-- INSERIR VALORES NA TABELA
INSERT INTO Compost_barn (Area_m2,Qtd_lotes, Qtd_vacas,data_ultima_manutencao) VALUES
('1500','50','100','2024-05-20'),
('75','3','5','2024-09-02'),
('1200','16','80','2024-02-17');
-- EXIBIR TODOS OS CAMPOS DA TABELA
SELECT * FROM Compost_barn;
-- EXIBIR TODOS OS CAMPOS DA TABELA ONDE A DATA É MENOR QUE 2 MESES DA DATA ATUAL
SELECT * FROM Compost_barn WHERE data_ultima_manutencao < '2024-07-04';

