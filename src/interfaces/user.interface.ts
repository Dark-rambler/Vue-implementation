
export interface User {
  usuarioNombre: string;
  usuarioApellidoPaterno: string;
  usuarioApellidoMaterno: string;
  usuarioEmail: string;
  usuarioTelefono: string;
}
export interface responseUser {
  usuarios: User[];
  success: boolean;
}
