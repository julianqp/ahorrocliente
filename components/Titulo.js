import React from "react";
import PropTypes from "prop-types";

const Titulo = ({ titulo }) => {
  return <h1 className="text-center text-3xl font-bold uppercase">{titulo}</h1>;
};

export default Titulo;

Titulo.propTypes = {
  titulo: PropTypes.string.isRequired,
};
