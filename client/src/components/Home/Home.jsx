import React, { useState } from "react";

// import components all //
import Footer from "../Footer/Footer";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Header from "../Header/Header";
import Pagination from "../Pagination/Pagination";

// redux import //
import { useDispatch } from "react-redux";

// actions getPosts import fetchPostBySearch //
import { getPostBySearch } from "../../actions/posts";

// Styles import //
import useStyles from "./styles";

// import material ui //
import {
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

//material ui search icon //
import SearchIcon from "@mui/icons-material/Search";

// import material ui chip input //
import ChipInput from "material-ui-chip-input";

// react router dom import //
import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  // user set state //
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // Handlers
  const handleKeyPress = (e) => {
    // If enter is pressed
    if (e.keyCode === 13) {
      // Search post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      // Dispatch = Fetch search post
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Header />

      <Container className={classes.main} maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Post"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0px" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                style={{ backgroundColor: "#3C5898", color: "#fff" }}
                variant="contained"
                size="small"
                onClick={searchPost}
                fullWidth
              >
                Search&nbsp;
                <SearchIcon />
              </Button>
            </AppBar>

            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
