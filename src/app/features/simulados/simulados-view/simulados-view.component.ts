import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-simulados-view',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './simulados-view.component.html',
  styleUrl: './simulados-view.component.scss'
})
export class SimuladosViewComponent {
  simulado: ReturnType<MockService['getSimulados']>[number];

  constructor(private readonly mockService: MockService) {
    this.simulado = this.mockService.getSimulados()[0];
  }
}
