"use client";

import { useEffect, useState } from "react";

import { Pagination } from "@/components/Pagination";
import { useTaskStore } from "@/store";
import { useShallow } from "zustand/shallow";

const TaskPagination = () => {
  const { taskTotal, currentPage, setCurrentPage, TaskLimit, tasks } =
    useTaskStore(
      useShallow((s) => ({
        taskTotal: s.taskTotal,
        tasks: s.tasks,
        currentPage: s.currentPage,
        setCurrentPage: s.setCurrentPage,
        TaskLimit: s.TaskLimit,
      }))
    );

  const [totalPages, setTotalPages] = useState(0);

  const {
    apiController: { fetchTasks },
  } = useTaskStore.getState();

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    await fetchTasks(value);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(taskTotal / TaskLimit));
  }, [taskTotal, TaskLimit]);

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks(Math.max(currentPage - 1, 1));
    }
  }, [tasks]);

  return (
    <Pagination count={totalPages} onChange={handleChange} page={currentPage} />
  );
};

export default TaskPagination;
