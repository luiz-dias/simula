/** DTO de resposta (como vem do backend). */
export interface OrgaoResponseDTO {
  id: number;
  nome: string;
  sigla: string;
  createdAt?: string;
  updatedAt?: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface OrgaoRequestDTO {
  nome: string;
  sigla: string;
}

/** Alias para compatibilidade. */
export type Orgao = OrgaoResponseDTO;
