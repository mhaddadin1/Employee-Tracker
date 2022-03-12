DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

 
CREATE table department (
    id int not null auto_increment primary key,
    name varchar(30) not null
);

create table role (
    id int auto_increment primary key,
    title varchar(30) not null,
    salary decimal,
    department_id int,
    foreign key (department_id)
    REFERENCES departments(id);
);

create table employee (
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
     role_id int,  
    manager_id int,
    foreign key (role_id),
    REFERENCES role(id);

