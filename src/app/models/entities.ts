export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Questao {
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
}

export interface Materia {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assunto {
  id: number;
  nome: string;
  materiaId: number;
  materia: Materia;
  createdAt: string;
  updatedAt: string;
}

export interface Topico {
  id: number;
  nome: string;
  assunto: string;
}

export interface Orgao {
  id: number;
  nome: string;
  sigla: string;
}

export interface Banca {
  id: number;
  nome: string;
  sigla: string;
}

export interface Cargo {
  id: number;
  nome: string;
  orgao: string;
}

export interface Simulado {
  id: number;
  titulo: string;
  cargo: string;
  orgao: string;
  ano: number;
  dataCriacao: string;
  ordemMaterias: string[];
  totalQuestoes: number;
}
