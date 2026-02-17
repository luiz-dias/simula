
import { Materia, Topico, Orgao, Banca, Cargo } from './entities';
import { Assunto ,AssuntoResponseDTO } from './assunto';
import { TopicoResponseDTO } from './topico';
import { OrgaoResponseDTO } from './orgao';
import { BancaResponseDTO } from './banca';
import { CargoResponseDTO } from './cargo';

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
  materia: Materia; 
  assunto: Assunto;
  topico: Topico;
  orgao: Orgao;
  banca: Banca;
  cargo: Cargo;
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
