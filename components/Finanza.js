import React from "react";
import { useMutation } from "@apollo/client";
import Router from "next/router";
import { OBTENER_CLIENTES_USUARIO, ELIMINAR_CLIENTE } from "../querys/query";
import Swal from "sweetalert2";

const Finanza = ({ finanza }) => {
  const {
    id,
    concepto,
    cantidad,
    tipo,
    etiqueta,
    isMensual,
    inicio,
    fin,
    usuario,
    creado,
  } = finanza;
  let { fecha } = finanza;
  /*
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      // Obtener el objeto qu se desea actualizar
      let { obtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIO,
      });

      // reescribir el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (ca) => ca.id !== id
          ),
        },
      });
    },
  });
*/
  /*
  const confirmarELiminarClinete = () => {
    Swal.fire({
      title: "¿Deseas eliminar a este cliente?",
      text: "Esta accion no se puede desacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.value) {
        // ELiminar por id
        const { data } = await eliminarCliente({
          variables: {
            id,
          },
        });
        // mostrar alerta
        try {
          Swal.fire("Eliminado", data.eliminarCliente, "success");
        } catch (error) {
          Swal.fire("Error", "El cliente no ha podido eliminarse", "error");
        }
      }
    });
  };

  const confirmarEditarClinete = () => {
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id },
    });
  };
  */
  fecha = new Date(parseInt(fecha, 10));
  return (
    <tr key={id}>
      <td className="border px-4 py-2">{concepto}</td>
      <td className="border px-4 py-2">{cantidad}</td>
      <td className="border px-4 py-2">{fecha.toLocaleDateString()}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          // onClick={() => confirmarELiminarClinete()}
        >
          Eliminar
          <svg fill="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-orange-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          // onClick={() => confirmarEditarClinete()}
        >
          Editar
          <svg fill="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Finanza;
