INSERT INTO departments (dept_id, department_name)
VALUES  (1, "Customer Service"),
        (2, "Engineers"),
        (3, "Interns"),
        (4, "Executives");

INSERT INTO roles (id, title, salary, role_dept_id)
VALUES  (1, "Manager", 90000, 4),
        (2, "Project lead", 120000, 2),
        (3, "Computer Engineer", 75000, 2),
        (4, "School boy", 20000, 3),
        (5, "Big boss", 256000, 4),
        (6, "Customer Service Rep", 40000, 1);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Quandale", "Dingle", 5, NULL),
        (2, "Patrick", "Bateman", 1, 1),
        (8, "Mr.", "Manager", 1, 1),
        (9, "Mr.", "Bean", 1, 1),
        (3, "Robert", "Pattinson", 2, 2),
        (4, "Tommy", "Wiseau", 3,3),
        (5, "Ned", "Flanders", 4,1),
        (6, "Q-Bert", "Unkown",6,1),
        (10, "MrBean", "ManagesMe",6,9),
        (11, "MrManager", "ManagesMe",6,8),
        (7, "Bill", "Watterson",3,3);