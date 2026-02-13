import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Materia } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-materias-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './materias-list.component.html',
  styleUrl: './materias-list.component.scss'
})
export class MateriasListComponent {
  materias: Materia[];
  displayedColumns = ['id', 'nome', 'descricao', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.materias = this.mockService.getMaterias();
  }
}
