import { Component } from '@angular/core';
import { AssuntoResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { AssuntosService } from '../services/assuntos.service';

@Component({
  selector: 'app-assuntos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './assuntos-list.component.html',
  styleUrl: './assuntos-list.component.scss'
})
export class AssuntosListComponent {
  assuntos: AssuntoResponseDTO[] = [];
  displayedColumns = ['id', 'nome', 'materia', 'acoes'];

  constructor(private readonly assuntosService: AssuntosService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.assuntosService.listar().subscribe((assuntos) => {
      this.assuntos = assuntos;
    });
  }

  deletar(assunto: AssuntoResponseDTO): void {
    if (!confirm(`Excluir o assunto "${assunto.nome}"?`)) return;
    this.assuntosService.deletar(assunto.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir assunto', err)
    });
  }
}
