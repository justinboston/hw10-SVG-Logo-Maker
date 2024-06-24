const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
    run() {
      return inquirer
        .prompt([
          {
            name: "text",
            type: "input",
            message:
              "Please enter 3 characters as your logo's text",
            validate: (text) =>
              text.length <= 3 ||
              "Text input must not exceed 3 characters",
          },
          {
            name: "textColor",
            type: "input",
            message: "What color would you like this text to be?",
          },
          {
            name: "shapeType",
            type: "list",
            message: "Please select a shape for your logo",
            choices: ["circle", "square", "triangle"],
          },
          {
            name: "shapeColor",
            type: "input",
            message: "What color would you like this shape to be?",
          },
        ])
        .then(({ text, textColor, shapeType, shapeColor }) => {
          let shape;
          switch (shapeType) {
            case "circle":
              shape = new Circle();
              break;
  
            case "square":
              shape = new Square();
              break;
  
            default:
              shape = new Triangle();
              break;
          }
          shape.setColor(shapeColor);
  
          const svg = new SVG();
          svg.setText(text, textColor);
          svg.setShape(shape);
          return writeFile("logo.svg", svg.render());
        })
        .then(() => {
          console.log("Generated logo.svg");
        })
        .catch((error) => {
          console.log(error);
          console.log("Something went wrong.");
        });
    }
  }
  
  module.exports = CLI;