"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import Column from "./column";
import Task from "./task";
import { columns } from "@/constants/board";

type Task = {
  id: string;
  content: string;
  columnId: string;
};


export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnIds = useMemo(() => columns.map((col) => col.id), []);

  const handleCreateTask = (id: string) => {
    const newTask = { id: uuidv4(), columnId: id, content: "New Task" };
    setTasks((tasks) => [...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => id !== task.id);
    setTasks(filteredTasks);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { data } = active;

    if (data.current?.type === "TASK") {
      setActiveTask(data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const overColumnId = over.id;
    const activeColumnId = active.id;

    if (overColumnId === activeColumnId) return;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const overId = over.id;
    const activeId = active.id;

    if (overId === activeId) return;

    const isOverTask = over.data.current?.type === "TASK";
    const isActiveTask = active.data.current?.type === "TASK";

    if (!isActiveTask) return;

    // DROPING TASK OVER ANOTHER TASK
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const overTaskIndex = tasks.findIndex((task) => overId === task.id);
        const activeTaskIndex = tasks.findIndex((task) => activeId === task.id);

        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "COLUMN";

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => activeId === task.id);

        tasks[activeTaskIndex].columnId = overId as string;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="w-full h-full flex gap-4">
          <SortableContext items={columnIds}>
            {columns.map(({ id, title }) => (
              <Column
                id={id}
                key={id}
                title={title}
                className="shrink-0"
                createTask={handleCreateTask}
                deleteTask={handleDeleteTask}
                tasks={tasks.filter((task) => task.columnId === id)}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && (
              <Task
                {...activeTask}
                key={activeTask.id}
                deleteTask={handleDeleteTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
