import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
//import PedidoState from "../context/pedidos/PedidoState";
import "../styles/normalize.css";
import "../styles/tailwind.css";

/*
<PedidoState>
        <Component {...pageProps} />
      </PedidoState>
*/

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
