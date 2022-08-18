import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },

  paper: {
    borderRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.49) 0px 5px 15px",
    padding: theme.spacing(2),
  },

  form: {
    display: "flex",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  fileInput: {
    width: "98%",
    margin: "10px 0",
  },

  textField: {
    border: "none",
    margin: "10px 0",
  },

  buttonSubmit: {
    marginBottom: 10,
  },
}));
