create database dbcadastro;

use dbcadastro;

create table usuarioCadastrado(
	idUser int auto_increment primary key,
    nomUser varchar(20),
    emailUser varchar(255),
    senha varchar(255)
);