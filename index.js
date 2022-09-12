const CLControl = require('./lib/CLControl.js')
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');
const pressAnyKey = require('press-any-key');
const clc = require('./lib/CLControl.js');
const { delay } = require('rxjs');
require('dotenv').config();

const CLC = new CLControl;

// Connect to database
const db = mysql.createConnection(
    {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'company_db'
    },
);

function dispHeader(colorFunc, quip) {
    CLC.CLS();
    colorFunc();
    console.log(`───────────────────────────────────────────────────────────────────────────────────\n                                       ___                                           \n  -_-/                                -   ---___-                  ,,                \n (_ /                                    (' ||            _        ||                \n(_ --_  \\\\ \\\\ -_-_   _-_  ,._-_         ((  ||    ,._-_  < \\,  _-_ ||/\\  _-_  ,._-_  \n  --_ ) || || || \\\\ || \\\\  ||          ((   ||     ||    /-|| ||   ||_< || \\\\  ||    \n _/  )) || || || || ||/    ||           (( //      ||   (( || ||   || | ||/    ||    \n(_-_-   \\\\/\\\\ ||-'  \\\\,/   \\\\,            -____-   \\\\,   \\/\\\\ \\\\,/ \\\\,\\ \\\\,/   \\\\,   \n              |/               /\\\\   /\\\\   /\\\\   /\\\\                                 \n              '               || || || || || || || ||                                \n                              || || || || || || || ||                                \n                               \\/|| || || || || || ||                                \n                                 || || || || || || ||                                \n                               \\_/   \\\\/   \\\\/   \\\\/    ${quip}            \n───────────────────────────────────────────────────────────────────────────────────`);
    CLC.RST();
}

function mainMenu() {
    dispHeader(CLC.GREEN, "Better than 8999!");
    inquirer
        .prompt([
        {
            type: 'list',
            message: 'What would you like to do today?',
            choices: [
                '\u001b[36mView all departments\u001b[0m',
                '\u001b[36mView all roles\u001b[0m',
                '\u001b[36mView all employees\u001b[0m',
                '\u001b[36mView employees by manager\u001b[0m',
                '\u001b[36mView employees by department\u001b[0m',
                '\u001b[34mView total budget of a department\u001b[0m',
                '\u001b[31mDelete a department\u001b[0m',
                '\u001b[31mDelete a role\u001b[0m',
                '\u001b[31mDelete an employee\u001b[0m'
            ],
            name: 'selectedOption',
        },
        ])
        .then((response) => {
            switch(response.selectedOption) {

                case '\u001b[36mView all departments\u001b[0m':
                    viewDb('SELECT * FROM departments;');
                    break;
                case '\u001b[36mView all roles\u001b[0m':
                    viewDb('SELECT * FROM roles LEFT JOIN departments ON role_dept_id = departments.dept_id;');
                    break;
                case '\u001b[36mView all employees\u001b[0m':
                    viewDb('SELECT employee.employee_id as id, first_name, last_name, title as role FROM employee RIGHT JOIN roles ON role_id = roles.id;');
                    break;
                case '\u001b[36mView employees by manager\u001b[0m':
                    viewByManager();
                    break;
                case '\u001b[36mView employees by department\u001b[0m':
                    viewByDepartment();
                    break;

                case '\u001b[36mView total budget of a department\u001b[0m':
                    viewByDepartment();
                    break;
                    
                case "\u001b[31mDelete a department\u001b[0m":
                    deleteDepartment();
                    break;

                default:
                    break;
            }
        }
    );
}
mainMenu();

function viewByManager() {
    dispHeader(CLC.BLUE, "Viewing by manager...");
    db.query(
        'SELECT * FROM employee WHERE role_id=1;',
        function(err, results, fields) {
          var temp = [];
          results.forEach(dat => temp.push(`${dat["first_name"]} ${dat["last_name"]}`));
          var managerOptions = [...new Set(temp)];

          inquirer
            .prompt([
            {
                type: 'list',
                message: 'Please select manager from the list',
                choices: managerOptions,
                name: 'managerSelection'
            }
            ])
            .then((response) => {
                viewDb(`SELECT employee.employee_id as id, first_name, last_name FROM employee WHERE manager_id = (SELECT employee_id FROM employee WHERE employee_id = ${results[managerOptions.indexOf(response.managerSelection)]["employee_id"]});`);
            })
        }
    );
}

function viewByDepartment() {
    dispHeader(CLC.BLUE, "Viewing by department...");
    db.query(
        'SELECT * FROM departments;',
        function(err, results, fields) {
          var temp = [];
          results.forEach(dat => temp.push(dat["department_name"]));
          var departmentOptions = [...new Set(temp)];

          inquirer
            .prompt([
            {
                type: 'list',
                message: 'Please select department from the list',
                choices: departmentOptions,
                name: 'departmentSelection'
            }
            ])
            .then((response) => {
                viewDb(`SELECT * FROM roles INNER JOIN departments ON role_dept_id = departments.dept_id AND role_dept_id=${results[departmentOptions.indexOf(response.departmentSelection)]["dept_id"]} INNER JOIN employee ON id=employee.role_id;`);
            })
        }
    );
}

function viewDb(sqlQuery) {
    dispHeader(CLC.CYAN, 'Now viewing info. . .');
    CLC.CYAN();
    db.query(
        sqlQuery,
        function(err, results, fields) {
          console.table(results);
          // Set timeout is necessary for debouncing
          setTimeout(() => pressAnyKey(null)
            .then(() => {
                // ... User presses a key
                mainMenu();
            }), 50);
        }
    );
}


function deleteDepartment() {
    dispHeader(CLC.RED, "*** Danger zone! ***");
    db.query(
        'SELECT * FROM departments;',
        function(err, results, fields) {
          var temp = [];
          results.forEach(dat => temp.push(dat["department_name"]));
          var departmentOptions = [...new Set(temp)];
          departmentOptions.push("Cancel");

          inquirer
            .prompt([
            {
                type: 'list',
                message: '** YOU ARE ABOUT TO DELETE A DEPARTMENT AND ALL OF ITS EMPLOYEES FROM THE DB ** Please select which department you wish to delete.',
                choices: departmentOptions,
                name: 'departmentSelection'
            }
            ])
            .then((response) => {
                if(response.departmentSelection == "Cancel") {
                    mainMenu();
                    return;
                }
                viewDb(`DELETE FROM departments WHERE dept_id=${results[departmentOptions.indexOf(response.departmentSelection)]["dept_id"]}`);
            })
        }
    );
}
