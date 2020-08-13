import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Layout from "../components/Layout";
import ErrorMensaje from "../components/Mensajes/ErrorMensaje";
import { useMutation } from "@apollo/client";
import { CREAR_NUEVA_FINANZA, OBTENER_FINANZAS } from "../querys/query";
import Select from "react-select";
import config from "../config/config";
import ErrorApi from "../components/Mensajes/ErrorApi";
import Link from "next/link";

const NuevaFinanza = () => {
  const [mensaje, setMensaje] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [nuevaFinanza] = useMutation(CREAR_NUEVA_FINANZA, {
    update(cache, { data: { nuevaFinanza } }) {
      // Obtener el objeto qu se desea actualizar
      const { obtenerFinanzasUsuario } = cache.readQuery({
        query: OBTENER_FINANZAS,
      });

      // reescribir el cache
      cache.writeQuery({
        query: OBTENER_FINANZAS,
        data: {
          obtenerFinanzasUsuario: [...obtenerFinanzasUsuario, nuevaFinanza],
        },
      });
    },
  });

  const router = useRouter();

  //Validadion del formulario
  const formik = useFormik({
    initialValues: {
      concepto: "",
      cantidad: "",
      tipo: "",
      isMensual: "",
      inicio: "",
      fin: "",
      fecha: "",
    },
    validationSchema: Yup.object({
      concepto: Yup.string().required("El concepto es obligatorio"),
      cantidad: Yup.number()
        .moreThan(-0.9, "Debe ser mayor que cero.")
        .required("El precio obligatorio"),
      tipo: Yup.string().required("El tipo es obligatorio"),
      isMensual: Yup.bool().required("La mensualidad es obligatoria"),
      inicio: Yup.date(),
      fin: Yup.date(),
      inicio: Yup.date(),
    }),
    onSubmit: async (valores) => {
      const {
        concepto,
        cantidad,
        tipo,
        isMensual,
        inicio,
        fin,
        fecha,
      } = valores;
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

      const variables = {
        input: obj,
      };

      try {
        const { data } = await nuevaFinanza({ variables });

        setMensaje(
          `La finanza con concepto ${data.nuevaFinanza.concepto} se ha creado correctamente.`
        );
        setTimeout(() => {
          setMensaje(null);
          router.push("/");
        }, 4000);
      } catch (error) {
        setMensaje(error.message);
        setTimeout(() => {
          setMensaje(null);
        }, 4000);
      }
    },
  });

  return (
    <>
      <Layout>
        {mensaje && <ErrorApi mensaje={mensaje} />}
        <div className="relative">
          <h1 className="text-2xl text-black font-light text-center">
            Eliminar Finanza
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
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
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
                  value={formik.values.concepto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.concepto && formik.errors.concepto && (
                <ErrorMensaje mensaje={formik.errors.concepto} />
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
                  value={formik.values.cantidad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.cantidad && formik.errors.cantidad && (
                <ErrorMensaje mensaje={formik.errors.cantidad} />
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
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Seleccione una opcion</option>
                  <option value="GASTO">Gasto</option>
                  <option value="INGRESO">Ingreso</option>
                </select>
              </div>
              {formik.touched.tipo && formik.errors.tipo && (
                <ErrorMensaje mensaje={formik.errors.tipo} />
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
                  placeholder="Busque o Seleccione la etiqueta"
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
                        type="radio"
                        id="true"
                        name="isMensual"
                        value={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                  </div>
                  <div>
                    <label className="ml-2" htmlFor="false">
                      <input
                        type="radio"
                        id="false"
                        name="isMensual"
                        value={false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
              {formik.touched.isMensual && formik.errors.isMensual && (
                <ErrorMensaje mensaje={formik.errors.isMensual} />
              )}
              {formik.values.isMensual === "true" ? (
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
                      value={formik.values.inicio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.inicio && formik.errors.inicio && (
                    <ErrorMensaje mensaje={formik.errors.inicio} />
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
                      value={formik.values.fin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.fin && formik.errors.fin && (
                    <ErrorMensaje mensaje={formik.errors.fin} />
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
                  value={formik.values.fecha}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.fecha && formik.errors.fecha && (
                <ErrorMensaje mensaje={formik.errors.fecha} />
              )}

              <input
                id="enviar"
                type="submit"
                value="Crear finanza"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase border rounded hover:bg-gray-900"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NuevaFinanza;
