import { Box, Button, FormControl, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material";
import supabase from './../config/supabase';
import { useNavigate } from 'react-router-dom';

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  flexDirection: "column",
});

export const StyledFormControl = styled(FormControl)({
  backgroundColor: "#2d2d2d",
  margin: "20px 10px",
  borderRadius: 5,
  minWidth: 500,
  maxWidth: 900,
});

export const StyledTextfield = styled(TextField)({
  margin: "20px 20px",
});

export const StyledButton = styled(Button)({
    margin:'20px 40%',
    background:'#3cb371'
})

const Create = () => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [cgpa, setCgpa] = useState(2);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !comments || cgpa === 0) {
      setFormError('All Field are required')
      return
    } 
    setFormError(null)
    const {data,error} = await supabase.from('Students').insert({name,comments,cgpa})

    if (error) {
      console.log(error)
      setFormError('All fields are mandatory')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
    console.log({name,comments,cgpa})
  }

  return (
    <StyledBox component="form">
      <StyledFormControl>
        <StyledTextfield
          color="secondary"
          id="name"
          label="Name"
          value={name}
          InputLabelProps={{
            sx: {
              color: "#a0a0a0",
            },
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextfield
          color="secondary"
          id="comments"
          label="Comments"
          value={comments}
          multiline={true}
          rows={3}
          InputLabelProps={{
            sx: {
              color: "#a0a0a0",
            },
          }}
          onChange={(e) => setComments(e.target.value)}
        />
        <Rating
          name="simple-controlled"
          value={cgpa}
          onChange={(e) => {
            setCgpa(parseInt(e.target.value))
          }}
          sx={{color:'#3cb371', margin:'10px 30px'}}
        />
        {formError && <Typography 
          color='error' sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>{formError}</Typography>}
        <StyledButton variant="contained" onClick={handleSubmit}>Submit</StyledButton>
      </StyledFormControl>
    </StyledBox>
  );
};

export default Create;
