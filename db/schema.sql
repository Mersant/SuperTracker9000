DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  department_name TEXT NOT NULL
);
CREATE TABLE roles (
  role_name TEXT NOT NULL
);
CREATE TABLE employees (
  employee_name TEXT NOT NULL,
  manager_name TEXT NOT NULL,
  department TEXT NOT NULL
);