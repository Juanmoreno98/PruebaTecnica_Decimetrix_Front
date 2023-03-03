import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createUser } from "../redux/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a href="www.linkedin.com/in/juan-pablo-moreno-martinez-73206b258">
        Juan Pablo Moreno
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    age: 0,
    role: "",
  });

  const handleSubmit = (event, message) => {
    event.preventDefault();
    dispatch(createUser(input));
    setInput({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      age: 0,
      role: "",
    });
    return MySwal.fire("Usuario Registrado Correctamente", message, "success");
  };

  const handleUser = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar Usuario
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  value={input.firstname}
                  label="Nombre"
                  autoFocus
                  onChange={(e) => handleUser(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Apellido"
                  value={input.lastname}
                  name="lastname"
                  onChange={(e) => handleUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={input.email}
                  name="email"
                  onChange={(e) => handleUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={input.password}
                  id="password"
                  onChange={(e) => handleUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Direccion"
                  type="address"
                  value={input.address}
                  id="address"
                  onChange={(e) => handleUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Edad"
                  type="age"
                  value={input.age}
                  id="age"
                  onChange={(e) => handleUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: -1, mb: 1 }}
              >
                Ingresar
              </Button>
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
