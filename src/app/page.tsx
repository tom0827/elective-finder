"use client";
import useDeviceType from "@/hooks/deviceType";
import { CourseProvider } from "../components/courses/CourseContext";
import CourseList from "../components/courses/CourseList";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles";
import { useEffect } from "react";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

{/* <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
            minHeight: "56px",
          }}
        >
          <Select
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "system" | "light" | "dark")
            }
          >
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </Box> */}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function Courses() {
  const isMobile = useDeviceType();

  if (isMobile) {
    return (
      <>
        <Box sx={{
          height: "100vh",
          backgroundColor: "#78A083", 
        }}/>
        <Modal open={isMobile}>
          <Box sx={style}>
         ElectiveFinder mobile support is coming soon!
          </Box>
        </Modal></>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        <CourseProvider>
          <CourseList />
        </CourseProvider>
      </ThemeProvider>
    </>
  );
}
