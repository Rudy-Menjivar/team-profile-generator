const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

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
            employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber));
        }
        else if (answers.role === "Engineer") {
            employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
        }
        else if (answers.role === "Intern") {
            employees.push(new Intern(answers.name, answers.id, answers.email, answers.school));
        }
        if (answers.addMore === false) {
            // Called Render function to pass employees array to create html file to outputPath
            fs.writeFile(outputPath, render(employees), (err) =>
            err ? console.log(err) : console.log("Successfully created team.html file. It's in the output folder."));
        } else {
            init();
        }
    })
}

init();