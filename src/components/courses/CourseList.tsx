"use client";
import Grid from "@mui/material/Grid2";
import Sidebar from "../sidebar";
import CourseTable from "./CourseTable";

const CourseList = () => {
  return (
    <Grid container direction={"row"}>
      <Grid size={{
        xs: 4,
        md: 3,
        lg: 2, 
      }}>
        <Sidebar />
      </Grid>
      <Grid size={{
        xs: 8,
        md: 9,
        lg: 10, 
      }}>
        <CourseTable />
      </Grid>
    </Grid>
  );
};

export default CourseList;