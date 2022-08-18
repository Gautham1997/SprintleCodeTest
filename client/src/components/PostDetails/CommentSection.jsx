import React, { useState, useRef } from "react";

// material ui import //
import { Typography, TextField, Button } from "@material-ui/core";

// redux dispatch import //
import { useDispatch } from "react-redux";

// react bootstrap import components api //
import { Col, Row } from "react-bootstrap";

// actions comment post import //
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment(" ");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Row
        className="align-items-center justify-content-center text-center"
        style={{ marginTop: 50 }}
      >
        <Col className="col-md-6 justify-content-center">
          {user?.result?.name && (
            <>
              <TextField
                fullWidth
                rows={1}
                variant="outlined"
                label="Write a Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment}
                variant="contained"
                onClick={handleClick}
              >
                Sent
              </Button>
            </>
          )}
          <br />
          <br />
          <br />
          {comments.map((c, i) => (
            <Typography
              style={{ marginTop: 20 }}
              key={i}
              gutterBottom
              variant="subtitle1"
            >
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "left",
                  background: "rgb(241, 233, 233)",
                  borderRadius: "20px",
                  padding: "8px",
                }}
              >
                <strong>{c.split(": ")[0]}</strong>
                <br />
                {c.split(":")[1]}
              </p>
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Col>
      </Row>
    </>
  );
};

export default CommentSection;
