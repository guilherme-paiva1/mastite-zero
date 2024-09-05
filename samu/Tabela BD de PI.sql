CREATE DATABASE ProjetoPI;

USE ProjetoPI; 

CREATE TABLE cadastro (
id INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR (100) NOT NULL,
sexo VARCHAR (10) CONSTRAINT chksexo
	CHECK ( sexo IN ('M', 'F', 'OUTRO')),
email VARCHAR (100) NOT NULL, 
cep CHAR (9), 
logradouro VARCHAR (100) NOT NULL,
estado CHAR (2),
cidade VARCHAR (50),
cnpj VARCHAR (20) NOT NULL,
senha VARCHAR (100),
confirmacaoSenha VARCHAR (100),
razaoSocial VARCHAR (200) NOT NULL,
nomeFantasia VARCHAR (200) NOT NULL
);

INSERT INTO cadastro (nome, sexo, email, cep, logradouro, estado, cidade, cnpj, senha, confirmacaoSenha, razaoSocial, nomeFantasia) VALUES
('Leandro da Silva', 'M', 'leandrosilva@sptech.com', '09840-370', 'Rua União e Força, 222', 'SP', 'São Bernardo do Campo', '07.358.761/0224-90', 'muhvaca123', 'muhvaca123', 'GRUPO LEANDRIX', 'Happy Vacas'),
('Cintia da Mata', 'F', 'Damatacintia@sptech.com', '07390-120', 'Av Interlagos, 920', 'SP', 'São Paulo', '09.400.777/2224-34', 'cdm33@#', 'cdm33@#', 'VACAS.LTDA', 'MINHA VACA MINHA VIDA');

SELECT * FROM cadastro;

SELECT * FROM cadastro WHERE estado = 'SP' AND cidade = 'São Paulo';


CREATE TABLE dadosSensor (
id INT PRIMARY KEY AUTO_INCREMENT,
umidadeSoloHora_porcentagem INT,
leituraDia DATETIME,
avaliacao VARCHAR (10) CONSTRAINT chkavaliacao
	CHECK ( avaliacao IN ('baixa', 'ideal', 'alta'))
);

INSERT INTO dadosSensor (umidadeSoloHora, leituraDia, avaliacao) VALUES
('30', '2024-08-02 15:33:01', 'ideal'),
('50', '2024-09-04 22:34:32', 'alta'),
('25', '2024-07-22 04:20:20', 'baixa'); 

SELECT * FROM dadosSensor WHERE avaliacao = 'ideal';

SELECT * FROM dadosSensor WHERE umidadeSoloHora = '30' AND leituraDia = '2024-08-02 15:33:01';


CREATE TABLE empresas (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (50),
cnpj VARCHAR (20),
estado VARCHAR (20),
cidade VARCHAR (40),
cep CHAR (9),
logradouro VARCHAR (50),
numero VARCHAR (5),
area_do_cb_metros2 INT,
qtdVacas INT,
qtdLotes INT
);

INSERT INTO dadosSensor (nome, cnpj, estado, cidade, cep, logradouro, numero, area_do_cb_metros2, qtdVacas, qtdLotes) VALUES
('Grupo gui', '01.200.477/2121-03', 'Acre', 'Rio Branco', '69900-013', 'Rua Ari Rodrigues', '777', '7500', '513', '2'),
('Grupo LA', '37.570.300/879-74', 'Paraiba', 'João Pessoa', '58010-010', 'Rua Manoel Soares Londres', '71', '1200', '713', '4'),
('JohnEnterprises', '20.780.209/5000-20', 'Rio Grande do Norte', 'Natal', '59010-015', 'Rua Miramar', '87', '20000', '1350', '4'); 

SELECT * FROM dadosSensor WHERE area_do_cb_metros2 = 500;

SELECT * FROM dadosSensor WHERE estado = 'Acre' AND cidade = 'Rio Branco';