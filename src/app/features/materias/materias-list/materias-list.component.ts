import { Component, OnInit } from '@angular/core';
import { MateriaResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materias-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './materias-list.component.html',
  styleUrl: './materias-list.component.scss'
})
export class MateriasListComponent implements OnInit {
  materias: MateriaResponseDTO[] = [];
  displayedColumns = ['id', 'nome', 'acoes'];

  constructor(private readonly materiaService: MateriaService) {}

  ngOnInit(): void {
    this.carregar();
  }



  carregar(): void { 
    this.materiaService.listar().subscribe((materias) => {
      this.materias = materias;
    });
  }

  deletar(materia: MateriaResponseDTO): void {
    if (!confirm(`Excluir a matéria "${materia.nome}"?`)) return;
    this.materiaService.deletar(materia.id).subscribe({
      next: () => this.carregar(),
      error: (err) => {
        console.log('Status:', err.status);
        console.log('Body:', err.error);
        if (err.status === 409) {
          const msg = 'Esta matéria possui assuntos vinculados. Deseja excluir mesmo assim? ' +
            'Serão excluídos também os assuntos, tópicos e questões vinculados.';
          if (!confirm(msg)) return;
          this.materiaService.deletar(materia.id).subscribe({
            next: () => this.carregar(),
            error: (e) => console.error('Erro ao excluir matéria', e)
          });
        } else {
          console.error('Erro ao excluir matéria', err);
        }
      }
    });
  }

}

