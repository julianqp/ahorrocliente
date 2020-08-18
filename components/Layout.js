import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { OBTENER_USUARIO } from "../querys/query";

const Layout = ({ children }) => {
  // Hook de routing
  const router = useRouter();

  const { data, loading, error } = useQuery(OBTENER_USUARIO, {
    fetchPolicy: "cache-and-network", // network-only
  });

  if (loading) {
    return "Cargando...";
  }

  if (!loading && !data) {
    router.push("/login");
    return "Redirigiendo...";
  }

  const { obtenerUsuario } = data;

  return (
    <>
      <Head>
        <title>Finanzas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 min-h-screen">
        <div className="sm:flex min-h-screen">
          <Sidebar usuario={obtenerUsuario} />
          <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
