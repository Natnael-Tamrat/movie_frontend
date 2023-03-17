import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { context } from "../Context/QueryProvider";
import "../styles/Navbar.css";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const queryContext = React.useContext(context);
  const [toggler, setToggler] = useState(false);
  const handleChange = (event) => {
    queryContext.setQuery(event.target.value);
  };
  const toggleNavbar = () => {
    setToggler(!toggler);
    console.log(toggler);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            className="hamburger"
            onClick={toggleNavbar}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Movie Galaxy
          </Typography>
          <div className="nav-links">
            <NavLink className="links" to="/movies">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Home
              </Typography>
            </NavLink>
            <NavLink className="links" to="/favourites">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Favourites
              </Typography>
            </NavLink>
            <NavLink
              className="links"
              to="/"
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("user");
                window.location.reload(true);
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Logout
              </Typography>
            </NavLink>
          </div>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={queryContext.query}
              onChange={handleChange}
            />
          </Search>
          <Button
            type="secondary"
            style={{
              color: "#1976d2",
              backgroundColor: "white",
              marginLeft: "10px",
            }}
            onClick={() => {
              queryContext.setIsQuerySubmitted(!queryContext.isQuerySubmitted);
            }}
          >
            search
          </Button>
        </Toolbar>
        {toggler ? (
          <div className="mobile-menu">
            <div className="nav-links-mobile">
              <NavLink className="links" to="/">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
                >
                  Home
                </Typography>
              </NavLink>
              <NavLink className="links" to="/favourites">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
                >
                  Favourites
                </Typography>
              </NavLink>
            </div>
          </div>
        ) : null}
      </AppBar>
    </Box>
  );
}
