export async function codingAgent(task: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Completed: ${task}`);
        }, 1000);
    });
}
