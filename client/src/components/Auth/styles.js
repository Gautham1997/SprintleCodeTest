import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    marginTop: 130,
    marginBottom: 130,
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));
