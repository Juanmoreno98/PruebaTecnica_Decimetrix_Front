import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";

import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllMarker, getAllOperators, getAllUsers } from "../redux/actions";
import mapboxgl from "mapbox-gl";

import { Marker } from "mapbox-gl";
// import { height, width } from "@mui/system";
// import ReactMapGL from "react-map-gl";

function createData(firstname, lastname, address, email, age) {
  return { firstname, lastname, address, email, age };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.sessionState);
  const allOperators = useSelector((state) => state.operators);
  const allMarker = useSelector((state) => state.allMarker);

  const sesionLocal = JSON.parse(localStorage.getItem("session"));
  console.log(sesionLocal);

  // mapboxgl.accessToken = 'pk.eyJ1IjoianVhbm1vcmVubzk4IiwiYSI6ImNsZXI4Mmd3YzA5bjYzcXIxNzVwbWl3aGYifQ.Q8ZT5MXI1SUZBHPL6RU4LQ';
  // const map = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/mapbox/streets-v11',
  //   center: [-74.0836453,4.6534649],
  //   zoom: 15
  // });

  // const [viewport, setViewport] = useState({
  //   latitude: 4.6534649,
  //   longitude: -74.0836453,
  //   width: "100vh",
  //   height: "100vw",
  //   zoom: 12,
  // });

  // const mapRef = useRef()
  // const accessToken =
  //   "pk.eyJ1IjoianVhbm1vcmVubzk4IiwiYSI6ImNsZXI4Mmd3YzA5bjYzcXIxNzVwbWl3aGYifQ.Q8ZT5MXI1SUZBHPL6RU4LQ";
  mapboxgl.accessToken = 'pk.eyJ1IjoianVhbm1vcmVubzk4IiwiYSI6ImNsZXMzbHdwejB5bjczb3B2YmtoOWM3MW4ifQ.mSeFNGWJTO8NebUhvR6Riw';

  
  
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.0836453);
  const [lat, setLat] = useState(4.6534649);
  const [zoom, setZoom] = useState(9);

  const array = [{lng: -74.1112978201105, lat:4.611913332146443, title: "hola mundo", user: "se pudoo"}, {lng: -74.07573590302145, lat:4.624874880999875, title: "hola a todos", user: "lo logre"}]

  console.log("allMarker",allMarker)

  useEffect(() => {
    dispatch(getAllOperators());
    dispatch(getAllUsers());
    dispatch(getAllMarker())
    
  }, [dispatch]);
  
  useEffect(() => {
    setTimeout(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });
          allMarker.map((elm) => {
      const marker = new mapboxgl.Marker()
      return marker.setLngLat([elm.lng, elm.lat]).setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
        `<h2>Producto:</h2><h3>${elm.markerName}</h3> <h2>Imagen:</h2><img width="200px" src="${elm.img}" alt="${elm.markerName}"/> 
        <h2>Comentarios:</h2><p>${elm.comments}</p><h2>Fecha:</h2> <h3>${elm.date}</h3><h2>Usuario:</h2> <h3>${elm.firstName + " " + elm.lastName}</h3>  `
          )
      ).addTo( map.current)
    })
    ;  
      
    }, 1000);
  });

  

  console.log(token);
  if (token.length !== 0) {
    let currentToken = token;

    localStorage.setItem("session", "[]");
    let session = JSON.parse(localStorage.getItem("session"));
    session.push(currentToken);
    localStorage.setItem("session", JSON.stringify(session));
  }

  console.log("session", sesionLocal);

  if (sesionLocal && sesionLocal[0].role === "Administrador") {
    const rows = allOperators.map((elm) => {
      return createData(
        elm.firstname,
        elm.lastname,
        elm.address,
        elm.email,
        elm.age
      );
    });
    return (
      
      <div>
        <Header />
        <Typography
          variant="h3"
          noWrap
          component="a"
          href="/"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {" "}
          Mis Operarios
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, mt: 5 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Apellido
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Direccion
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Edad
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="center">{row.lastname}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="map-container-position">
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    );
  }
  if (sesionLocal && sesionLocal[0].role === "Operario") {
    console.log("pppppppppppp",allOperators)
    const currentOperator = allOperators.find((elm) => {
      return elm.email === sesionLocal[0].email;
    });

    const rows2 = [
      {
        firstname: currentOperator.firstname,
        lastname: currentOperator.lastname,
        email: currentOperator.email,
        password: currentOperator.password,
        address: currentOperator.address,
        age: currentOperator.age,
        role: currentOperator.role,
      },
    ];

    return (
      <div>
        <Header />
        <Typography
          variant="h3"
          noWrap
          component="a"
          href="/"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {" "}
          Mis Datos
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, mt: 5 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Apellido
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Direccion
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "#00897b", fontSize: 25, color: "white" }}
                  align="center"
                >
                  Edad
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="center">{row.lastname}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="map-container-position">
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    );
  }
}
