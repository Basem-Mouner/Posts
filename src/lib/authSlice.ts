import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export let login = createAsyncThunk(
  "auth/login",
  async (values: { email: string; password: string }) => {
    return axios
      .post("https://linked-posts.routemisr.com/users/signin", values)
      .then((response) => {
        console.log(response);
        return response.data
      })
      .catch(({ response }) => {
        console.log(response.data.error);
        toast.error(response.data.error, {
          duration: 4000,
          position: "bottom-center",
          
        });
        //  return response.data;
      });

    // try
    // {
    //   let { data }: any = axios.post(
    //     "https://linked-posts.routemisr.com/users/signin",
    //     values
    //   );
    //   console.log(data);
    //   return data;
    // }
    // catch (err: any) {
    //   console.log('hhhh');

    //   console.log(err.response.data.error);
    // }
  }
);

let authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("postUserToken"),
    isLoading: false,
  },
  reducers: {
    clearToken: (state) => {
      state.token = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      if (action.payload.message == "success") {
        state.token = action.payload.token;
        localStorage.setItem("postUserToken", action.payload.token);
      }
    });
  },
});

export default authSlice.reducer;
export let { clearToken } = authSlice.actions;
