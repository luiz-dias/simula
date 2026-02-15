import { Component } from '@angular/core';
import { TopicoResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { TopicosService } from '../services/topicos.service';

@Component({
  selector: 'app-topicos-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './topicos-list.component.html',
  styleUrl: './topicos-list.component.scss'
})
export class TopicosListComponent {

  topicos: TopicoResponseDTO[] = [];
  displayedColumns = ['id', 'nome', 'assunto', 'acoes'];

  constructor(private readonly topicosService: TopicosService) {}

  ngOnInit(): void {
    this.carregar();
  }
  carregar(): void {
    this.topicosService.listar().subscribe((topicos) => {
      this.topicos = topicos;
    });
  }

  deletar(topico: TopicoResponseDTO): void {
    if (!confirm(`Excluir o topico "${topico.nome}"?`)) return;
    this.topicosService.deletar(topico.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir topico', err)
    });
  }
}
