"use client"
import { Box, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material"
import { useContext, useEffect } from "react"
import { CourseContext } from "../courses/CourseContext";
import { SELECT_ALL_OPTION } from "../../constants/util";

const Sidebar = () => {
    const { isOffered, setIsOffered, selectedProgram, setSelectedProgram, programOptions, electiveOptions, setSelectedElective, termOptions, setSelectedTerm, selectedElective, selectedTerm } = useContext(CourseContext);
    
    useEffect(() => {
        if(selectedElective == "COMPLEMENTARY") {
            setSelectedProgram('All')
        }
    }, [selectedElective, setSelectedProgram])
    
    return (
      <Box sx={{ height: '100vh', backgroundColor: "#78A083", paddingX: 4 }}>
        <Grid container spacing={2} sx={{ paddingTop: 4 }}>
        <Grid item xs={12}>
                <InputLabel>Offered</InputLabel>
                <Switch defaultChecked value={isOffered} onChange={() => {setIsOffered(!isOffered)}}/>
            </Grid>
            <Grid item xs={12}>
                <InputLabel>Program</InputLabel>
                <Select
                disabled={selectedElective=="COMPLEMENTARY"}
                fullWidth
                value={selectedProgram}
                onChange={(event: SelectChangeEvent) => setSelectedProgram(event.target.value)}
                >
                    <MenuItem value={SELECT_ALL_OPTION.value}>{SELECT_ALL_OPTION.label}</MenuItem>
                    {programOptions.map((option) => {
                        return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <InputLabel>Elective Type</InputLabel>
                <Select
                fullWidth
                value={selectedElective}
                onChange={(event: SelectChangeEvent) => setSelectedElective(event.target.value)}
                >
                    <MenuItem value={SELECT_ALL_OPTION.value}>{SELECT_ALL_OPTION.label}</MenuItem>
                    {electiveOptions.map((option) => {
                        return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <InputLabel>Term</InputLabel>
                <Select
                fullWidth
                value={selectedTerm}
                onChange={(event: SelectChangeEvent) => setSelectedTerm(event.target.value)}
                >
                    {termOptions.map((option) => {
                        return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    })}
                </Select>
            </Grid>
        </Grid>
      </Box>
    );
  }
  
  export default Sidebar;