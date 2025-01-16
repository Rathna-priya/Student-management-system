import {  Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledBox, StyledButton, StyledFormControl, StyledTextfield } from './Create';
import supabase from './../config/supabase';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Update = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [cgpa, setCgpa] = useState(2);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
        const {data,error} = await supabase.from('Students').select().eq('id',id).single()

        if (error) {
          console.log(error)
          setFormError('Something went wrong')
        }
        if (data) {
          setName(data.name)
          setComments(data.comments)
          setCgpa(data.cgpa)
        }
    }

    fetchStudent()

  },[id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !comments || cgpa === 0) {
      setFormError('All Field are required')
      return
    } 
    setFormError(null)

    const {data,error} = await supabase.from('Students').update({name,comments,cgpa}).eq('id',id)

    if (error) {
      console.log(error)
      setFormError('Something went wrong')
    }
    if (data) {
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
        <StyledButton variant="contained" onClick={handleSubmit}>Update</StyledButton>
      </StyledFormControl>
    </StyledBox>
  );
}

export default Update