const CLControl = require('./lib/CLControl.js')
const inquirer = require('inquirer');
const fs = require('fs');

const CLC = new CLControl;

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
    
}

function deleteData(category) {
    dispHeader(CLC.RED, "*** Danger zone! ***");

}