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
    department_id int REFERENCES departments(id)
);

create table employee (
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    manager_id int  REFERENCES employee(id),
    role_id int  REFERENCES role(id));

