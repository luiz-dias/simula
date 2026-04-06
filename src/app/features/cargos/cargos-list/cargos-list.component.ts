import { Component, OnInit } from '@angular/core';
import { CargoResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { CargosService } from '../services/cargos.service';

@Component({
  selector: 'app-cargos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './cargos-list.component.html',
  styleUrl: './cargos-list.component.scss'
})
export class CargosListComponent implements OnInit {
  cargos: CargoResponseDTO[] = [];
  displayedColumns = ['id', 'nome', 'orgao', 'acoes'];

  constructor(private readonly cargosService: CargosService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.cargosService.listar(0, 500).subscribe((page) => {
      this.cargos = page.content ?? [];
    });
  }

  deletar(cargo: CargoResponseDTO): void {
    if (!confirm(`Excluir o cargo "${cargo.nome}"?`)) return;
    this.cargosService.deletar(cargo.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir cargo', err)
    });
  }
}
