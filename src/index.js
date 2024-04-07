const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'characters',
        message: 'Enter up to 3 characters.\n',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'What shape would you like?\n',
        choices: ['square', 'triangle', 'circle']
    },
    {
        name: 'shapeColor',
        message: 'What would you like for the shape color?\n',
        type: 'input',
    },
    {
        name: 'textColor',
        message: 'What would you like for the text color?\n',
        type:   'input'
    }

]



let char;
let shape;
let color;
let svg;
let charColor;


const init = () => {
    return inquirer.prompt(questions);
};

init()
.then(answers => {
    char = answers.characters.toUpperCase();
    shape = answers.shape.toLowerCase();
    color = answers.shapeColor;
    charColor = answers.textColor;

    if (shape === 'triangle') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        <polygon points="120,10 20,190 220,190" style="fill:${color};;fill-rule:evenodd;"/>
        <text x="85" y="125" font-family="Times" font-size="35" fill="${charColor}">${char}</text>
    </svg>`;
    } else if (shape === 'square') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        <rect x="50" y="50" width="150" height="150" style="fill:${color};"/>
        <text x="89" y="132" font-family="Times" font-size="35" fill="${charColor}">${char}</text>
    </svg>`
    } else if (shape === 'circle') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        <circle cx="125" cy="125" r="90" style="fill:${color};"/>
        <text x="87" y="133" font-family="Times" font-size="37" fill="${charColor}">${char}</text>
    </svg>`;
    }
})
    .then(() => {
        fs.writeFile('./logo.svg', svg, err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File created successfully.');
            }
        });
    })
