import React from "react";

const mostrarMensaje = ({ mensaje }) => {
  return (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{mensaje}</p>
    </div>
  );
};

export default mostrarMensaje;
