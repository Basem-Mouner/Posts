import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Post} from './../interfaces'
import axios from "axios";
import toast from "react-hot-toast";

let initialState:{posts:Post[],isLoading:Boolean,post:Post|null} = {
    posts: [],
  isLoading: false,
  post: null,
  
}

export let getPost = createAsyncThunk("posts/getPost", async (id:string) => {
  return await axios
    .get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("postUserToken"),
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((res) => {
      console.log(res);
      return res;
    });
});

export let getPosts = createAsyncThunk("posts/getPosts",async()=>{
    return await axios
      .get("https://linked-posts.routemisr.com/posts?limit=50&page=18", {
        headers: {
          token: localStorage.getItem("postUserToken"),
        },
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((res) => {
        console.log(res);
        return res;
      });
});


export let addPost = createAsyncThunk("posts/addPost", async (formData:FormData) => {
  return await axios
    .post(`https://linked-posts.routemisr.com/posts/`,formData, {
      headers: {
        token: localStorage.getItem("postUserToken"),
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((res) => {
      console.log(res);
      return res;
    });
});



let posts = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log(action.payload.posts);
            state.posts = action.payload.posts;    
        });

        builder.addCase(getPost.pending, (state, action) => {
          state.isLoading = true;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
          state.isLoading = false;
          // console.log(action.payload.posts);
          state.post = action.payload.post;
        });
      builder.addCase(addPost.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        
        toast.success(action.payload, {
          duration: 4000,
          position: "bottom-center",
        });
      });


    }
});

export default posts.reducer;

