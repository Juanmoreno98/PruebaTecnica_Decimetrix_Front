import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
// import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { createMarker } from "../redux/actions";


const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Header() {
  // const tokenUser = useSelector((state) => state.sessionState);

  //Global States
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // Local States
  const [input, setInput] = useState({
    img: "",
    markerName: "",
    comments: "",
    firstName: "",
    lastName: "",
    date: "",
    lng: 0,
    lat: 0,
  });
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);

  if (open) console.log(input);
  if (open) console.log("formError", error);

  console.log("puntoo",input)

  // const initialDataJson = JSON.stringify({
  //   username: user.username,
  //   email: user.email,
  //   role: user.role,
  //   address: user.address,
  //   phone: user.phone,
  //   password: '',
  //   confirm: ''
  // });
  // const inputJson = JSON.stringify(input);

  // Functions
  function handleOpen() {
    setInput({
      img: "",
      markerName: "",
      comments: "",
      firstName: "",
      lastName: "",
      date: "",
      lng: 0,
      lat: 0,
    });
    setError({});
    setOpen(true);
  }

  function handleClose() {
    setInput({
      img: "",
      markerName: "",
      comments: "",
      firstName: "",
      lastName: "",
      date: "",
      lng: 0,
      lat: 0,
    });
    setError({});
    setOpen(false);
  }

  function inputChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (event, message) => {
    event.preventDefault();
    dispatch(createMarker(input));
    setInput({
      img: "",
      markerName: "",
      comments: "",
      firstName: "",
      lastName: "",
      date: "",
      lng: 0,
      lat: 0,
    });
    return MySwal.fire("Punto en el mapa creado correctamente", message, "success");
  };

  // ------------------------------------------------------------------------------------------------------------------------------>

  const sesionLocal = JSON.parse(localStorage.getItem("session"));
  console.log("sesion---->", sesionLocal);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSesionClose = () => {
    localStorage.clear();
    navigate("/");
  };
  if (sesionLocal && sesionLocal[0].role === "Administrador") {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

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
                <MenuItem>
                  <NavLink className="color-header-res" to={"/admin"}>
                    <SupervisorAccountRoundedIcon></SupervisorAccountRoundedIcon>
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/admin"}>
                    ADMINISTRADOR
                  </NavLink>
                </MenuItem>

                <MenuItem>
                  <NavLink className="color-header-res" to={"/profile"}>
                    <AccountCircleIcon />{" "}
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/profile"}>
                    {sesionLocal[0].firstname[0].toUpperCase() +
                      sesionLocal[0].firstname.slice(1)}
                  </NavLink>
                  <NavLink className="color-header-res" to={"/createProduct"}>
                    <AddBoxIcon></AddBoxIcon>
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/createProduct"}>
                    CREAR MARCADOR
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header" to={"/admin"}>
                <SupervisorAccountRoundedIcon></SupervisorAccountRoundedIcon>
              </NavLink>
              <NavLink className="color-header" >
                ADMINISTRADOR
              </NavLink>

              <NavLink className="color-header" >
                <AccountCircleIcon />{" "}
              </NavLink>
              <NavLink className="color-header" >
                {sesionLocal[0].firstname[0].toUpperCase() +
                  sesionLocal[0].firstname.slice(1)}
              </NavLink>
              <Box sx={{mt: -0.7}}>
              <Button onClick={(e) => handleOpen(e)} variant="contained" color="success" >
              <AddBoxIcon></AddBoxIcon>Crear Marcador
              </Button>
              </Box>
              <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Crea Tu Nuevo Marcador</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    ¡Revisar antes de crear!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.firstName}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Apellido"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.lastName}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="comments"
                    name="comments"
                    label="Comentarios"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.comments}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="date"
                    name="date"
                    label="Fecha"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.date}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="markerName"
                    name="markerName"
                    label="Nombre Del Marcador"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.markerName}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="img"
                    name="img"
                    label="Url Imagen"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.img}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lng"
                    name="lng"
                    label="Longitud"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={input.lng}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lat"
                    name="lat"
                    label="Latitud"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={input.lat}
                    onChange={(e) => inputChange(e)}
                  />
                  <DialogActions>
                  <Button onClick={handleSubmit}>Crear</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              <NavLink className="color-header-res" to={"/register2"}>
                <AddBoxIcon sx={{ mr: 0, ml: 2 }}></AddBoxIcon>
              </NavLink>
              <NavLink className="color-header-res2" to={"/register2"}>
                Registrar Usuario
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Button
              variant="outlined"
              onClick={handleSesionClose}
              sx={{ ml: 3, color: "red" }}
              endIcon={<LogoutOutlined />}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (sesionLocal && sesionLocal[0].role === "Operario") {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

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
                <MenuItem></MenuItem>
                <MenuItem>
                  <NavLink className="color-header" >
                    <SupervisorAccountRoundedIcon></SupervisorAccountRoundedIcon>
                  </NavLink>
                  <NavLink className="color-header" >
                    OPERARIO
                  </NavLink>
                  <NavLink className="color-header-res" >
                    <AddBoxIcon></AddBoxIcon>
                  </NavLink>
                  <NavLink className="color-header-res2" >
                    CREAR MARCADOR
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="color-header-res" to={"/profile"}>
                    <AccountCircleIcon sx={{ ml: 1 }} />
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/profile"}>
                    {sesionLocal[0].firstname[0].toUpperCase() +
                      sesionLocal[0].firstname.slice(1)}
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header">
                <SupervisorAccountRoundedIcon></SupervisorAccountRoundedIcon>
              </NavLink>
              <NavLink className="color-header">OPERARIO</NavLink>
              <NavLink className="color-header2">
                <AccountCircleIcon sx={{ mr: 1 }} />
              </NavLink>
              <NavLink className="color-header">
                {sesionLocal[0].firstname[0].toUpperCase() +
                  sesionLocal[0].firstname.slice(1)}
              </NavLink>
                  <Box sx={{mt: -0.7}}>
              <Button onClick={(e) => handleOpen(e)} variant="contained" color="success" >
              <AddBoxIcon></AddBoxIcon>Crear Marcador
              </Button>
              </Box>
              <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Crea Tu Nuevo Marcador</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    ¡Revisar antes de crear!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.firstName}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Apellido"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.lastName}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="comments"
                    name="comments"
                    label="Comentarios"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.comments}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="date"
                    name="date"
                    label="Fecha"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.date}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="markerName"
                    name="markerName"
                    label="Nombre Del Marcador"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.markerName}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="img"
                    name="img"
                    label="Url Imagen"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={input.img}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lng"
                    name="lng"
                    label="Longitud"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={input.lng}
                    onChange={(e) => inputChange(e)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lat"
                    name="lat"
                    label="Latitud"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={input.lat}
                    onChange={(e) => inputChange(e)}
                  />
                  <DialogActions>
                  <Button onClick={handleSubmit}>Crear</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Button
              variant="outlined"
              onClick={handleSesionClose}
              sx={{ ml: 3, color: "#ff6700" }}
              endIcon={<LogoutOutlined />}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
