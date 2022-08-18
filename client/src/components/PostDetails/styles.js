import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    boxShadow: "rgba(0, 0, 0, 0.49) 0px 5px 15px",
    marginTop: 150,
    marginBottom: 100,
  },

  media: {
    borderRadius: "10px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "500px",
  },

  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },

  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },

  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },

  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  loadingPaper: {
    marginTop: 150,
    marginBottom: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
}));
