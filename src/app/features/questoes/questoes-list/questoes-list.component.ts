import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { Questao } from '../../../models/entities';

@Component({
  selector: 'app-questoes-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './questoes-list.component.html',
  styleUrl: './questoes-list.component.scss'
})
export class QuestoesListComponent {
  questoes: Questao[];
  displayedColumns = ['id', 'materia', 'assunto', 'banca', 'ano', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.questoes = this.mockService.getQuestoes();
  }
}
