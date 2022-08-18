import React from "react";
//react router dom //
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//material ui import //
import { Container } from "@material-ui/core";

// components page import //
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Profile from "./components/Profile/Profile";
import Error from "./components/Error/Error";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate to="/posts" replace={true} />}
          />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/posts" />}
          />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
