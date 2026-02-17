/** DTO de resposta (tipo de questão - tabela tipo). */
export interface TipoResponseDTO {
  id: number;
  nome: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Alias para compatibilidade. */
export type Tipo = TipoResponseDTO;
