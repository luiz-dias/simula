import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { Questao, QuestaoResponseDTO, QuestaoRequestDTO } from '../../../models/entities';
import { QuestoesService } from '../services/questoes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questoes-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './questoes-list.component.html',
  styleUrl: './questoes-list.component.scss'
})
export class QuestoesListComponent implements OnInit {
  questoes: QuestaoResponseDTO[] = [];
  displayedColumns = ['id', 'materia', 'assunto', 'banca', 'ano', 'acoes'];

 

  constructor(
    private readonly questoesService: QuestoesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    this.carregar();
  }
  carregar(): void {
    this.questoesService.listar().subscribe((res) => {
      this.questoes = res.content;
    });
  }



  deletar(questao: QuestaoResponseDTO): void {
    if (!confirm(`Excluir a questão "${questao.enunciado}"?`)) return;
    this.questoesService.deletar(questao.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir questão', err)
    });
  }
  editar(questao: QuestaoResponseDTO): void {
    this.router.navigate(['/questoes', questao.id]);
  }
  novo(): void {
    this.router.navigate(['/questoes/novo']);
  } 
}
