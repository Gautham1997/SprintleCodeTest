import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  main: {
    marginTop: 170,
    marginBottom: 200,
  },

  appBarSearch: {
    borderRadius: 5,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 5,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
