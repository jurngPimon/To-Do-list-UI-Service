"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Task } from "../Task";
import { useTaskStore } from "@/store/task/taskSlice";

const TaskList = () => {
  const tasks = useTaskStore((s) => s.tasks);

  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Task
              id={task.id}
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;
