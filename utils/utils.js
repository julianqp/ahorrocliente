export const formatoFecha = (fecha) => {
  let newFecha;
  if (fecha.includes("-")) {
    newFecha = fecha;
  } else {
    newFecha = parseInt(fecha, 10);
  }
  let date = new Date(newFecha);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fechaForma;
  if (month < 10) {
    fechaForma = `${year}-0${month}-${day < 10 ? `0${day}` : day}`;
    //fechaForma = `${day}-0${month}-${year}`;
  } else {
    fechaForma = `${year}-${month}-${day < 10 ? `0${day}` : day}`;
    //fechaForma = `${day}-${month}-${year}`;
  }

  return fechaForma;
};
