const fs = require("node:fs/promises");
require("dotenv").config();

(async () => {
    const childProcess = require("node:child_process");
    const spawn = (command, args) => {
        childProcess.spawn(command, args, { stdio: "inherit" });
    };
    try {
        await fs.access("./node_modules");
    } catch (e) {
        if (e.errno === -2) {
            spawn("npm", ["i"]);
        }
    } finally {
        spawn("node", ["index.js"]);
    }
})();
