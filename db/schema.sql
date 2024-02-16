DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT
);

CREATE TABLE employee(
    id INT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT
);

-- department.id needs to be linked to role.department_id
-- role.id needs to be linked to employee.role_id
-- employee.id needs to be linked to employee.manager_id