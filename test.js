const fs = require("node:fs/promises");
const shellQuote = require("shell-quote");
const childProcess = require("node:child_process");

(async () => {
    const configSampleJS = await fs.readFile("config.sample.js", "utf-8");
    console.log(shellQuote.quote([configSampleJS]).replaceAll('\n', '\\n'));
    // const proc = childProcess.spawn("printf", [configSampleJS]);
    // proc.stdout.pipe(process.stdout);
    // proc.stderr.pipe(process.stderr);
})();
