import Head from "next/head";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { OBTENER_FINANZAS } from "../querys/query";
import { useQuery } from "@apollo/client";
import Finanza from "../components/Finanza";
import TablaFinanzas from "../components/Tablas/finanzas/TablaFinanzas";

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
            <TablaFinanzas datos={ingresos} />
          </div>
        </div>
        <div className="mt-2 ">
          <p className="text-2xl font-bold">Gastos</p>
          <p>Total: {gasto} €</p>
          <div className="mt-5">
            <TablaFinanzas datos={gastos} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
