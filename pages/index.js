import Head from "next/head";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { OBTENER_FINANZAS } from "../querys/query";
import { useQuery } from "@apollo/client";
import Finanza from "../components/Finanza";
import TablaFinanzas from "../components/Tablas/TablaFinanzas";

const columnas = [
  { id: "concepto", label: "Concepto", minWidth: 170 },
  { id: "cantidad", label: "Cantidad", minWidth: 50 },
  {
    id: "fecha",
    label: "Fecha",
    minWidth: 50,
    align: "right",
    format: (value) => {
      let newDate = new Date(parseInt(value, 10));
      newDate = newDate.toLocaleDateString();
      return newDate;
    },
  },
  {
    id: "eliminar",
    label: "Eliminar",
    maxWidth: 50,
    align: "center",
    format: () => (
      <button
        type="button"
        className="flex justify-center items-center bg-red-800 py-2 px-2 w-full text-white rounded text-xs uppercase font-bold"
        // onClick={() => confirmarELiminarClinete()}
      >
        Eliminar
        <svg fill="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    ),
  },
  {
    id: "editar",
    label: "Editar",
    minWidth: 50,
    align: "center",
    format: () => (
      <button
        type="button"
        className="flex justify-center items-center bg-orange-600 py-2 px-2 w-full text-white rounded text-xs uppercase font-bold"
        // onClick={() => confirmarEditarClinete()}
      >
        Editar
        <svg fill="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 20 20">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    ),
  },
];

export default function Home() {
  const { data, loading, error } = useQuery(OBTENER_FINANZAS);

  const router = useRouter();

  if (loading) {
    return "Cargando...";
  }

  if (!loading && !data) {
    router.push("/login");
  }

  const ingresos = [];
  let gasto = 0;
  let ingreso = 0;
  const gastos = [];
  data.obtenerFinanzasUsuario.forEach((x) => {
    if (x.tipo === "GASTO") {
      gasto += x.cantidad;
      gastos.push(x);
    } else if (x.tipo === "INGRESO") {
      ingreso += x.cantidad;
      ingresos.push(x);
    }
  });
  gasto = Math.round(gasto * 100) / 100;
  ingreso = Math.round(ingreso * 100) / 100;

  return (
    <div>
      <Layout>
        <div>
          <Link href="nuevafinanza/">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
              Nueva finanza
            </a>
          </Link>
        </div>
        <div className="mt-2 overflow-x-auto">
          <p className="text-2xl font-bold">Ingresos</p>
          <p>Total: {ingreso} €</p>
          <div className="mt-5">
            <TablaFinanzas columnas={columnas} datos={ingresos} />
          </div>
        </div>
        <div className="mt-2 ">
          <p className="text-2xl font-bold">Gastos</p>
          <p>Total: {gasto} €</p>
          <div className="mt-5">
            <TablaFinanzas columnas={columnas} datos={gastos} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
