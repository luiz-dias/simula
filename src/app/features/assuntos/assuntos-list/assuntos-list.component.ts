import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { Assunto } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { AssuntosService } from '../services/assuntos.service';

@Component({
  selector: 'app-assuntos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './assuntos-list.component.html',
  styleUrl: './assuntos-list.component.scss'
})
export class AssuntosListComponent {
  assuntos: Assunto[] = [];
  displayedColumns = ['id', 'nome', 'materia', 'acoes'];

  constructor(private readonly assuntosService: AssuntosService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.assuntosService.listar().subscribe((res) => {
      this.assuntos = res.content;
    });
  }

  deletar(assunto: Assunto): void {
    if (!confirm(`Excluir o assunto "${assunto.nome}"?`)) return;
    this.assuntosService.excluir(assunto.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir assunto', err)
    });
  }
}
