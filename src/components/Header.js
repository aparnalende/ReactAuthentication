import React from "react";
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, setUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const authUser = useSelector((state) => state.user.userObj);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let initials = authUser?.split(" ");

  console.log("AuthUser", authUser, "Initials", initials);

  const logoutHandler = (e) => {
    localStorage.removeItem("user");
    localStorage.clear();
    dispatch(resetUser());
    navigate("/");
  };
  return (
    <AppBar className="header-section">
      <div className="nav">
        <div className="header-container">
          <Toolbar disableGutters>
            <div className="header-wrapper">
              <div className="header-left">
                <div className="logo-block">
                  <a href="/restoList">
                    {/* <img src="" alt="" className="img" /> */}
                    <label className="img">Zonion</label>
                  </a>
                </div>
              </div>
              <div className="header-right">
                <Box>
                  <div className="user-block flex-between">
                    <div className="user-image">
                      <span className="user-name-txt">
                        {initials?.length >= 1 && initials[0].slice(0, 1)}
                      </span>
                    </div>
                    <div className="user-info">
                      <span className="user-name">{authUser}</span>
                      {/* <span className="user-type">
                        <KeyboardArrowDownIcon />
                      </span> */}
                    </div>
                    <div
                      className="logout-btn"
                      onClick={(event) => logoutHandler()}
                    >
                      Logout
                    </div>
                  </div>
                  {/* <Menu
                    sx={{ mt: "35px", mr: "35px" }}
                    id="menu-appbar"
                    // anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    // open={Boolean(anchorElUser)}
                    // onClose={handleCloseUserMenu}
                    className="profile-menu-item"
                  >
                    <MenuItem
                      // onClick={handleCloseUserMenu}
                      sx={{ width: "135px" }}
                    >
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                    // onClick={handleLogOut}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu> */}
                </Box>
              </div>
            </div>
          </Toolbar>
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
