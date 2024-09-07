"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/authSlice";
import { storeDispaatch, storeState } from "@/lib/store";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { Sync } from "@mui/icons-material";

export default function Login() {
  let { push } = useRouter();

  let { isLoading } = useSelector((state: storeState) => state.authSlice);

  let dispatch = useDispatch<storeDispaatch>();

  let { handleSubmit, values, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(login(values));
      if (localStorage.getItem("postUserToken")) {
        push("/");
      }
    },
  });

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Paper elevation={10}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                bgcolor: "rgb(0, 0,255,.1)",
                // height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 5,
              }}
            >
              <Typography
                component={"h2"}
                variant="h2"
                color="initial"
                sx={{ fontWeight: 800, color: "blue", mt: 4 }}
              >
                Login
              </Typography>

              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="email"
                label="Email"
                variant="standard"
                sx={{ width: "60%", mx: "auto" }}
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                id="password"
                label="Password"
                variant="standard"
                sx={{ width: "60%", mx: "auto", my: "20px" }}
              />
              {isLoading ? (
                <Button
                  type="submit"
                  variant="outlined"
                  endIcon={<CircularProgress />}
                  sx={{ m: 5 }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  endIcon={<LoginIcon />}
                  sx={{ m: 5 }}
                >
                  Login
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
}
