import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";

const Pagination = ({ count, onChange, page }: PaginationProps) => {
  return (
    <Stack spacing={2} alignItems="center">
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
};
interface PaginationProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
}

export default Pagination;
