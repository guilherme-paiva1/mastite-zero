create database cliente;

use cliente;

create table dados_usuario(
id int primary key auto_increment,
usuario VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(15),
nome_empresa varchar(60)
);

Insert into dados_usuario (usuario, email, senha, nome_empresa) values
	('Pepa pig', 'pepapig.assessoria@outlook.com', 'leite123', 'PepaPig Corporation'),
    ('muuuh', 'primevaca.assessoria@outlook.com', 'holandesa354', 'MaisMU SA'),
    ('Gran_boi', 'granboi.agencia@outlook.com', 'vacaeboi47', 'Gran Boi Associacao de Animais');
    
Select * from dados_usuario;

select * from dados_usuario
	where nome_empresa LIKE '%animais%';
    
create table dados_arduino(
id int primary key auto_increment,
data_leitura datetime,   
umidade float (4,1),
alerta VARCHAR(30)
         constraint chkAlerta check( alerta in ( 'alerta verde', 'alerta amarelo', 'alerta vermelho' ))
);

insert into dados_arduino (data_leitura, umidade, alerta) values
	('2024-04-09 15:30:00', '50,8', 'alerta vermelho'),
    ('2024-04-09 16:30:00', '40,7', 'alerta amarelo'),
    ('2024-04-09 17:30:00', '35,9', 'alerta verde');
    
select * from dados_arduino
	where alerta = 'alerta vermelho';
    
select * from dados_arduino
		where umidade > 40;
        
create table dados_empresa (
id int primary key auto_increment,
cep char(8),
rua VARCHAR(100),
numero INT,
bairro VARCHAR(20),
estado VARCHAR(30),
tamanho_terreno INT,
qtd_vacas INT
);

insert into dados_empresa (cep, rua, numero, bairro, estado, tamanho_terreno, qtd_vacas) values
	(09888333, 'rua pentecoste', 2587, 'boi alegre', 'GO', 3000, 740),
    (08745698, 'rua corte profundo', 1999, 'capelinha', 'RN', 12000, 1078),
    (07458968, 'rua leite milk', 14789, 'anyway', 'SP', 25000, 4789);
    
select * from  dados_empresa 
	where estado = 'GO';
    
select * from dados_empresa
	where qtd_vacas > 1000;
    
    




    

