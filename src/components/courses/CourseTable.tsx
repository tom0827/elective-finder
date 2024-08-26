"use client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton, Modal, Box, Typography } from '@mui/material';
import { Course } from '../../models/course';
import { useContext, useMemo, useState } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { KUALI_DETAILS_BASE_URL } from '../../constants/links';
import { Else, If, Then } from 'react-if';
import { CourseContext } from './CourseContext';
import { titleCase } from '../../utils/string';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const CourseTable = () => {
    const { filteredCourses } = useContext(CourseContext);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [preCoReqHtml, setPreCoRegHtml] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handlePageChange = (event: unknown, newPage: number) => {
      setPage(newPage);
    }
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }

    const paginatedCourses = useMemo(
      () =>
        filteredCourses?.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [filteredCourses, page, rowsPerPage],
    );

    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ fontWeight: 'bold', width: 50 }}>Offered</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: 50 }}>Elective Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: 50 }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: 500 }}>Description</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', width: 150 }}>See pre and co requisites</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', width: 150 }}>View on UVic page</TableCell>
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
                  <TableCell sx={{ width: 50 }}>{titleCase(course.elective_type)}</TableCell>
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
                        No pre/co requisites
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
          rowsPerPageOptions={[5, 10]} 
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
            setPreCoRegHtml('');
          }}
        >
          <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpenModal(false);
              setPreCoRegHtml('');
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
            <div dangerouslySetInnerHTML={{ __html: preCoReqHtml }} />
          </Box>
        </Modal>
      </>
    )
}

export default CourseTable;