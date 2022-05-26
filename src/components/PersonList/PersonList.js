import React, { useState, useEffect } from "react";
import { List, Pagination } from "antd";
import { Stack, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import {
  GetPersons,
  CreatePerson,
  DeletePersons,
} from "../../services/persona-service";
import "./PersonList.scss";
import Swal from "sweetalert2";
import "antd/dist/antd.min.css";

export default function PersonList() {
  const [personas, setPersonas] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await GetPersons();
    setTotal(response.length);
    setAllPersons(
      response.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setPersonas(response.slice(0, 10));
  };

  const handleChange = (event) => {
    if (event > 1) {
      setPage(event);
      setPersonas(allPersons.slice((event - 1) * 10, (event - 1) * 10 + 11));
    } else {
      setPage(1);
      setPersonas(allPersons.slice(0, 10));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="l">
        <div className="PersonList">
          <h2>PERSONAS</h2>
          <Stack
            direction="row"
            ml={10}
            mr={10}
            mt={2}
            mb={2}
            justifyContent="right"
            alignItems="flex"
            spacing={8}
          >
            {CargarPersonaBoton()}
          </Stack>
          <List
            style={{ background: "#485d887d" }}
            dataSource={["this data is to show a single column"]}
            bordered="true"
            renderItem={() => (
              <List.Item>
                <List.Item.Meta
                  title={<h3>Nombre y Apellido</h3>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h3>Fecha de Nacimiento</h3>}
                ></List.Item.Meta>
                <List.Item.Meta title={<h3>Ciudad</h3>}></List.Item.Meta>
                <List.Item.Meta title={<h3>Email</h3>}></List.Item.Meta>
              </List.Item>
            )}
          />
          <List
            style={{ background: "#747f8a99" }}
            dataSource={personas}
            bordered="true"
            renderItem={(person) => (
              <List.Item>
                <List.Item.Meta
                  title={<h4>{person.nombre_apellido}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{person.fecha_nacimmiento}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{person.ciudad}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{person.email}</h4>}
                ></List.Item.Meta>
              </List.Item>
            )}
          />
          <Stack
            direction="row"
            mt={1}
            mb={1}
            justifyContent="Center"
            alignItems="flex"
          >
            <Pagination
              hideOnSinglePage={true}
              page={page}
              total={total}
              showTotal={(total) => `Total ${total} Personas`}
              onChange={handleChange}
            />
          </Stack>
          <Stack
            direction="row"
            mt={1}
            mb={2}
            justifyContent="Center"
            alignItems="flex"
          >
            {ButtonDelete()}
          </Stack>
        </div>
      </Container>
    </React.Fragment>
  );
}

function CargarPersona() {
  return Swal.fire({
    text: "¿Agregar persona a la base de datos?",
    showCancelButton: true,
    cancelButtonColor: "red",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "green",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      CreatePerson();
    }
  });
}

function CargarPersonaBoton() {
  let button = (
    <Button
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => CargarPersona()}
    >
      <div style={{ marginRight: 8 }}>Agregar Persona</div>
      <PersonAddTwoToneIcon />
    </Button>
  );
  return button;
}

function deletePersons() {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar a todas las personas de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "red",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "green",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      DeletePersons();
    }
  });
}

function ButtonDelete() {
  let button = (
    <Button
      type="delete"
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => deletePersons()}
    >
      <div style={{ marginRight: 8 }}>Borrar todo</div>
      <DeleteForeverTwoToneIcon />
    </Button>
  );
  return button;
}
