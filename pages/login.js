import React, { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { LOGIN } from "../querys/query";

const Login = () => {
  // routing
  const router = useRouter();

  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos usuarios en apollo
  const [login] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      // console.log(valores);
      const { email, password } = valores;

      try {
        const { data } = await login({
          variables: {
            email,
            password,
          },
        });

        guardarMensaje("Autenticando...");

        // Guardar el token en localstorage
        setTimeout(() => {
          const { token } = data.login;
          localStorage.setItem("token", token);
        }, 1000);

        // Redireccionar hacia clientes
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/");
        }, 2000);
      } catch (error) {
        guardarMensaje(error.message);
        // console.log(error);

        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
      <h1 className="text-center text-2xl text-white font-light">Login</h1>

      {mensaje && mostrarMensaje()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
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
                placeholder="Password Usuario"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
              value="Iniciar Sesión"
            />

            <Link href="/nuevacuenta">
              <p className="mt-3 text-center cursor-pointer hover:text-blue-900 hover:underline ">
                Registrarme
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
