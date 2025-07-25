import api from './api';

export interface Agencia {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  email_principal: string;
  endereco?: string;
  telefone_principal?: string;
}

export type NovaAgencia = Omit<Agencia, 'id'>;

export const fetchAgencias = async (): Promise<Agencia[]> => {
  const response = await api.get('/agencias');
  return response.data;
};

export const createAgencia = async (agencia: NovaAgencia): Promise<Agencia> => {
  const response = await api.post('/agencias', agencia);
  return response.data;
};

export const updateAgencia = async (id: number, agencia: NovaAgencia): Promise<Agencia> => {
  const response = await api.put(`/agencias/${id}`, agencia);
  return response.data;
};

export const deleteAgencia = async (id: number): Promise<void> => {
  await api.delete(`/agencias/${id}`);
};