"use client";
import Grid from "@mui/material/Grid2";
import { InputLabel, MenuItem, Select, SelectChangeEvent, Switch, useColorScheme } from "@mui/material";
import { useContext } from "react";
import { CourseContext } from "../courses/CourseContext";
import { SELECT_ALL_OPTION } from "../../constants/util";
import { LightDarkSwitch } from "../shared/StyledSwitch";

const Sidebar = () => {
  const { 
    isOffered,
    setIsOffered,
    selectedProgram,
    setSelectedProgram,
    programOptions,
    electiveOptions,
    setSelectedElective,
    termOptions,
    setSelectedTerm,
    selectedElective,
    selectedTerm,
  } = useContext(CourseContext);
  const { mode, setMode } = useColorScheme();
    
  return (
    <Grid container direction={"column"} spacing={2} sx={{
      paddingTop: 4,
      height: "100vh",
      paddingX: 4,
      backgroundColor: "background.default", 
    }}>
      <Grid size={{ xs: 12 }}>
        <InputLabel>Offered</InputLabel>
        <Switch defaultChecked value={isOffered} onChange={() => setIsOffered(!isOffered)}/>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel>Program</InputLabel>
        <Select
          fullWidth
          value={selectedProgram}
          onChange={(event: SelectChangeEvent) => setSelectedProgram(event.target.value)}
        >
          {programOptions.map((option) => {
            return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel>Elective Type</InputLabel>
        <Select
          fullWidth
          value={selectedElective}
          onChange={(event: SelectChangeEvent) => setSelectedElective(event.target.value)}
        >
          <MenuItem value={SELECT_ALL_OPTION.value}>{SELECT_ALL_OPTION.label}</MenuItem>
          {electiveOptions.map((option) => {
            return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel>Term</InputLabel>
        <Select
          fullWidth
          value={selectedTerm}
          onChange={(event: SelectChangeEvent) => setSelectedTerm(event.target.value)}
        >
          {termOptions.map((option) => {
            return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{
        flexGrow: 1,
      }} />
      <Grid size={{ xs: 12 }} sx={{ paddingBottom: 4 }}>
        <LightDarkSwitch 
          value={mode} 
          onChange={() => {
            const isLight = mode == "light";
            setMode(isLight ? "dark" : "light");
          }} 
          checked={mode === "dark"}
        />
      </Grid> 
    </Grid>
  );
};
  
export default Sidebar;