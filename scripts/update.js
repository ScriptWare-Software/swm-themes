const fs = require("fs");

var themes = [];

for (var file of fs.readdirSync("./submissions")) {
    try {
        var f = JSON.parse(fs.readFileSync("./submissions/" + file,"utf8"))
        themes.push({
            name: f.name, author: f.author, tags: f.tags, desc: f.desc,
            text: f.vars.text, background: f.vars.background, accent: f.vars.accent,
            file
        })
    } catch(e) {
        console.error("Error reading " + file + e.toString());
    }
}


fs.writeFileSync("themes.json", JSON.stringify(themes));