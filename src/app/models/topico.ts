import { Assunto } from './assunto';
/** DTO de resposta (como vem do backend). */
export interface TopicoResponseDTO {
  id: number;
  nome: string;
  assuntoId?: number;
  /** Nome do assunto (string) ou objeto aninhado. */
  assunto?: Assunto;
  createdAt?: string;
  updatedAt?: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface TopicoRequestDTO {
  nome: string;
  assuntoId: number;
}

/** Alias para compatibilidade. */
export type Topico = TopicoResponseDTO;
