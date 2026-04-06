import { Component, OnInit } from '@angular/core';
import { Banca } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { BancasService } from '../services/bancas.service';

@Component({
  selector: 'app-bancas-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './bancas-list.component.html',
  styleUrl: './bancas-list.component.scss'
})
export class BancasListComponent implements OnInit{
  bancas: Banca[] = [];
  displayedColumns = ['id', 'nome', 'sigla', 'acoes'];

  constructor(private readonly bancasService: BancasService) {}
  
  ngOnInit(): void {
    this.carregar();
  }

  
  carregar(): void {
    this.bancasService.listar(0, 500).subscribe((page) => {
      this.bancas = page.content ?? [];
    });
  }

deletar(banca: Banca): void {
  if (!confirm(`Excluir a banca "${banca.nome}"?`)) return;
  this.bancasService.deletar(banca.id,  false).subscribe({
    next: () => this.carregar(),
    error: (err) => {
      console.log('Status:', err.status);
      console.log('Body:', err.error);
      if (err.status === 409) {
        const msg = 'Esta banca possui assuntos vinculados. Deseja excluir mesmo assim? ' +
          'Serão excluídos também os cargos,assuntos, tópicos e questões vinculados.';
        if (!confirm(msg)) return;
        this.bancasService.deletar(banca.id, true).subscribe({
          next: () => this.carregar(),
          error: (e) => console.error('Erro ao excluir banca', e)
        });
      } else {
        console.error('Erro ao excluir banca', err);
      }
    }
  });
}
}
