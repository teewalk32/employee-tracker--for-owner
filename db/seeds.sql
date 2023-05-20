USE company_db;

INSERT INTO department (department_name)
VALUES
('Helper'),
('Carpenter'),
('Lead'),
('supervisor');

INSERT INTO roles (title, salary, department_id)
VALUES
('level one', 30000, 1),
('level two', 45000, 2),
('level three', 55000, 3),
('management', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Chris', 'Walter', 1),
('Sam', 'Bucket', 2),
('Gionni', 'Cruz', 2),
('Kiara', 'Walker', 3),
('Brianna', 'Chance', 4),
('Trenda', 'Holmes', 2);