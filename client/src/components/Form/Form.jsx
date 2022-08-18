import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

// material ui icons //
import BackspaceIcon from "@mui/icons-material/Backspace";

// react router dom //
import { useNavigate } from "react-router-dom";

//import image //
import postLogo from "../../images/formLogo.png";
import PostAddIcon from "@mui/icons-material/PostAdd";

//get the current id
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // style //
  const classes = useStyles();

  //navigate react router dom //
  const navigate = useNavigate();

  // redux //
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((postToFind) => postToFind._id === currentId)
      : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const user = JSON.parse(localStorage.getItem("profile"));

  // Handlers clear field //
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      //   if we are updating
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      //  If we are creating
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center"></Typography>
        Please Sign in to create your own entry and like and comment to other entry's.
      </Paper>
    );
  }

  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root}${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} FEEL FREE TO WROTE
            <img
              src={postLogo}
              alt="Form Logo"
              style={{ width: "80px", height: "60px" }}
            />
          </Typography>

          <TextField
            className={classes.textField}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />

          <TextField
            className={classes.textField}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <TextField
            className={classes.textField}
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />

          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            size="small"
            type="submit"
            fullWidth
            // disabled={!}
          >
            Post &nbsp;
            <PostAddIcon />
          </Button>
          <Button variant="contained" size="small" onClick={clear} fullWidth>
            Cancil&nbsp;
            <BackspaceIcon />
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
