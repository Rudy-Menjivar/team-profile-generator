const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

const questions = [
    {
        type: "input",
        name: "name",
        message: "What's the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What's their ID number?"
    },
    {
        type: "input",
        name: "email",
        message: "What's their email address?"
    },
    {
        type: "list",
        name: "role",
        message: "Please select their role.",
        choices: ["Manager", "Engineer", "Intern"],
        default: "Manager"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What's the Manager's office number?",
        when: (answers) => answers.role === "Manager"
    },
    {
        type: "input",
        name: "github",
        message: "What's the Engineer's GitHub username?",
        when: (answers) => answers.role === "Engineer"
    },
    {
        type: "input",
        name: "school",
        message: "What school did the Intern attend?",
        when: (answers) => answers.role === "Intern"
    },
    {
        type: "confirm",
        name: "addMore",
        message: "Add another employee?"
    }
];

function init() {
    inquirer.prompt(questions)

    .then(answers => {
        if (answers.role === "Manager") {
            employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            team.push(employee)
        }
        else if (answers.role === "Engineer") {
            team.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
        }
        else if (answers.role === "Intern") {
            team.push(new Intern(answers.name, answers.id, answers.email, answers.school));
        }
        if (answers.addMore === false) {
            console.log(team)
        } else {
            init();
        }
    })
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```