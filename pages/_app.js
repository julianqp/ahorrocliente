import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
//import PedidoState from "../context/pedidos/PedidoState";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme/theme";
import "../styles/normalize.css";
import "../styles/tailwind.css";

/*
<PedidoState>
        <Component {...pageProps} />
      </PedidoState>
*/

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
