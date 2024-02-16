INSERT INTO department (name)
VALUES ('Accounting'),
    ('Purchasing'),
    ('Production');

INSERT INTO role (title, salary, department_id)
VALUES ('CFO', 100000, 1),  -- Change '001' to 1
    ('Purchasing Manager', 85000, 2),  -- Change '002' to 2
    ('Buyer', 60000, 2),  -- Change '002' to 2
    ('Warehouse Supervisor', 65000, 3),  -- Change '003' to 3
    ('Builder', 35000, 3);  -- Change '003' to 3

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Karen', 'Jones', 1, null),  -- Change '001' to 1
    ('Adam', 'Jorge', 2, 1),  -- Change '002' to 2
    ('Jason', 'Williams', 3, 2),  -- Change '003' to 3
    ('Roy', 'Carter', 4, 1),  -- Change '004' to 4
    ('Ruthie', 'Grey', 5, 4);  -- Change '005' to 5