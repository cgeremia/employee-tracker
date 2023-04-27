INSERT INTO department(department_name, department_id)
VALUES("Engineering", 1), ("Sales", 2), ("Marketing", 3)

INSERT INTO roles_table (title, salary, department_id)
VALUES("Engineer", 1000000, 1), ("Sales", 85000, 2), ("Marketing", 95000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 2, null),
("Paula","Dean", 2, 1),
("Jamie", "Lynn", 1, 1),
("Frank", "Gilbert", 1, null),
("Kelly", "Price", 1, 1),
("Dominic", "Torreto", 3, null),
("Aaron", "Johnson", 3, 1)