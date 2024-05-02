import { Task } from "./task";

export interface Project {
    _id: string;
    name: string;
    description: string;
    tasks: Task[];
}

export interface ProjectStoreState {
    projects: Project[];

    setProjects: (projects: Project[]) => void;
    addProject: (newProject: Project) => void;
    editProject: (projectId: string, updatedProject: Partial<Project>) => void;
    removeProject: (projectId: string) => void;
}