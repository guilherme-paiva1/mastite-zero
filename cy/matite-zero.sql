CREATE DATABASE mastite_zero;

USE mastite_zero;

CREATE TABLE cadastro (
	id INT PRIMARY KEY auto_increment,
    empresa VARCHAR(45),
    supervisor VARCHAR(45),
    email VARCHAR(30),
    senha VARCHAR(20)
);

DESC cadastro;

INSERT INTO cadastro VALUES
	(default, 'Fazenda Leite Feliz', 'Antônio', 'antonio@leitefeliz.com', 'amoleite@2024'),
    (default, 'Fazenda Atibaia', 'Mariana', 'mariana@atibaia.com', 'l3it3ehbom!'),
    (default, 'Senhor Fagundes', 'Mercedes', 'mercedes@fagundes.com', 'vacas2eu#'),
    (default, 'Fazenda HappyCow', 'Pablo', 'pablo@happycow.com', 'milkis11to10!');
    
SELECT * FROM cadastro;

SELECT * FROM cadastro ORDER BY empresa;

CREATE TABLE dados (
	id INT PRIMARY KEY AUTO_INCREMENT,
    umidade FLOAT(4,1),
    data_hora datetime,
    alerta CHAR(3)
);

DESC dados;

INSERT INTO dados VALUES
	(default, 40.3, '2024-08-28	17:30:00', 'Não'),
    (default, 52.5, '2024-08-28	18:30:00', 'Sim'),
    (default, 33.6, '2024-08-28	19:30:00', 'Não'),
    (default, 25.6, '2024-08-28	20:30:00', 'Sim'),
    (default, 47.9, '2024-08-28	21:30:00', 'Sim');
    
SELECT * FROM dados;

SELECT umidade, data_hora FROM dados
	WHERE alerta = 'Sim';
    
CREATE TABLE litrosLeite (
	id INT PRIMARY KEY AUTO_INCREMENT,
    loteVaca VARCHAR(10)
    constraint chklote
		CHECK(loteVaca IN('Primeiro', 'Segundo', 'Terceiro')),
	qtdLeite INT,
    dtInicio DATE
) AUTO_INCREMENT = 1000;

ALTER TABLE litrosLeite ADD COLUMN doente CHAR(3)
constraint chkdoente CHECK (doente IN ('sim', 'não'));

INSERT INTO litrosLeite VALUES
	(DEFAULT, 'Primeiro', 50, '2024-08-02', 'não'),
    (DEFAULT, 'Segundo', 20, '2024-09-02', 'sim'),
    (DEFAULT, 'Segundo', 23, '2024-08-25', 'não'),
    (DEFAULT, 'Primeiro', 45, '2024-08-15', 'sim'),
    (DEFAULT, 'Terceiro', 15, '2024-08-10', 'não');
    
SELECT * FROM litrosLeite;

SELECT id, qtdLeite FROM litrosLeite
	WHERE doente = 'sim';
    
SELECT id as 'Código de cadastro da vaca', loteVaca as 'Lote da vaca', qtdLeite as 'Litros de leite por dia',
dtInicio as 'Início do lote', doente FROM litrosLeite;

-- Comentarios Cynthia: Só usaria o das minhas tabela o campo supervisor (só por achar que fica mais legal o nome mesmo)
-- talvez usar algum dos meus selects (tipo esse ultimo da terceira tabela), é legal deixar os campos descritivos para o cliente entender bem o que estamos falando