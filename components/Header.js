import React from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import Titulo from "./Titulo";
import PropTypes from "prop-types";

const Header = ({ titulo }) => {
  const router = useRouter();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <Titulo titulo={titulo} />

      <button
        onClick={() => cerrarSesion()}
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded my-1 py-1 px-2 text-white shadow-md"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};
