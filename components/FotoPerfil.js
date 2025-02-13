import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    alignItems: "center",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const FotoPerfil = ({ usuario }) => {
  const classes = useStyles();
  const { nombre, apellidos, saldo } = usuario;

  return (
    <div className={classes.root}>
      <Avatar
        alt="Isabel Alcantara"
        src="/avatar.png"
        className={classes.large}
      />
      <div>
        <div>
          <p className="text-white">{nombre}</p>
          <p className="text-white">{apellidos}</p>
        </div>
        <p className="text-white">Total: {saldo} €</p>
      </div>
    </div>
  );
};

export default FotoPerfil;
