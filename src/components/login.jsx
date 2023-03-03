import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllMarker, getAllOperators, getAllUsers, loginUser } from "../redux/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Prueba Tecnica
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const users = useSelector((state) => state.users);
  const allOperators = useSelector((state) => state.operators);
  const allMarker = useSelector((state) => state.allMarker);

  console.log(users);
console.log("session",JSON.parse(localStorage.getItem("session")))
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOperators());
    dispatch(getAllMarker());

  }, [dispatch]);

  const [input, setInputs] = useState({
    password: "",
    email: "",
    role: "",
  });


  const user = users.find(
    (e) =>
      e.email.toLowerCase() === input.email.toLowerCase() &&
      e.role === input.role
  );

  console.log("user",user)
  
  const user2 = users.find(
    (e) =>
      e.email.toLowerCase() === input.email.toLowerCase() &&
      e.role === input.role
  );


  const handleSubmit = async (e, message) => {
    e.preventDefault();
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }

    if (user) {
      if (bcrypt.compareSync(input.password, user.password)) {
        navigate("/home");
      } else {
        return MySwal.fire("¡Contraseña Incorrecta!", message, "error");
      }
    } else {
      return MySwal.fire("¡Usuario Ó Role Incorrecto!", message, "error");
    }
    dispatch(loginUser({ password: input.password, email: input.email }));
  };

  const handleUser = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Prueba Tecnica
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => handleUser(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleUser(e)}
              />
              <Grid item xs={12} sx = {{ mt: 2}}>
                <FormControl fullWidth>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    name="role"
                    value={input.role}
                    label="Role"
                    onChange={(e) => handleUser(e)}
                  >
                    <MenuItem value={"Operario"}>Operario</MenuItem>
                    <MenuItem value={"Administrador"}>Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"No tienes cuenta? REGISTRATE."}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
