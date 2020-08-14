import React, { useState } from "./node_modules/react";
import { useRouter } from "./node_modules/next/router";
import Link from "./node_modules/next/link";
import * as Yup from "./node_modules/yup";
import Layout from "../../components/Layout";
import ErrorMensaje from "../../components/Mensajes/ErrorMensaje";
import { useQuery, useMutation } from "./node_modules/@apollo/client";
import { EDITAR_FINANZA, OBTENER_FINANZA } from "../../querys/query";
import Select from "./node_modules/react-select";
import config from "../../config/config";
import ErrorApi from "../../components/Mensajes/ErrorApi";
import { Formik } from "./node_modules/formik";
import { formatoFecha } from "../../utils/utils";

import Swal from "sweetalert2";

const EditarMensualidad = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [mensaje, setMensaje] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const { data, loading, error } = useQuery(OBTENER_FINANZA, {
    variables: {
      id: id || "",
    },
  });

  const [editarFinanza] = useMutation(EDITAR_FINANZA);

  const schemaValidacion = Yup.object({
    concepto: Yup.string().required("El concepto es obligatorio"),
    cantidad: Yup.number()
      .moreThan(-0.9, "Debe ser mayor que cero.")
      .required("El precio obligatorio"),
    tipo: Yup.string().required("El tipo es obligatorio"),
    isMensual: Yup.bool().required("La mensualidad es obligatoria"),
    inicio: Yup.date(),
    fin: Yup.date(),
    inicio: Yup.date(),
  });

  if (loading) return "Cargando...";

  const { obtenerFianza } = data;

  if (categoria === null) {
    const cate = config.categorias.filter(
      (x) => x.label === obtenerFianza.etiqueta
    );

    setCategoria(cate[0] || []);
  }

  const actualizarInfoFinanza = async (valores) => {
    const { concepto, cantidad, tipo, isMensual, inicio, fin, fecha } = valores;

    const obj = {
      concepto,
      cantidad,
      etiqueta: categoria.label,
      tipo,
      isMensual: isMensual === "true" ? true : false,
      inicio: inicio === "" ? undefined : inicio,
      fin: fin === "" ? undefined : fin,
      fecha: fecha === "" ? undefined : fecha,
    };

    try {
      const { data } = await editarFinanza({
        variables: {
          id,
          input: obj,
        },
      });

      // Mostrar Alerta
      Swal.fire(
        "Actualizado",
        "La finanza se actualizó correctamente",
        "success"
      );

      // Redireccionar
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        {mensaje && <ErrorApi mensaje={mensaje} />}
        <div className="relative">
          <h1 className="text-2xl text-black font-light text-center">
            Editar Finanza
          </h1>
          <Link href="/">
            <p className="top-0 left-0 flex items-center ml-4 absolute text-left cursor-pointer hover:text-blue-900 hover:underline ">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="chevron-left w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Volver
            </p>
          </Link>
        </div>

        <div className="flex justify-center mt-5 ">
          <div className="w-full max-w-lg">
            <Formik
              validationSchema={schemaValidacion}
              enableReinitialize
              initialValues={obtenerFianza}
              onSubmit={(valores) => {
                actualizarInfoFinanza(valores);
              }}
            >
              {(props) => {
                let fecha = props.values.fecha
                  ? formatoFecha(props.values.fecha)
                  : null;
                let inicio = props.values.inicio
                  ? formatoFecha(props.values.inicio)
                  : "";
                let fin = props.values.fin
                  ? formatoFecha(props.values.fin)
                  : "";

                return (
                  <form
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={props.handleSubmit}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="concepto"
                      >
                        Concepto
                      </label>
                      <input
                        id="concepto"
                        type="text"
                        placeholder="Concepto"
                        className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={props.values.concepto}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.concepto && props.errors.concepto && (
                      <ErrorMensaje mensaje={props.errors.concepto} />
                    )}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="cantidad"
                      >
                        Cantidad
                      </label>
                      <input
                        id="cantidad"
                        type="number"
                        placeholder="Cantidad"
                        className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={props.values.cantidad}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.cantidad && props.errors.cantidad && (
                      <ErrorMensaje mensaje={props.errors.cantidad} />
                    )}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tipo"
                      >
                        Tipo
                      </label>
                      <select
                        id="tipo"
                        className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                        value={props.values.tipo}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      >
                        <option value="">Seleccione una opcion</option>
                        <option value="GASTO">Gasto</option>
                        <option value="INGRESO">Ingreso</option>
                      </select>
                    </div>
                    {props.touched.tipo && props.errors.tipo && (
                      <ErrorMensaje mensaje={props.errors.tipo} />
                    )}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="etiqueta"
                      >
                        Etiqueta
                      </label>
                      <Select
                        className="mt-3"
                        value={categoria}
                        options={config.categorias}
                        onChange={(opcion) => setCategoria(opcion)}
                        placeholder="Busque o Seleccione el Cliente"
                        noOptionsMessage={() => "No hay resultados"}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="isMensual"
                      >
                        Mensualidad
                      </label>
                      <div className="flex items-center justify-around">
                        <div>
                          <label htmlFor="true">
                            <input
                              checked={
                                props.values.isMensual === true ||
                                props.values.isMensual === "true"
                              }
                              type="radio"
                              id="true"
                              name="isMensual"
                              value={"true"}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            <span className="ml-2">Si</span>
                          </label>
                        </div>
                        <div>
                          <label className="ml-2" htmlFor="false">
                            <input
                              checked={
                                props.values.isMensual === false ||
                                props.values.isMensual === "false"
                              }
                              type="radio"
                              id="false"
                              name="isMensual"
                              value={"false"}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {props.touched.isMensual && props.errors.isMensual && (
                      <ErrorMensaje mensaje={props.errors.isMensual} />
                    )}
                    {props.values.isMensual === "true" ? (
                      <>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="inicio"
                          >
                            Fecha inicio mensaulidad
                          </label>
                          <input
                            id="inicio"
                            type="date"
                            placeholder="Fecha del importe"
                            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={inicio || ""}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                        </div>
                        {props.touched.inicio && props.errors.inicio && (
                          <ErrorMensaje mensaje={props.errors.inicio} />
                        )}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="fin"
                          >
                            Fecha fin mensualidad
                          </label>
                          <input
                            id="fin"
                            type="date"
                            placeholder="Fecha del importe"
                            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={fin || ""}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                        </div>
                        {props.touched.fin && props.errors.fin && (
                          <ErrorMensaje mensaje={props.errors.fin} />
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="fecha"
                      >
                        Fecha del importe
                      </label>
                      <input
                        id="fecha"
                        type="date"
                        placeholder="Fecha del importe"
                        className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={fecha || ""}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.fecha && props.errors.fecha && (
                      <ErrorMensaje mensaje={props.errors.fecha} />
                    )}

                    <input
                      id="enviar"
                      type="submit"
                      value="Editar finanza"
                      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase border rounded hover:bg-gray-900"
                    />
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditarMensualidad;
