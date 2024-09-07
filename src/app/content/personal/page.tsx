'use client'


import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { storeDispaatch, storeState } from "@/lib/store";
import { addPost } from "@/lib/postsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});



export default function Personal() {

let dispatch = useDispatch<storeDispaatch>();
let { isLoading } = useSelector((state: storeState) => state.postsreducer);

function handleSubmit(e:any){
e.preventDefault();
  let body = e.target.body.value;
  let image = e.target.image.files[0];
  
// console.log(e.target.body.value);
//   console.log(e.target.image.files[0]);
  let formData = new FormData();
  formData.append('body', body);
  
  // console.log(formData);

  if (image) {
    formData.append("image", image);
  }


  dispatch(addPost(formData));

  e.target.body.value = '';

}


  return (
    <>
      <Paper elevation={15} sx={{ m: 5, p: 3}}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          <h2>Add Post</h2>

          <TextField
            id="body"
            label="Post Data"
            multiline
            rows={4}
            defaultValue=""
          />

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              id="image"
            />
          </Button>

          {isLoading ? (
            <Button
              type="submit"
              variant="outlined"
              endIcon={<CircularProgress />}
              sx={{ m: 5 }}
            >
              Add Post
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              endIcon={<LoginIcon />}
              sx={{ m: 5 }}
            >
              Add Post
            </Button>
          )}
        </form>
      </Paper>
    </>
  );
}
