import { Injectable } from '@angular/core';
import {
  Assunto,
  Banca,
  Cargo,
  Materia,
  Orgao,
  Questao,
  Simulado,
  Topico
} from '../models/entities';

@Injectable({ providedIn: 'root' })
export class MockService {
  private readonly materias: Materia[] = [
    { id: 1, nome: 'Direito Constitucional', descricao: 'Princípios e direitos' },
    { id: 2, nome: 'Direito Administrativo', descricao: 'Administração pública' },
    { id: 3, nome: 'Português', descricao: 'Gramática e interpretação' }
  ];

  private readonly assuntos: Assunto[] = [
    { id: 1, nome: 'Controle de Constitucionalidade', materia: 'Direito Constitucional' },
    { id: 2, nome: 'Atos Administrativos', materia: 'Direito Administrativo' },
    { id: 3, nome: 'Interpretação de Texto', materia: 'Português' }
  ];

  private readonly topicos: Topico[] = [
    { id: 1, nome: 'ADI e ADC', assunto: 'Controle de Constitucionalidade' },
    { id: 2, nome: 'Anulação e Revogação', assunto: 'Atos Administrativos' },
    { id: 3, nome: 'Coesão e Coerência', assunto: 'Interpretação de Texto' }
  ];

  private readonly orgaos: Orgao[] = [
    { id: 1, nome: 'Tribunal de Contas da União', sigla: 'TCU' },
    { id: 2, nome: 'Banco Central do Brasil', sigla: 'BACEN' }
  ];

  private readonly bancas: Banca[] = [
    { id: 1, nome: 'Cebraspe', sigla: 'CEB' },
    { id: 2, nome: 'FGV', sigla: 'FGV' }
  ];

  private readonly cargos: Cargo[] = [
    { id: 1, nome: 'Analista', orgao: 'TCU' },
    { id: 2, nome: 'Técnico', orgao: 'BACEN' }
  ];

  private readonly questoes: Questao[] = [
    {
      id: 1,
      enunciado: 'Sobre controle concentrado, é correto afirmar que...',
      alternativaA: 'Somente o Presidente pode propor.',
      alternativaB: 'ADI e ADC são ajuizadas no STF.',
      alternativaC: 'Cabe ao STJ julgar ADI.',
      alternativaD: 'Não há efeito vinculante.',
      alternativaE: 'Somente partidos podem propor.',
      respostaCorreta: 'B',
      materia: 'Direito Constitucional',
      assunto: 'Controle de Constitucionalidade',
      topico: 'ADI e ADC',
      orgao: 'TCU',
      banca: 'Cebraspe',
      cargo: 'Analista',
      ano: 2024
    },
    {
      id: 2,
      enunciado: 'A anulação do ato administrativo ocorre quando...',
      alternativaA: 'Há conveniência e oportunidade.',
      alternativaB: 'Há vício de legalidade.',
      alternativaC: 'Há decadência do prazo.',
      alternativaD: 'Há delegação de competência.',
      alternativaE: 'Há vacância do cargo.',
      respostaCorreta: 'B',
      materia: 'Direito Administrativo',
      assunto: 'Atos Administrativos',
      topico: 'Anulação e Revogação',
      orgao: 'BACEN',
      banca: 'FGV',
      cargo: 'Técnico',
      ano: 2023
    }
  ];

  private readonly simulados: Simulado[] = [
    {
      id: 1,
      titulo: 'Simulado TCU - Constitucional',
      cargo: 'Analista',
      orgao: 'TCU',
      ano: 2024,
      dataCriacao: '2025-11-20',
      ordemMaterias: ['Direito Constitucional', 'Português'],
      totalQuestoes: 20
    },
    {
      id: 2,
      titulo: 'Simulado BACEN - Administrativo',
      cargo: 'Técnico',
      orgao: 'BACEN',
      ano: 2023,
      dataCriacao: '2025-10-05',
      ordemMaterias: ['Direito Administrativo', 'Português'],
      totalQuestoes: 15
    }
  ];

  getDashboardStats() {
    return {
      totalQuestoes: this.questoes.length,
      totalSimulados: this.simulados.length,
      totalBancas: this.bancas.length,
      totalMaterias: this.materias.length
    };
  }

  getMaterias() {
    return this.materias;
  }

  getAssuntos() {
    return this.assuntos;
  }

  getTopicos() {
    return this.topicos;
  }

  getOrgaos() {
    return this.orgaos;
  }

  getBancas() {
    return this.bancas;
  }

  getCargos() {
    return this.cargos;
  }

  getQuestoes() {
    return this.questoes;
  }

  getSimulados() {
    return this.simulados;
  }
}
