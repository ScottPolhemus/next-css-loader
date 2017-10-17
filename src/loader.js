const fs = require('fs');
const trash = require('trash');

module.exports = function(content) {
  const fileName = `${this._module.userRequest}.json`;
  const classNames = fs.readFileSync(fileName, 'utf8');
  trash(fileName);
  
  return [
    `require('next-css-loader/stylesheet').addStyles(\`${this._module.userRequest}\`, \`${content}\`);\n`,
    `module.exports = ${classNames};`,
  ].join(``);
};