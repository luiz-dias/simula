/** DTO de resposta (como vem do backend). */
export interface MateriaResponseDTO {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface MateriaRequestDTO {
  nome: string;
}

/** Alias para compatibilidade. */
export type Materia = MateriaResponseDTO;
