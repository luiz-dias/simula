/** DTO de resposta (como vem do backend). */
export interface QuestaoResponseDTO {
  id: number;
  enunciado: string;
  alternativaA: string;
  alternativaB: string;
  alternativaC: string;
  alternativaD: string;
  alternativaE: string;
  respostaCorreta: string;
  materia: string;
  assunto: string;
  topico: string;
  orgao: string;
  banca: string;
  cargo: string;
  ano: number;
  createdAt?: string;
  updatedAt?: string;
}

/** DTO de entrada (request) para criação e atualização. */
export interface QuestaoRequestDTO {
  enunciado: string;
  alternativaA: string;
  alternativaB: string;
  alternativaC: string;
  alternativaD: string;
  alternativaE: string;
  respostaCorreta: string;
  materia: string;
  assunto: string;
  topico: string;
  orgao: string;
  banca: string;
  cargo: string;
  ano: number;
}

/** Alias para compatibilidade. */
export type Questao = QuestaoResponseDTO;
