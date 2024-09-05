-- TABELA 1 - DADOS DE CADASTRO
CREATE DATABASE cadastro;
USE cadastro;

CREATE TABLE login (
id int primary key auto_increment,
nome_completo varchar(100),
email varchar(70),
senha varchar(100),
nome_empresa varchar(100)
);

INSERT INTO login (nome_completo, email, senha, nome_empresa) VALUES 
('Robson Fernandes', 'robsonfer@gmail.com', '2hhf23721', 'Fazenda Atalaia'),
('Amanda Tales', 'amandatales@hotmail.com', 'Gbs89!28', 'Fazenda Feliz'),
('Luna Soares', 'lunasoares@gmail.com', 'DSH@2832', 'Fazenda Recanto'),
('Felipe Ferraz', 'felipeferraz@gmail.com', 'jduHY828', 'Fazenda Leiteira');

SELECT * FROM login
	WHERE nome_completo LIKE '%s';

SELECT * FROM login	
	WHERE email LIKE '%gmail%';

-- TABELA 2 - DADOS COLETADOS DO SENSOR
CREATE DATABASE arduino;
USE arduino;

CREATE TABLE dadosSensor(
id INT PRIMARY KEY AUTO_INCREMENT,
umidade FLOAT,
dataHora DATETIME,
alerta VARCHAR(20) CONSTRAINT chkAlerta CHECK (alerta in ('verde', 'amarelo', 'vermelho'))
);

INSERT INTO dadosSensor (umidade, dataHora, alerta) VALUES
(70.9, '2024-08-01 16:44:00', 'vermelho'),
(25.6, '2024-08-09 16:50:09', 'verde'),
(44.8, '2024-08-09 18:00:01', 'amarelo');

SELECT * FROM dadosSensor
	WHERE alerta = 'verde';

SELECT * FROM dadosSensor
	WHERE alerta = 'vermelho';
    

-- TABELA 3 - LOTES E PROD. DE LEITE
CREATE DATABASE producao;
USE producao;

CREATE TABLE lotes(
idVaca INT PRIMARY KEY AUTO_INCREMENT,
lote INT CONSTRAINT chkLote CHECK (lote in (1,2,3)),
producaoDeLeite FLOAT,
raca VARCHAR(50),
mesDeLactacao INT
);

INSERT INTO lotes (lote, producaoDeLeite, raca , mesDeLactacao) VALUES
(1, 40, 'Girolanda', 3 ),
(2, 35, 'Holandesa', 4),
(3, 18, 'Girolanda', 6);

SELECT * FROM lotes
	WHERE raca LIKE '%d_';
    
SELECT * FROM lotes
	WHERE producaoDeLeite = 40;




