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

/** Item de configuração de questões do simulado (matéria / assunto / tópico + quantidade). */
export interface SimuladoItemRequestDTO {
  materiaId: number;
  assuntoId: number | null;
  topicoId: number | null;
  quantidadeQuestoes: number;
  nivel: 'materia' | 'assunto' | 'topico';
}

/** DTO de entrada (request) para criação e atualização. */
export interface SimuladoRequestDTO {
  titulo: string;
  cargo: string;
  orgao: string;
  ano: number;
  ordemMaterias: string[];
  /** Detalhamento por matéria/assunto/tópico com quantidade de questões (opcional no backend). */
  itens?: SimuladoItemRequestDTO[];
}

/** Alias para compatibilidade. */
export type Simulado = SimuladoResponseDTO;
