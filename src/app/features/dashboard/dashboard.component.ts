import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../shared/ui';
import { QuestoesService } from '../questoes/services/questoes.service';
import { SimuladosService } from '../simulados/services/simulados.service';
import { BancasService } from '../bancas/services/bancas.service';
import { MateriaService } from '../materias/services/materia.service';
import { DashboardStats } from '../../models/dashboard-stats';

@Component({
  selector: 'app-dashboard',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
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
      error: (err) => console.error('Erro ao carregar totais do dashboard', err)
    });
  }
}
