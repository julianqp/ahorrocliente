import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellidos
      email
    }
  }
`;

const NuevaCuenta = () => {
  // State para el mensaje
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos usuarios
  //const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA);

  // Routing
  const router = useRouter();

  // Validación del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellidos: "",
      saldo: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es Obligatorio"),
      apellidos: Yup.string().required("El Apellidos es obligatorio"),
      saldo: Yup.number()
        .default(0)
        .moreThan(-0.9, "El valor no puede ser negativo."),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password no puede ir vacio")
        .min(6, "El password debe ser de al menos 6 caracteres"),
      password2: Yup.string()
        .required("La constraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .equals([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    }) /*
        onSubmit: async valores => {
            // console.log('enviando');
            // console.log(valores);
            const { nombre, apellidos, email, password } = valores
            

            try {
                const { data } = await nuevoUsuario({
                    variables : {
                        input: {
                            nombre,
                            apellidos,
                            email,
                            password
                        }
                    }
                });
                console.log(data);

                // Usuario creado correctamente
                guardarMensaje(`Se creo correctamente el Usuario: ${data.nuevoUsuario.nombre} `);

                setTimeout(() => {
                    guardarMensaje(null);
                    router.push('/login')
                }, 3000);

                // Redirigir usuario para iniciar sesión

            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }*/,
  });

  // if(loading) return 'Cargando...';

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
        {mensaje && mostrarMensaje()}

        <h1 className="text-center text-2xl text-white font-light">
          Crear Nueva Cuenta
        </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              //onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre Usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellidos"
                >
                  Apellidos
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="apellidos"
                  type="text"
                  placeholder="Apellidos Usuario"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.apellidos && formik.errors.apellidos ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellidos}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellidos"
                >
                  Saldo
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="saldo"
                  type="number"
                  placeholder="Saldo Inicial"
                  value={formik.values.saldo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.saldo && formik.errors.saldo ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.saldo}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Contraseña de usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password2"
                >
                  Password
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password2"
                  type="password"
                  placeholder="Repita la contraseña"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password2}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercas cursor-pointer hover:bg-gray-900"
                value="Crear Cuenta"
              />

              <Link href="/login">
                <p className="mt-3 text-center cursor-pointer hover:text-blue-900 hover:underline ">
                  Volver
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevaCuenta;
