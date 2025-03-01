command = '';
for (const i of list) {
    if (i.hasOwnProperty("pdf") && i.pdf != "--") {
        command += ('' + i.pdf).slice(16) + '\n';
    }
}
console.log(command);
