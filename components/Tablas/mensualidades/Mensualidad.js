import React from "react";
import { useMutation } from "@apollo/client";
import { OBTENER_FINANZAS, ELIMINAR_FINANZA } from "../../../querys/query";
import Swal from "sweetalert2";
import TableCell from "@material-ui/core/TableCell";
import Router from "next/router";

const Mensualidad = ({ value, column, id }) => {
  const [eliminarFinanza] = useMutation(ELIMINAR_FINANZA, {
    update(cache) {
      const { obtenerFinanzasUsuario } = cache.readQuery({
        query: OBTENER_FINANZAS,
      });

      cache.writeQuery({
        query: OBTENER_FINANZAS,
        data: {
          obtenerFinanzasUsuario: obtenerFinanzasUsuario.filter(
            (finanzaActual) => finanzaActual.id !== id
          ),
        },
      });
    },
  });
  const editarFinanza = (id) => {
    Router.push({
      pathname: "/editarfinanza/[id]",
      query: { id },
    });
  };
  const confirmarEliminarFinanza = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar la finanza?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          // eliminar finanza de la bd
          const { data } = await eliminarFinanza({
            variables: {
              id,
            },
          });

          Swal.fire("Correcto", data.eliminarFinanza, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  let valor;
  if (column.format) {
    valor = column.format(value);
  } else {
    valor = value;
  }
  if (column.id === "editar") {
    return (
      <TableCell key="editar" align="center">
        <button
          type="button"
          className="flex justify-center items-center bg-orange-600 py-2 px-2 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => editarFinanza(id)}
        >
          <svg fill="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </TableCell>
    );
  }
  if (column.id === "eliminar") {
    return (
      <TableCell key="eliminar" align="center">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-2 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarFinanza(id)}
        >
          <svg fill="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </TableCell>
    );
  }
  return (
    <TableCell key={column.id} align={column.align}>
      {valor}
    </TableCell>
  );
};

export default Mensualidad;
