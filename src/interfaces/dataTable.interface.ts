// export interface DataTableInterface {
//   id: number;
//   name: string;
//   email?: string;
//   phone: string;
//   website: string;
// }

export interface base {
  index?: number;
}
export interface User extends base {
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
