import readline from "readline";

export async function read(question) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    return new Promise((res) => rl.question(question + " ", (answer) => {
        rl.close(); res(answer);
    }));
};