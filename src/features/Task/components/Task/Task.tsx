"use client";
import { useState } from "react";
import { useTaskStore } from "@/store/task";
import { TaskStatusType } from "@/types/task.types";

// Import the necessary components from Material-UI or your UI library
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { useModalStore } from "@/store";
import { TaskEditForm } from "../TaskEditForm";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatusType;
}

const Tasks = ({ id, title, description, status }: ITask) => {
  const { deleteTaskApi } = useTaskStore.getState().apiController;
  const { handleOpen } = useModalStore();

  return (
    <div>
      <Card sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton
            onClick={() => handleOpen(<TaskEditForm id={id} />)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteTaskApi(id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          {description ? (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontStyle: "italic" }}
            >
              No description provided.
            </Typography>
          )}
          <Typography color="textSecondary">Status: {status}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
