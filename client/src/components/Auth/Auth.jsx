import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";

//icon imports//
import Input from "./Input";
import Icon from "./Icon";

//component import //
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

//styles sheet //
import useStyles from "./styles";

//redux //
import { useDispatch } from "react-redux";
//google login //
import { GoogleLogin } from "react-google-login";

//images import //
import SignupIcon from "../../images/signupicon.png";
import SigninIcon from "../../images/signinicon.png";

import { useNavigate } from "react-router";
import { signup, signin } from "../../actions/auth";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <>
      <Header />
      <Container className={classes.main} component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <img
            className={classes.avatar}
            src={isSignup ? SignupIcon : SigninIcon}
            alt="Auth Logo"
          />

          <Typography style={{ fontWeight: "bold", fontFamily: "cursive" }}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <br />
          <br />
          <form className={classes.from} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                </>
              )}

              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />

              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <GoogleLogin
              clientId="754172843078-uhh8urvdinlhdni78k6qp8ot9fp0vpr7.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  style={{ backgroundColor: "#3C5898", color: "#fff" }}
                  className={classes.googleButton}
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account ? Sign In"
                    : "Dont have an account ? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Auth;
