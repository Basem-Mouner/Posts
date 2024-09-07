"use client";
import PostsDetails from "@/app/_combonent/postDetails/page";
import Loading from "@/app/loading";
import { getPost } from "@/lib/postsSlice";
import { storeDispaatch, storeState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SinglePost({ params: { id } }: { params: { id: string } }) {
    
    let dispatch = useDispatch<storeDispaatch>();
    let {isLoading,post} = useSelector((state:storeState)=>state.postsreducer);

//   console.log(id);

    
    
    useEffect(() => {
      
    dispatch(getPost(id));

     
    }, []);
    
    return <>{isLoading ? <Loading /> :post&& <PostsDetails postDetails={post} iscomments={true} />}</>;
}
