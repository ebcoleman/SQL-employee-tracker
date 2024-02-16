INSERT INTO department (id, name)
VALUES (001, 'Accounting'),
    (002, 'Purchasing'),
    (003, 'Production');

INSERT INTO role (id, title, salary, department_id)
VALUES (001, 'CFO', 100000, 111),
    (002, 'Purchasing Manager', 85000, 222)
    (003, 'Buyer', 60000, 222)
    (004, 'Warehouse Supervisor', 65000, 333),
    (005, 'Builder', 35000, 333);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(001, 'Karen', 'Jones', 0002, null), 
    (002, 'Adam', 'Jorge', 0020, 0002),
    (003, 'Jason', 'Williams', 0021., 0020),
    (004, 'Roy', 'Carter', 0030, 0002),
    (005, 'Ruthie', 'Grey', 0031, 0030);