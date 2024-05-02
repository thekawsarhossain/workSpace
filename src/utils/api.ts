import { Project } from '@/interface/project';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-management-green.vercel.app';


export const getProjects = async () => {
    const response = await axios.get("/api/projects");
    return response.data;
};

export const getProject = async (projectId: string) => {
    const response = await axios.get(`/api/projects/${projectId}`);
    return response.data;
};

export const createProject = async (projectData: Partial<Project>) => {
    const response = await axios.post("/api/projects", projectData);
    return response.data;
};

export const updateProject = async ({ projectId, projectData }: { projectId: string, projectData: Partial<Project> }) => {
    const response = await axios.put(`/api/projects/${projectId}`, projectData);
    return response.data;
};

export const deleteProject = async (projectId: string) => {
    const response = await axios.delete(`/api/projects/${projectId}`);
    return response.data;
};

// ... Add more functions for tasks if needed