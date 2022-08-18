import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";

//Icon //
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

//moment //
import moment from "moment";

// // Redux
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

//styles
import useStyles from "./styles";

// react router dom //
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  //style
  const classes = useStyles();

  //navigate state //
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();

  // user fetch //
  const user = JSON.parse(localStorage.getItem("profile"));

  // likes state and declare variable manage lkes functionality //
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result_id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  // Likes Sub Component
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  // Handlers
  const openPost = () => navigate(`/posts/${post._id}`);

  const editHandler = () => {
    setCurrentId(post._id);
  };
  return (
    <>
      <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="subtitle2">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              title="Edit Post"
              onClick={editHandler}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )}
        </div>

        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
