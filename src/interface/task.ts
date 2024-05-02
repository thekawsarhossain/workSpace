import { Activitie } from "./Activitie";

export interface Task {
    _id: string;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    assignee: string;
    projectId: string
    activities: Activitie[]
}