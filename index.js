const CLControl = require('./lib/CLControl.js')
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const pressAnyKey = require('press-any-key');
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

// This function displays "Super Tracker 9000" in ASCII art at the top of the terminal window. colorFunc is a callback function to set the color of the terminal and is designed to accept a CLControl function, but any function that sets the color of the terminal will work. The "quip" argument is a short phrase that can appear at the bottom right of this ASCII art.
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
                '\u001b[32mAdd a department\u001b[0m',
                '\u001b[32mAdd a role\u001b[0m',
                '\u001b[32mAdd an employee\u001b[0m',
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

                case '\u001b[32mAdd a department\u001b[0m':
                    addDepartment();
                    break;
                case '\u001b[32mAdd a role\u001b[0m':
                    addRole();
                    break;
                    
                case "\u001b[31mDelete a department\u001b[0m":
                    deleteData("departments", "department_name", "dept_id", "DELETE A DEPARTMENT");
                    break;
                case "\u001b[31mDelete a role\u001b[0m":
                    deleteData("roles", "title", "id", "DELETE A ROLE")
                    break;
                case "\u001b[31mDelete an employee\u001b[0m":
                    deleteData("employee","employeename", "employee_id", "DELETE AN EMPLOYEE");
                    break;

                default:
                    break;
            }
        }
    );
} mainMenu();

// viewByManager: This function will ask the user to select a manager from a list, then display information regarding the employees working under the selected manager in a formatted table.
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

// viewByDepartment: This function will ask the user to select a department from a list, then return details about that department in a formatted table.
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

// viewDb: General purpose function that queries the MySQL server with "sqlQuery" and returns the result in a formatted table.
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

function addDepartment() {
    inquirer
        .prompt([
            {
                message: "Please the name of the department you wish to add",
                name: "inputtedName"
            }
        ])
        .then((response) => {
            viewDb(`INSERT INTO departments (department_name) VALUES  ("${response.inputtedName}")`);
        })
}
function addRole() {
    db.query(
        `SELECT * FROM departments;`,
        function(err, results, fields) {
          var temp = [];
          results.forEach(dat => temp.push(dat['department_name']));
          // Options now contains a list of departments the role can belong to.
          var options = [...new Set(temp)];
          options.push("Cancel");

        inquirer
            .prompt([
                {
                    message: "Please the name of the role you wish to add",
                    name: "inputtedName"
                },
                {
                    message: "Please input the desired salary of this role",
                    name: "inputtedSalary"
                },
                {
                    type: "list",
                    message: "Please select which department this role will belong to",
                    name: "selectedDepartment",
                    choices: options
                }
            ])
            .then((response) => {
                viewDb(`INSERT INTO roles (title, salary, role_dept_id) VALUES  ("${response.inputtedName}", ${response.inputtedSalary}, ${results[options.indexOf(response.selectedDepartment)]["dept_id"]})`);
            })
        }
    );
}

// deleteData: General purpose function to delete a row of data
//      selection: Table name, i.e. "employee" or "roles"
//      selectionTitle: How the title of the selection is stored, i.e. "employee_name" or "dept_name"
//      idName: How the id of the selection is stored, i.e. "employee_id"
//      msg: The message to display after "YOU ARE ABOUT TO ", example could be "DELETE AN EMPLOYEE"
function deleteData(selection, selectionTitle, idName, msg) {
    dispHeader(CLC.RED, "*** Danger zone! ***");
    db.query(
        `SELECT * FROM ${selection};`,
        function(err, results, fields) {
          var temp = [];
          if(selectionTitle == "employeename") {
            results.forEach(dat => temp.push(`${dat["first_name"]} ${dat["last_name"]}`))
          } else {
            results.forEach(dat => temp.push(dat[`${selectionTitle}`]));
          }
          // Options now contains the name of possible selections to delete, such as a list of employee names or department names
          var options = [...new Set(temp)];
          options.push("Cancel");

          inquirer
            .prompt([
            {
                type: 'list',
                message: `** YOU ARE ABOUT TO ${msg} Please choose carefully! **`,
                choices: options,
                name: 'selection'
            }
            ])
            .then((response) => {
                if(response.selection == "Cancel") {
                    mainMenu();
                    return;
                }
                viewDb(`DELETE FROM ${selection} WHERE ${idName}=${results[options.indexOf(response.selection)][`${idName}`]}`);
            })
        }
    );
}