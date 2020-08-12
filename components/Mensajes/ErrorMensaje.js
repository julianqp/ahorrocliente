import React from "react";

const ErrorMensaje = ({ mensaje }) => {
  return (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">Error:</p>
      <p>{mensaje}</p>
    </div>
  );
};

export default ErrorMensaje;
