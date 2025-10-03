import { codingAgent } from "./agents/codingAgent";

export type Step = {
    stepNumber: number;
    description: string;
    result?: string;
};

function generatePlan(task: string): Step[] {
    const plan: Step[] = [];

    if (task.toLowerCase().includes("app")) {
        plan.push({ stepNumber: 1, description: "Design project structure" });
        plan.push({ stepNumber: 2, description: "Setup backend API" });
        plan.push({ stepNumber: 3, description: "Create frontend UI" });
        plan.push({ stepNumber: 4, description: "Connect backend & frontend" });
        plan.push({ stepNumber: 5, description: "Test application" });
    } else if (task.toLowerCase().includes("api")) {
        plan.push({ stepNumber: 1, description: "Design API endpoints" });
        plan.push({ stepNumber: 2, description: "Implement backend logic" });
        plan.push({ stepNumber: 3, description: "Test API" });
    } else {
        plan.push({ stepNumber: 1, description: "Analyze task" });
        plan.push({ stepNumber: 2, description: "Break task into subtasks" });
        plan.push({ stepNumber: 3, description: "Execute subtasks" });
    }

    return plan;
}

export async function traycerPlanner(task: string): Promise<Step[]> {
    const plan = generatePlan(task);

    for (let step of plan) {
        step.result = await codingAgent(step.description);
    }

    return plan;
}
