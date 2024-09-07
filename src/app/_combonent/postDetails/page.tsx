'use client'
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post, Comment } from "@/interfaces";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostsDetails({ postDetails ,iscomments=false }: { postDetails: Post,iscomments?:boolean }) {
  
  let router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ m: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image
              src={postDetails.user.photo}
              alt={postDetails.user.name}
              width={50}
              height={50}
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postDetails.user.name}
        subheader={postDetails.createdAt.slice(0, 10)}
        titleTypographyProps={{
          onClick: () => {
            router.push("/gallary");
          },
          style: { color: "#09c", width: "fit-content", cursor: "pointer" },
        }}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {postDetails.body}
        </Typography>
      </CardContent>
      {/* <CardMedia
        component="img"
        height="194"
        image={postDetails.image}
        alt="Paella dish"
      /> */}

      {postDetails.image && (
        <Image
          src={postDetails.image}
          alt={postDetails.body}
          style={{  objectFit: "fill", maxHeight: "300px" }}
          width={500}
          height={300}
        />
      )}

      <CardActions
        sx={{ display: "flex", justifyContent: "center", gap: "50px" }}
      >
        <IconButton aria-label="add to favorites">
          <ThumbUpAltIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {postDetails.comments.length > 0 && iscomments == false ? (
          <CardContent>
            <Box sx={{ backgroundColor: "#eee", p: 4, borderRadius: "20px" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={postDetails.comments[0].commentCreator.name}
                subheader={postDetails.comments[0].createdAt.slice(0, 10)}
              />
              <Typography sx={{ marginBottom: 2 }}>
                {postDetails.comments[0].content}
              </Typography>
            </Box>
            <Typography align="right" sx={{ pt: 1 }}>
              <Link
                href={`/singlePost/${postDetails._id}`}
                style={{ color: "blue" }}
              >
                view all comments
              </Link>
            </Typography>
          </CardContent>
        ) : (
          postDetails.comments.map((comment: Comment, index) => (
            <CardContent key={index}>
              <Box sx={{ backgroundColor: "#eee", p: 4, borderRadius: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={comment.commentCreator.name}
                  subheader={comment.createdAt.slice(0, 10)}
                />
                <Typography sx={{ marginBottom: 2 }}>
                  {comment.content}
                </Typography>
              </Box>
            </CardContent>
          ))
        )}
      </Collapse>
    </Card>
  );
}
