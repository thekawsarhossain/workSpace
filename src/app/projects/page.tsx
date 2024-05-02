"use client";

import Header from "@/components/header";
import ProjectCard from "@/components/project-card";
import { useProjectStore } from "@/store/projects";
import { Fragment, useEffect, useState } from "react";
import { Flex, Button, notification } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, getProjects } from "@/utils/api";
import { Project } from "@/interface/project";
import Loading from "@/components/loading";
import { PlusOutlined } from "@ant-design/icons";
import ProjectModal from "@/components/project-modal";

export default function Projects() {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const { projects, setProjects, addProject } = useProjectStore();
    const { data: fetchedProjects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    useEffect(() => {
        if (fetchedProjects) setProjects(fetchedProjects);
    }, [fetchedProjects, setProjects]);

    const createProjectMutation = useMutation(
        {
            mutationKey: ["projects"],
            mutationFn: createProject,
            onSuccess: (newProject) => {
                addProject(newProject);
                queryClient.invalidateQueries({ queryKey: ['projects'] })
            },
            onError: () => {
                notification.error({
                    message: "Failed to create new project",
                    description: "Failed to create the new project! Please try again",
                });
            },
            onSettled: () => setLoading(false)
        }
    );

    const handleCreateProject = async (values: { name: string; description: string }) => {
        setLoading(true)
        createProjectMutation.mutate({ ...values, tasks: [] })
    };

    return (
        <Fragment>
            <Header />
            <div className="container max-w-screen-2xl">
                <Flex align="center" justify="space-between">
                    <h2 className='text-2xl font-medium my-8'>Projects</h2>

                    <ProjectModal onFinish={handleCreateProject} loading={loading}>
                        <Button
                            size="large"
                            icon={<PlusOutlined />}
                            className="w-full sm:w-auto mt-4 sm:mt-0"
                            loading={loading}
                        >
                        </Button>
                    </ProjectModal>

                </Flex>
                {isLoading ?
                    <Loading /> :
                    <div className="grid grid-cols-4 gap-4" >
                        {projects.map((project: Project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>}
            </div>
        </Fragment>
    )
}
