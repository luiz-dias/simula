import { Component } from '@angular/core';
import { MockService } from '../../data/mock.service';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../shared/ui';

@Component({
  selector: 'app-visao-completa',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './visao-completa.component.html',
  styleUrl: './visao-completa.component.scss'
})
export class VisaoCompletaComponent {
  stats: ReturnType<MockService['getDashboardStats']>;
  materias: ReturnType<MockService['getMaterias']>;
  questoes: ReturnType<MockService['getQuestoes']>;

  colunasDistribuicao = ['materia', 'quantidade'];
  distribuicao: { materia: string; quantidade: number }[];

  constructor(private readonly mockService: MockService) {
    this.stats = this.mockService.getDashboardStats();
    this.materias = this.mockService.getMaterias();
    this.questoes = this.mockService.getQuestoes();
    this.distribuicao = this.materias.map((materia) => ({
      materia: materia.nome,
      quantidade: this.questoes.filter((q) => q.materia === materia.nome).length
    }));
  }
}
