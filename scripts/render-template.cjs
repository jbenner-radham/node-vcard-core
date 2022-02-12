const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

module.exports = function renderTemplate(filename, context) {
    const filepath = path.resolve(__dirname, '..', '.template', filename);
    const src = fs.readFileSync(filepath).toString();
    const render = Handlebars.compile(src);

    return render(context);
};
