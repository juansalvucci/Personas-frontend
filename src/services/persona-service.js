import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.DATABASE_URL;

export async function GetPersons() {
  try {
    const response = await axios({
      url: `${baseUrl}/`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function CreatePerson() {
  try {
    const response = await axios({
      url: `${baseUrl}/`,
      method: "POST",
    });
    Swal.fire({
      title: "Listo!",
      text: "La persona se agregó correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "/";
      }
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo agregar la persona. Asegurese de que la base de datos este funcionando",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

export async function DeletePersons() {
  try {
    const response = await axios({
      url: `${baseUrl}/`,
      method: "DELETE",
    });
    Swal.fire({
      title: "Listo!",
      text: "Las personas se han borrado de la base de datos exitosamente, presione 'Cerrar' para actualizar.",
      icon: "success",
      confirmButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = window.location.href;
      }
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al borrar las personas. Asegurese que la base de datos contenga personas",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}
