"use client";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton, Modal, Box, Chip, useTheme, GlobalStyles, TextField, Stack } from "@mui/material";
import { Course } from "../../models/course";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { KUALI_DETAILS_BASE_URL } from "../../constants/links";
import { Else, If, Then } from "react-if";
import { CourseContext } from "./CourseContext";
import { titleCase } from "../../utils/string";
import { electiveTypeColors } from "@/constants/colors";

const CourseTable = () => {
  const { filteredCourses, isOffered, selectedProgram, selectedElective, selectedTerm, setSearchText } = useContext(CourseContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [preCoReqHtml, setPreCoRegHtml] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const theme = useTheme();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [searching, setSearching] = useState<boolean>(false);

  const handlePageChange = (event: unknown, newPage: number) => {
    tableContainerRef?.current?.scrollTo(0, 0);
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCourses = useMemo(
    () =>
      filteredCourses?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [filteredCourses, page, rowsPerPage],
  );

  useEffect(() => {
    tableContainerRef?.current?.scrollTo(0, 0);
    setPage(0);
  }, [isOffered, selectedProgram, selectedElective, selectedTerm]);

  return (
    <>
      <TableContainer ref={tableContainerRef} component={Paper} sx={{
        maxHeight: "calc(100vh - 52px)",
        overflowY: "auto",
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{
                fontWeight: "bold",
                width: 50, 
              }}>Offered</TableCell>
              <TableCell sx={{
                fontWeight: "bold",
                width: 50, 
              }}>Elective Type</TableCell>
              <TableCell sx={{
                fontWeight: "bold",
                width: 150, 
              }}>
                <Stack direction={"row"} alignItems={"center"}>
                  <If condition={searching}>
                    <Then>
                      <TextField
                        autoFocus
                        variant="outlined" 
                        label="Course Code"
                        slotProps={{
                          inputLabel: {
                            sx: {
                              fontWeight: "bold",
                              color: "theme.palette.text.primary",
                            },
                          },
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setSearchText(event?.target.value);
                        }}
                      />
                      <IconButton aria-label="search-off" onClick={() => {
                        setSearching(false);
                        setSearchText("");
                      }}>
                        <SearchOffIcon />
                      </IconButton>
                    </Then>
                    <Else>
                    Course Code
                      <IconButton aria-label="search-on" onClick={() => setSearching(true)}>
                        <SearchIcon />
                      </IconButton>
                    </Else>
                  </If>
                  
                </Stack>
                
              </TableCell>
              <TableCell sx={{
                fontWeight: "bold",
                width: 500, 
              }}>Description</TableCell>
              <TableCell align='center' sx={{
                fontWeight: "bold",
                width: 150, 
              }}>View Prerequisites</TableCell>
              <TableCell align='center' sx={{
                fontWeight: "bold",
                width: 150, 
              }}>View on UVic page</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses?.map((course: Course) => (
              <TableRow key={course.id}>
                <TableCell align='center' sx={{ width: 50 }}>
                  <If condition={course.is_offered}>
                    <Then>
                      <CheckIcon fontSize='small' color='success'/>
                    </Then>
                    <Else>
                      <ClearIcon fontSize='small' color='error'/>
                    </Else>
                  </If>
                </TableCell>
                <TableCell sx={{ width: 50 }}>
                  <Chip label={titleCase(course.elective_type)} sx={{
                    bgcolor: electiveTypeColors[course.elective_type],
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }} />
                </TableCell>
                <TableCell sx={{ width: 50 }}>{`${course.course_type} ${course.course_number}`}</TableCell>
                <TableCell sx={{ width: 500 }} dangerouslySetInnerHTML={{ __html: course.description }} />
                <TableCell align='center'>
                  <If condition={course?.pre_and_corequisites}>
                    <Then>
                      <IconButton size="large" 
                        onClick={() => {
                          setOpenModal(true);
                          setPreCoRegHtml(course.pre_and_corequisites);
                        }}> 
                        <VisibilityIcon fontSize='inherit'/>
                      </IconButton>
                    </Then>
                    <Else>
                        No Prerequisites
                    </Else>
                  </If>
                </TableCell>
                <TableCell align='center'>
                  <If condition={course?.pid}>
                    <Then>
                      <IconButton size="large" href={KUALI_DETAILS_BASE_URL+course.pid} target='_'>
                        <OpenInNewIcon fontSize='inherit'/>
                      </IconButton>
                    </Then>
                    <Else>
                        No link found
                    </Else>
                  </If>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ 
          backgroundColor: "background.default",
        }}
        rowsPerPageOptions={[5, 10, 25]} 
        component={"div"} 
        count={filteredCourses?.length || 0} 
        rowsPerPage={rowsPerPage} 
        page={page} 
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setPreCoRegHtml("");
        }}
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          color: theme.palette.text.primary,
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpenModal(false);
              setPreCoRegHtml("");
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <GlobalStyles styles={{
            ".preCoReqContainer a": {
              color: "lightblue",
              textDecoration: "underline",
            },
            ".preCoReqContainer a:hover": {
              color: "blue",
            },
          }} />
          <div className="preCoReqContainer" dangerouslySetInnerHTML={{ __html: preCoReqHtml }} />
        </Box>
      </Modal>
    </>
  );
};

export default CourseTable;