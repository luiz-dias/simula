import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Orgao } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-orgaos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './orgaos-list.component.html',
  styleUrl: './orgaos-list.component.scss'
})
export class OrgaosListComponent {
  orgaos: Orgao[];
  displayedColumns = ['id', 'nome', 'sigla', 'acoes'];

  constructor(private readonly mockService: MockService) {
    this.orgaos = this.mockService.getOrgaos();
  }
}
