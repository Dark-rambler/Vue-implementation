import axios, {  AxiosError, type AxiosResponse } from 'axios';

/**
 * Función reutilizable para realizar una petición GET con Axios.
 * @param url - La URL a la que se realizará la petición.
 * @param params - Parámetros de la petición (opcional).
 * @returns Una promesa que resuelve con los datos de la respuesta.
 */
export function getRequest<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  return axios
    .get<T>(url, { params })
    .then((response: AxiosResponse<T>) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.error('Error en la petición GET:', error.message);
      throw error;
    });
}
