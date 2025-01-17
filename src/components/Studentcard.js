import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import supabase from './../config/supabase';

const StyledCard = styled(Card)({
  minWidth: 150,
  background: "#2d2d2d",
  borderRadius: 5,
  "&:hover": {
    boxShadow: "0px 1px 5px 0px #6dcc93",
    elevation: 20,
  },
});

const StudentCard = ({ student,deleteStudent }) => {

  const handleDelete = async (id) => {

    const {data,error} = await supabase.from('Students').delete().eq('id',id)

    if (error) {
      console.log(error)
    }
    if (data) {
      deleteStudent(id)
    }
    
  }
  
  return (
    <StyledCard raised={true} elevation={1}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div" color="#3cb371">
            {student.Name}
          </Typography>
          <Typography variant="body2">{student.Comments}</Typography>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              name="read-only"
              value={student.Cgpa}
              readOnly
              sx={{ color: "#3cb371" }}
            />
            <Stack direction="row">
              <Link to={`/${student.id}`}>
                <IconButton aria-label="edit" color="secondary">
                  <Edit />
                </IconButton>
              </Link>
              <IconButton aria-label="delete" color="secondary" onClick={() =>handleDelete(student.id)}>
                <Delete />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default StudentCard;
