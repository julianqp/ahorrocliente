import React from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Typography className="text-white p-0 m-0" variant="body2" align="center">
      {"Copyright © "}
      Finanzas {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
