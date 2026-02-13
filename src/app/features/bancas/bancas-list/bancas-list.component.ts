import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Banca } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-bancas-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './bancas-list.component.html',
  styleUrl: './bancas-list.component.scss'
})
export class BancasListComponent {
  bancas: Banca[];
  displayedColumns = ['id', 'nome', 'sigla', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.bancas = this.mockService.getBancas();
  }
}
