import type { User } from "@/interfaces/dataTable.interface";
import type { DataTableDefinitionInterface } from "@/interfaces/dataTableDefinition.interface";

export function getUserTableDefinition(): DataTableDefinitionInterface<User>[] {
  return [
    { key: "id", label: "ID" },
    { key: "usuarioNombre", label: "Nombre" },
    { key: "usuarioApellidoPaterno", label: "Apellido Paterno" },
    { key: "usuarioApellidoMaterno", label: "Apellido Materno" },
    { key: "usuarioEmail", label: "Email" },
    { key: "usuarioTelefono", label: "Teléfono" },
  ];
}
