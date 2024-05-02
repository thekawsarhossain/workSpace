"use client";

import Link from "next/link";
import type { MenuProps } from "antd";
import { useProjectStore } from "@/store/projects";
import { Button, Dropdown, Popconfirm, Typography, notification } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { cn } from "@/utils/common";
import { Project } from "@/interface/project";
import ProjectModal from "./project-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, updateProject } from "@/utils/api";
import { useState } from "react";

interface Props {
    project: Project,
    className?: string
}

export default function ProjectCard({ project, className }: Props) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const { editProject, removeProject } = useProjectStore();

    const editProjectMutation = useMutation(
        {
            mutationKey: ["projects"],
            mutationFn: updateProject,
            onSuccess: (updatedProject) => {
                editProject(project._id, updatedProject);
                queryClient.invalidateQueries({ queryKey: ['projects'] })
            },
            onError: () => {
                notification.error({
                    message: "Failed to update project",
                    description: "Failed to update the new project! Please try again",
                });
            },
            onSettled: () => setLoading(false)
        }
    );

    const deleteProjectMutation = useMutation(
        {
            mutationKey: ["projects"],
            mutationFn: deleteProject,
            onSuccess: () => {
                removeProject(project._id);
                queryClient.invalidateQueries({ queryKey: ['projects'] })
            },
            onError: () => {
                notification.error({
                    message: "Failed to delete project",
                    description: "Failed to delete the new project! Please try again",
                });
            },
            onSettled: () => setLoading(false)
        }
    );

    const handleEdit = (values: { name: string, description: string }) => {
        setLoading(true);
        editProjectMutation.mutate({ projectId: project._id, projectData: values });
    };

    const handleDelete = () => {
        console.log(project._id)
        setLoading(true);
        deleteProjectMutation.mutate(project._id);
    }


    const items: MenuProps["items"] = [
        {
            key: "0",
            icon: <EditOutlined />,
            label: (
                <ProjectModal
                    isEditing
                    loading={loading}
                    initialValue={{ name: project.name, description: project.description }}
                    onFinish={handleEdit}
                >
                    Edit
                </ProjectModal>
            ),
        },
        {
            key: "1",
            danger: true,
            icon: <DeleteOutlined />,
            label: (
                <Popconfirm
                    okText="Yes"
                    cancelText="No"
                    title="Delete the project"
                    description="Are you sure you wanna delete this project?"
                    onConfirm={handleDelete}
                >
                    Delete
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className={cn("group relative bg-white dark:bg-gray-600 border shadow-sm rounded cursor-pointer px-4 py-2", className)}>
            <div className="flex items-center justify-between mr-2">
                <Link href={`/projects/${project._id}`} className="block w-full h-full">
                    <h2 className="text-secondary-foreground text-xl font-medium truncate">{project.name}</h2>
                    <h4 className="text-sm leading-5 font-normal text-secondary-foreground truncate">{project.description}</h4>
                </Link>

                <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <Button type="text" size="small" shape="circle" icon={<MoreOutlined style={{ color: "white" }} />} />
                </Dropdown>
            </div>
        </div>
    );
}