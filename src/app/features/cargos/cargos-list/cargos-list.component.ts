import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Cargo } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-cargos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './cargos-list.component.html',
  styleUrl: './cargos-list.component.scss'
})
export class CargosListComponent {
  cargos: Cargo[];
  displayedColumns = ['id', 'nome', 'orgao', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.cargos = this.mockService.getCargos();
  }
}
