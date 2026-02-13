import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Assunto } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-assuntos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './assuntos-list.component.html',
  styleUrl: './assuntos-list.component.scss'
})
export class AssuntosListComponent {
  assuntos: Assunto[];
  displayedColumns = ['id', 'nome', 'materia', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.assuntos = this.mockService.getAssuntos();
  }
}
