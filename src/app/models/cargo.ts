/** DTO de resposta (como vem do backend). */
export interface CargoResponseDTO {
  id: number;
  nome: string;
  orgaoId?: number;
  /** Nome/sigla do órgão (string) ou objeto aninhado. */
  orgao?: string | { id: number; nome: string; sigla: string };
  createdAt?: string;
  updatedAt?: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface CargoRequestDTO {
  nome: string;
  orgaoId: number;
}

/** Alias para compatibilidade. */
export type Cargo = CargoResponseDTO;
