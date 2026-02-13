import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Simulado } from '../../../models/entities';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-simulados-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './simulados-list.component.html',
  styleUrl: './simulados-list.component.scss'
})
export class SimuladosListComponent {
  simulados: Simulado[];
  displayedColumns = ['titulo', 'orgao', 'cargo', 'ano', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.simulados = this.mockService.getSimulados();
  }
}
