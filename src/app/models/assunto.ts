import { Materia } from './materia';
// ** deixar como vem do backend
export interface AssuntoResponseDTO {
  id: number;
  nome: string;
  materiaId: number;
  materia?: Materia;
  createdAt: string;
  updatedAt: string;
}

/** DTO genérico de entrada (request). */
export interface AssuntoRequestDTO {
  nome: string;
  materiaId: number;
}

/** Alias para compatibilidade: entidade assunto = response DTO. */
export type Assunto = AssuntoResponseDTO;
