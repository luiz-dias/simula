import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../shared/ui';
import { QuestoesService } from '../questoes/services/questoes.service';
import { SimuladosService } from '../simulados/services/simulados.service';
import { BancasService } from '../bancas/services/bancas.service';
import { MateriaService } from '../materias/services/materia.service';
import { MateriaResponseDTO, Questao } from '../../models/entities';
import { DashboardStats } from '../../models/dashboard-stats';

@Component({
  selector: 'app-visao-completa',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './visao-completa.component.html',
  styleUrl: './visao-completa.component.scss'
})
export class VisaoCompletaComponent implements OnInit {
  private readonly questoesService = inject(QuestoesService);
  private readonly simuladosService = inject(SimuladosService);
  private readonly bancasService = inject(BancasService);
  private readonly materiaService = inject(MateriaService);

  stats: DashboardStats = {
    totalQuestoes: 0,
    totalSimulados: 0,
    totalBancas: 0,
    totalMaterias: 0
  };

  materias: MateriaResponseDTO[] = [];
  questoes: Questao[] = [];

  colunasDistribuicao = ['materia', 'quantidade'];
  distribuicao: { materia: string; quantidade: number }[] = [];

  ngOnInit(): void {
    forkJoin({
      questoes: this.questoesService.listar(0, 1),
      simulados: this.simuladosService.listar(0, 1),
      bancas: this.bancasService.listar(0, 1),
      materias: this.materiaService.listarPagina(0, 1)
    }).subscribe({
      next: (r) => {
        this.stats = {
          totalQuestoes: r.questoes.totalElements,
          totalSimulados: r.simulados.totalElements,
          totalBancas: r.bancas.totalElements,
          totalMaterias: r.materias.totalElements
        };
      },
      error: (err) => console.error('Erro ao carregar totais da visão completa', err)
    });

    forkJoin({
      materias: this.materiaService.listar(),
      questoesPage: this.questoesService.listar(0, 2000)
    }).subscribe({
      next: ({ materias, questoesPage }) => {
        this.materias = materias;
        this.questoes = questoesPage.content;
        this.distribuicao = materias.map((materia) => ({
          materia: materia.nome,
          quantidade: this.questoes.filter((q) => this.nomeMateriaQuestao(q) === materia.nome).length
        }));
      },
      error: (err) => console.error('Erro ao carregar distribuição por matéria', err)
    });
  }

  private nomeMateriaQuestao(q: Questao): string {
    const m = q.materia as unknown;
    if (typeof m === 'string') return m;
    if (m && typeof m === 'object' && 'nome' in m && typeof (m as { nome: unknown }).nome === 'string') {
      return (m as { nome: string }).nome;
    }
    return '';
  }
}
