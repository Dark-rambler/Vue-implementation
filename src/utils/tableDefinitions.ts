import type { User } from "@/interfaces/user.interface";
import type { DataTableDefinitionInterface } from "@/interfaces/dataTableDefinition.interface";

export function getUserTableDefinition(): DataTableDefinitionInterface<User>[] {
  return [
    {
      key:
        "usuarioNombre",
      label: "Nombre"
    },
    {
      key: "usuarioApellidoPaterno",
      label: "Apellido Paterno"
    },
    {
      key: "usuarioApellidoMaterno",
      label: "Apellido Materno"
    },
    {
      key: "usuarioEmail",
      label: "Teléfono"
    },
    {
      key: "usuarioTelefono",
      label: "Email"
    },
  ];
}
