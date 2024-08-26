"use client"
import { Box, Grid } from '@mui/material';
import Sidebar from '../sidebar';
import CourseTable from './CourseTable';

const CourseList = () => {
  return (
    <Grid container direction={"row"}>
      <Grid item xs={4} md={3} lg={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} md={9} lg={10}>
        <CourseTable />
      </Grid>
    </Grid>
  )
}

export default CourseList;