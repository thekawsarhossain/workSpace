import { User } from "./user";

export interface Activitie {
    _id: string;
    taskId: string;
    description: string;
    user: User
    createdAt: string;
}