import React, { useEffect } from "react";

// material-ui
import { Typography, CircularProgress, Divider } from "@material-ui/core";

// header and footer import //
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getPost, getPostBySearch } from "../../actions/posts";

// Moment
import moment from "moment";

// import comment section //
import CommentSection from "./CommentSection";

// Router
import { useParams, useNavigate } from "react-router-dom";

//react bootstrap import components api //
import { Container, Col, Row } from "react-bootstrap";

// Styles //
import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  // use Effect
  useEffect(() => {
    // Get Post by Id
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [dispatch, post]);

  if (!post) return null;

  let recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  if (recommendedPosts?.length > 4) {
    recommendedPosts = recommendedPosts.splice(0, 3);
  }

  const openPost = (_id) => navigate(`/posts/${_id}`);

  // Return
  return (
    <>
      <Header />
      <Container className="main">
        {isLoading ? (
          <div className="text-center">
            <CircularProgress
              size="7em"
              thickness={4}
              style={{ color: "#D3D3D3" }}
            />
          </div>
        ) : (
          <div>
            <div className="section">
              <Row className="align-items-center justify-content-center">
                <Col className="col-md-6">
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <br />
                  <Typography
                    gutterBottom
                    variant="h6"
                    color="textSecondary"
                    component="h2"
                  >
                    {post.tags.map((tag) => `#${tag} `)}
                  </Typography>
                  <br />
                  <Typography gutterBottom variant="body1" component="p">
                    {post.message}
                  </Typography>
                  <br />
                  <Typography variant="subtitle1">
                    <strong> Created by: {post.name} </strong>
                  </Typography>
                  <Typography variant="body1">
                    {moment(post.createdAt).fromNow()}
                  </Typography>
                  <br />
                  <img
                    className={classes.media}
                    src={
                      post.selectedFile ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={post.title}
                  />
                </Col>
              </Row>
            </div>
            <div className="col-md-12">
              <CommentSection post={post} />
              <br />
              <br />
            </div>
            <div className="recommendedSection">
              <Row className="align-items-center justify-content-center">
                <Col className="col-md-6">
                  {recommendedPosts.length && (
                    <div className={classes.section}>
                      <Typography gutterBottom variant="h5">
                        You might also like:
                      </Typography>
                      <Divider />
                      <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(
                          ({
                            title,
                            message,
                            name,
                            likes,
                            selectedFile,
                            _id,
                          }) => (
                            <div
                              style={{ margin: "20px", cursor: "pointer" }}
                              onClick={() => openPost(_id)}
                              key={_id}
                            >
                              <Typography variant="h6" gutterBottom>
                                {title}
                              </Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                {name}
                              </Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                {message}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Likes: {likes.length}
                              </Typography>
                              <img
                                src={selectedFile}
                                width="200px"
                                alt="image12"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default PostDetails;
