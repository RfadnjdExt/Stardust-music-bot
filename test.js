const fs = require("node:fs/promises");
const childProcess = require("node:child_process");

(async () => {
    const configSampleJS = await fs.readFile("config.sample.js", "utf-8");
    console.log(configSampleJS.replaceAll('\n', '\\n'));
    // const proc = childProcess.spawn("printf", [configSampleJS]);
    // proc.stdout.pipe(process.stdout);
    // proc.stderr.pipe(process.stderr);
})();
