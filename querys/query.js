import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellidos
      email
      saldo
      creado
    }
  }
`;

export const CREAR_NUEVO_USUARIO = gql`
  mutation nuevoUsuario($input: UsuarioInput!) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellidos
      email
      saldo
      creado
    }
  }
`;

export const CREAR_NUEVA_FINANZA = gql`
  mutation nuevaFinanza($input: FinanzaInput!) {
    nuevaFinanza(input: $input) {
      id
      concepto
      cantidad
      tipo
      etiqueta
      usuario
      fecha
      creado
    }
  }
`;

export const OBTENER_FINANZAS = gql`
  query obtenerFinanzasUsuario {
    obtenerFinanzasUsuario {
      id
      concepto
      cantidad
      tipo
      etiqueta
      usuario
      fecha
      creado
    }
  }
`;

export const OBTENER_FINANZA = gql`
  query obtenerFianza($id: ID!) {
    obtenerFianza(id: $id) {
      id
      concepto
      cantidad
      tipo
      etiqueta
      usuario
      fecha
      creado
    }
  }
`;

export const EDITAR_FINANZA = gql`
  mutation editarFinanza($id: ID!, $input: FinanzaInput!) {
    editarFinanza(id: $id, input: $input) {
      id
    }
  }
`;

export const ELIMINAR_FINANZA = gql`
  mutation eliminarFinanza($id: ID!) {
    eliminarFinanza(id: $id)
  }
`;
