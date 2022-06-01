const fs = require("fs");
const child_process = require("child_process");

var themes = [];

for (var file of fs.readdirSync("./submissions")) {
    try {
        var f = JSON.parse(fs.readFileSync("./submissions/" + file,"utf8"))
        var log = child_process.spawnSync("git",["log","--format=%aD",file],{cwd:"./submissions/" }).stdout.toString().split("\n").filter((a)=>a);
        console.log(log)
        themes.push({
            name: f.name, author: f.author, tags: f.tags, desc: f.desc,
            text: f.vars.text, background: f.vars.background, accent: f.vars.accent,
            file, mtime: new Date(log[0]), ctime: new Date(log.pop())
        })
    } catch(e) {
        console.error("Error reading " + file + e.toString());
    }
}


fs.writeFileSync("themes.json", JSON.stringify(themes));