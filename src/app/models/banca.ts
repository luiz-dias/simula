/** DTO de resposta (como vem do backend). */
export interface BancaResponseDTO {
  id: number;
  nome: string;
  sigla: string;
  createdAt?: string;
  updatedAt?: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface BancaRequestDTO {
  nome: string;
  sigla: string;
}

/** Alias para compatibilidade. */
export type Banca = BancaResponseDTO;
