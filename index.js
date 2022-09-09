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
                    viewDb('SELECT * FROM roles;');
                    break;
                case '\u001b[36mView all employees\u001b[0m':
                    viewDb('SELECT * FROM employees;');
                    break;
                case '\u001b[36mView employees by manager\u001b[0m':
                    viewByManager();
                    break;
                case '\u001b[36mView employees by department\u001b[0m':
                    viewByDepartment();
                    break;
                    
                case "\u001b[31mDelete a department\u001b[0m":
                    deleteData("department");
                    break;

                default:
                    break;
            }
        }
    );
}
mainMenu();

function viewByManager() {
    db.query(
        'SELECT manager_name FROM employees;',
        function(err, results, fields) {
          var temp = [];
          results.forEach(dat => temp.push(dat["manager_name"]));
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
                viewDb(`SELECT * FROM employees WHERE manager_name = "${response.managerSelection}";`);
            })
        }
    );
}

function viewByDepartment() {
    db.query(
        'SELECT department FROM employees;',
        function(err, results, fields) {
          var temp = [];
          results.forEach(dat => temp.push(dat["department"]));
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
                viewDb(`SELECT * FROM employees WHERE department = "${response.departmentSelection}";`);
            })
        }
    );
}

function viewDb(sqlQuery) {
    CLC.CLS();
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


function deleteData(category) {
    dispHeader(CLC.RED, "*** Danger zone! ***");

}