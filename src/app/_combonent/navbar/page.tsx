import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import GitHubIcon from "@mui/icons-material/GitHub";
import SvgIcon from "@mui/material/SvgIcon";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Padding } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { storeDispaatch, storeState } from "@/lib/store";
import { clearToken } from "@/lib/authSlice";


const pages = ["", "gallary", "content"];
// const settings = ["login", "register", "Logout"];

function Navbar() {
   let { push } = useRouter();
  let { token } = useSelector((state: storeState) => state.authSlice);
  let pathName: string = usePathname();
  let dispatch = useDispatch<storeDispaatch>();

  function navigate(path: string) {
  push(path);
}

   function Logout() {
    localStorage.removeItem("postUserToken");
     dispatch(clearToken());
     console.log(token);
    navigate('/login');
    // window.location.href = "/login";
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://documenter.getpostman.com/view/5709532/2sA3JT4Jzs#1144f8eb-27f9-4fe9-9376-5b5da1d555d7"
            target="blank"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Next Posts
          </Typography>
          {token ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Link href={`/${page}`}>
                        <Typography textAlign="center" sx={{ color: "black" }}>
                          {page == "" ? "Home" : page}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : null}

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="https://github.com/Basem-Mouner?tab=repositories"
            target="blank"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <GitHubIcon />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {token ? (
              <>
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    className={pathName == `/${page}` ? "active" : ""}
                    href={`/${page}`}
                  >
                    {page == "" ? "Home" : page}
                  </Link>
                ))}
              </>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                {token ? (
                  <Button onClick={() => Logout()} style={{ color: "black" }}>
                    logout
                  </Button>
                ) : (
                  <>
                    <Link href={`/login`} style={{ color: "black" }}>
                      login
                    </Link>
                    <Link href={`/register`} style={{ color: "black" }}>
                      register
                    </Link>
                  </>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
