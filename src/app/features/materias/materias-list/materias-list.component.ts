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
    this.materiaService.listar().subscribe((materias) => {
      this.materias = materias;
    });
  }
}
