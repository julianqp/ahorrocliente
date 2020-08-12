import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "../inputs/Input";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { value, setValue } = props;

  return (
    <Toolbar className={clsx(classes.root)}>
      <Input value={value} setValue={setValue} />
    </Toolbar>
  );
};

const createData = (id, concepto, cantidad, fecha) => {
  return { id, concepto, cantidad, fecha };
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  cabecera: {
    backgroundColor: "#1e395b", //blue[800],
    color: "white",
  },
});

const TablaFinanzas = ({ columnas, datos }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const datosFiltrados = datos.filter((x) => x.concepto.includes(value));

  const rows = datosFiltrados.map(({ id, concepto, cantidad, fecha }) => {
    return createData(id, concepto, cantidad, fecha);
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <EnhancedTableToolbar value={value} setValue={setValue} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnas.map((column) => (
                <TableCell
                  className={classes.cabecera}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows && rows.length > 0 ? (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columnas.map((column) => {
                        const value = row[column.id];
                        let valor;
                        if (column.format) {
                          valor = column.format(value);
                        } else {
                          valor = value;
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {valor}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <tr>
              <td>
                <div className="w-full bg-white rounded justify-center">
                  <p className="py-4 text-center text-xl">Sin contenido</p>
                </div>
              </td>
            </tr>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TablaFinanzas;
