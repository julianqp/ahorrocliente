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
import Header from "../components/Header";

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
      dia: Yup.number()
        .min(1, "No puedes eligir un día menos a 1.")
        .max(31, "No puedes elegir un día mayor a 31.")
        .required("El día es obligatoria."),
      fin: Yup.date(),
      inicio: Yup.date().required(
        "El peíodo de incio de cobro es obligatoria."
      ),
    }),
    onSubmit: async (valores) => {
      const { concepto, cantidad, tipo, isMensual, inicio, fin, dia } = valores;
      const obj = {
        concepto,
        cantidad,
        etiqueta: categoria.label,
        tipo,
        isMensual: isMensual === "true" ? true : false,
        inicio: inicio,
        fin: fin === "" ? undefined : fin,
        dia: dia,
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
        <Header titulo="Mensualidades" />
        {mensaje && <ErrorApi mensaje={mensaje} />}
        <div className="relative">
          <h1 className="text-2xl text-black font-light text-center">
            Nueva Mensualidad
          </h1>
          <Link href="mensualidades">
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
                  htmlFor="inicio"
                >
                  Periodo de inicio
                </label>
                <input
                  id="inicio"
                  type="month"
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
                  Periodo de fin
                </label>
                <input
                  id="fin"
                  type="month"
                  className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.fin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="mt-2 font-bold text-xs">
                  *Si no hay fecha de fin dejar campo vacio
                </p>
              </div>
              {formik.touched.fin && formik.errors.fin && (
                <ErrorMensaje mensaje={formik.errors.fin} />
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fecha"
                >
                  Día de actuación de la finanza
                </label>
                <input
                  placeholder="Día en la que se realiza la el pago o cobro"
                  id="dia"
                  type="number"
                  className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.dia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.dia && formik.errors.dia && (
                <ErrorMensaje mensaje={formik.errors.dia} />
              )}

              <input
                id="enviar"
                type="submit"
                value="Crear mensualidad"
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
