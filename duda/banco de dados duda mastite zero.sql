CREATE DATABASE mastite_zero;
USE mastite_zero;

CREATE TABLE usuario (
id int primary key auto_increment,
nome_empresa varchar(60),
cnpj char(18),
email varchar(45),
senha varchar(20)
);

INSERT INTO usuario (nome_empresa, cnpj, email, senha) VALUES 
( 'Fazenda do Seu Zé', '43.859.245/0001-60', 'fazendaZe@gamil.com', 'AmoVaquinhas123'),
('Fazenda Vaquinha pintada', '54.598.233/0001-40', 'vaquinhaPintada@hotmail.com', 'Pintadinha$554');

SELECT * FROM usuario;


CREATE TABLE dados (
id int primary key auto_increment,
id_empresa int,
umidade_porcent int,
umidade_ideal varchar(10),
risco varchar(10),
CONSTRAINT chkUmidade_ideal CHECK (umidade_ideal IN ('acima', 'abaixo', 'ok')),
CONSTRAINT chkRisco CHECK (risco IN ('baixo', 'médio', 'alto'))
) auto_increment = 100;

INSERT INTO dados (id_empresa, umidade_porcent, umidade_ideal, risco) VALUES
  (1, 50, 'acima', 'médio'),
  (2, 30, 'ok', 'baixo');
  
DESCRIBE dados;

SELECT * FROM dados;


CREATE TABLE mastite (
id int primary key auto_increment,
id_empresa int,
qtdVacas int,
qtdVacas_mastite int,
preco_leite float(4,2),
prejuizo float
) auto_increment = 1000;

INSERT INTO mastite (id_empresa, qtdVacas, qtdVacas_mastite, preco_leite, prejuizo) VALUE 
(1, 50, 10, 2.46, 1107),
(2, 100, 25, 2.70, 3037.50);

SELECT * FROM mastite;

-- Comentarios da Cynthia: a primeira tabela ta bem legal, acho que esses dados são os necessarios;
-- segunda tabela - não entendi o id_empresa (eles são para linkar a empresa que ta acessando?)
-- terceira tabela - achei interessante, seria como linkar a calculadora na tabela
-- lembra de colocar mais um select em cada tabela, pediram pelo menos 2
