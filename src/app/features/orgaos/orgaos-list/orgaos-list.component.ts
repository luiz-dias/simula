import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Orgao, OrgaoResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { OrgaosService } from '../services/orgaos.service';

@Component({
  selector: 'app-orgaos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './orgaos-list.component.html',
  styleUrl: './orgaos-list.component.scss'
})
export class OrgaosListComponent {
  orgaos: OrgaoResponseDTO[] = [];
  displayedColumns = ['id', 'nome', 'sigla', 'acoes'];

  constructor(private readonly orgaosService: OrgaosService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.orgaosService.listar().subscribe((orgaos) => {
      this.orgaos = orgaos;
    });
  }

  deletar(orgao: OrgaoResponseDTO): void {
    if (!confirm(`Excluir o órgão "${orgao.nome}"?`)) return;
    this.orgaosService.deletar(orgao.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir órgão', err)
    });
  } 
}
