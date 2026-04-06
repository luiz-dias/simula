import { Orgao } from './orgao';
import { Cargo } from './cargo';

/** DTO de resposta (como vem do backend — órgão e cargo aninhados). */
export interface SimuladoResponseDTO {
  id: number;
  titulo: string;
  cargo: Cargo;
  orgao: Orgao;
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
  /** Nome usado por parte do backend para validação/persistência. */
  quantidade?: number;
  /** Nome legado/alternativo que alguns fluxos ainda usam. */
  quantidadeQuestoes: number;
  nivel: 'materia' | 'assunto' | 'topico';
}

/** DTO de entrada (request) para criação e atualização. */
export interface SimuladoRequestDTO {
  titulo: string;
  ano: number;
  /** IDs das matérias na ordem (Long[] no backend). */
  ordemMaterias: number[];
  itens?: SimuladoItemRequestDTO[];
  /** Nome do campo no backend (Bean Validation); espelha `itens` quando a API exige este nome. */
  configuracaoMaterias?: SimuladoItemRequestDTO[];
  /** FK — necessário para persistir vínculo com Cargo/Órgão no JPA. */
  orgaoId?: number | null;
  cargoId?: number | null;
  /** Texto auxiliar (sigla / nome), se o backend ainda usar para exibição ou legado. */
  orgao?: string;
  cargo?: string;
}

/** Alias para compatibilidade. */
export type Simulado = SimuladoResponseDTO;
