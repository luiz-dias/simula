/** DTO de resposta (como vem do backend). */
export interface SimuladoResponseDTO {
  id: number;
  titulo: string;
  cargo: string;
  orgao: string;
  ano: number;
  dataCriacao: string;
  ordemMaterias: string[];
  totalQuestoes: number;
  createdAt?: string;
  updatedAt?: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface SimuladoRequestDTO {
  titulo: string;
  cargo: string;
  orgao: string;
  ano: number;
  ordemMaterias: string[];
}

/** Alias para compatibilidade. */
export type Simulado = SimuladoResponseDTO;
