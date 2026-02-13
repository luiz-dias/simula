import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Topico } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-topicos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './topicos-list.component.html',
  styleUrl: './topicos-list.component.scss'
})
export class TopicosListComponent {
  topicos: Topico[];
  displayedColumns = ['id', 'nome', 'assunto', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.topicos = this.mockService.getTopicos();
  }
}
