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
                    viewDepartments('*');
                    break;
                case '\u001b[36mView all roles\u001b[0m':
                    viewRoles('*');
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

function viewDepartments(selection) {
    CLC.CLS()
    db.query(
        `SELECT ${selection} FROM departments`,
        function(err, results, fields) {
          console.table(results);
          // Set timeout is necessary for debouncing
          setTimeout(() => pressAnyKey(null)
            .then(() => {
                // ... User presses a key
                mainMenu();
            }), 50);
          //mainMenu();
          //console.log(results); // results contains rows returned by server
          //console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}
function viewRoles(selection) {
    CLC.CLS()
    db.query(
        `SELECT ${selection} FROM roles`,
        function(err, results, fields) {
          console.table(results);
          // Set timeout is necessary for debouncing
          setTimeout(() => pressAnyKey(null)
            .then(() => {
                // ... User presses a key
                mainMenu();
            }), 50);
          //mainMenu();
          //console.log(results); // results contains rows returned by server
          //console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}

function deleteData(category) {
    dispHeader(CLC.RED, "*** Danger zone! ***");

}