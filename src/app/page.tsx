'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { getPosts } from "@/lib/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeDispaatch, storeState } from "@/lib/store";
import { useEffect } from "react";
import Loading from "./loading";
import PostsDetails from "./_combonent/postDetails/page";
import { Post } from "@/interfaces";


export default function Home() {
let dispatch = useDispatch<storeDispaatch>();
let {isLoading,posts} = useSelector((state: storeState) => state.postsreducer);

useEffect(() => {
 dispatch(getPosts());

 
}, []);



  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
          posts?.map((post: Post) => <PostsDetails key={post._id} postDetails={ post} />)
      )}
    </>
  );
}
