"use client";

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useModalStore } from "@/store";

interface CommonModalProps {}

const CommonModal: React.FC<CommonModalProps> = () => {
  const { isOpen, modalContent, handleClose } = useModalStore();
  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {modalContent && (
          <>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {/* Extract title from modal content if it's a component */}
            </Typography>
            {modalContent}
          </>
        )}
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CommonModal;
