import { create } from 'zustand';
import { ProjectStoreState } from '@/interface/project';

export const useProjectStore = create<ProjectStoreState>((set) => ({
    projects: [],

    setProjects: (projects) => set({ projects }),
    addProject: (newProject) => set((state) => ({ projects: [...state.projects, newProject] })),

    editProject: (projectId, updatedProject) => set((state) => ({
        projects: state.projects.map((project) =>
            project._id === projectId ? { ...project, ...updatedProject } : project
        ),
    })),

    removeProject: (projectId) => set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
    })),

}));