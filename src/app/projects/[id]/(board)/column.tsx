"use client";

import { cn } from "@/utils/common";
import { PlusOutlined } from "@ant-design/icons";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "antd";
import { useMemo } from "react";
import Task from "./task";

interface Task {
  id: string;
  content: string;
  columnId: string;
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  className?: string;
  createTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export default function Column({
  id,
  title,
  tasks,
  className,
  createTask,
  deleteTask
}: ColumnProps) {

  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, transform, transition } = useSortable({
    id: id,
    data: { type: "COLUMN", column: { id, title } },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className={cn(
        "w-80 h-full dark:bg-gray-700 flex flex-col border rounded-md",
        className
      )}
    >
      <div className="flex items-center gap-2 dark:bg-gray-800 px-4 py-2">
        <h2 className="dark:text-white font-medium">{title}</h2>
      </div>

      <div className="flex flex-col gap-4 flex-grow p-2 overflow-x-hidden overflow-y-auto h-[75vh]">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <Task
              {...task}
              key={task.id}
              className="shrink-0"
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t border-border/50">
        <Button
          type="text"
          className="w-full"
          icon={<PlusOutlined />}
          onClick={() => createTask(id)}
        >
          Add New Task
        </Button>
      </footer>
    </div>
  );
}
