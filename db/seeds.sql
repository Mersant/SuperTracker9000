INSERT INTO departments (department_name)
VALUES  ("Customer Service"),
        ("Engineers"),
        ("Interns"),
        ("Executives");

INSERT INTO roles (title, salary, role_dept_id)
VALUES  ("Manager", 90000, 4),
        ("Project lead", 120000, 2),
        ("Computer Engineer", 75000, 2),
        ("School boy", 20000, 3),
        ("Big boss", 256000, 4),
        ("Customer Service Rep", 40000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Quandale", "Dingle", 5, NULL),
        ("Patrick", "Bateman", 1, 1),
        ("Mr.", "Manager", 1, 1),
        ("Mr.", "Bean", 1, 1),
        ("Robert", "Pattinson", 2, 2),
        ("Tommy", "Wiseau", 3,3),
        ("Ned", "Flanders", 4,1),
        ("Q-Bert", "Unkown",6,1),
        ("MrBean", "ManagesMe",6,9),
        ("MrManager", "ManagesMe",6,8),
        ("Bill", "Watterson",3,3);