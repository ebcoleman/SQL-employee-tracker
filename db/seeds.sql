INSERT INTO department (department_name)
VALUES ('Accounting'),
    ('Purchasing'),
    ('Production');

INSERT INTO role (title, salary, department_id)
VALUES ('CFO', 100000, 1),  
    ('Purchasing Manager', 85000, 2), 
    ('Buyer', 60000, 2),  
    ('Warehouse Supervisor', 65000, 3), 
    ('Builder', 35000, 3);  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Karen', 'Jones', 1, null),  
    ('Adam', 'Jorge', 2, 1), 
    ('Jason', 'Williams', 3, 2),  
    ('Roy', 'Carter', 4, 1),  
    ('Ruthie', 'Grey', 5, 4);  