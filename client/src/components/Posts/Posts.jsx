import React from "react";

//material ui
import { Grid, CircularProgress } from "@material-ui/core";

//redux
import { useSelector } from "react-redux";

//components
import Post from "./Post/Post";

//styles
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts";

  // return //
  return isLoading ? (
    <div className="text-center">
      <CircularProgress size="7em" thickness={4} style={{ color: "#D3D3D3" }} />
    </div>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      spacing={3}
      alignitems="stretch"
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={6} xl={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
