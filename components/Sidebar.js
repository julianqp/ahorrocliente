import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import config from "../config/config";
import Copytight from "./Copytight";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="relative bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">Finanzas</p>
      </div>
      <nav className="mt-5 list-none">
        {config.menu.map((opcion) => {
          return (
            <li
              key={opcion.titulo}
              className={
                router.pathname === opcion.enlace ? "bg-blue-800 p-2" : "p-2"
              }
            >
              <Link href="/">
                <a className="text-white block">{opcion.titulo}</a>
              </Link>
            </li>
          );
        })}
      </nav>
      <div className="mb-3 left-0 absolute bottom-0 w-full">
        <Copytight />
      </div>
    </aside>
  );
};

export default Sidebar;
