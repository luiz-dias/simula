import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-questoes-view',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './questoes-view.component.html',
  styleUrl: './questoes-view.component.scss'
})
export class QuestoesViewComponent {
  questao: ReturnType<MockService['getQuestoes']>[number];

  constructor(private readonly mockService: MockService) {
    this.questao = this.mockService.getQuestoes()[0];
  }
}
