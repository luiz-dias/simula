import { Component, OnInit } from '@angular/core';
import { MateriasApiService } from '../services/materias-api.service';
import { Materia } from '../../../models/entities';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-materias-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './materias-list.component.html',
  styleUrl: './materias-list.component.scss'
})
export class MateriasListComponent implements OnInit {
  materias: Materia[] = [];
  displayedColumns = ['id', 'nome', 'acoes'];

  constructor(private readonly materiasApi: MateriasApiService) {}

  ngOnInit(): void {
    this.materiasApi.listar().subscribe((res) => {
      this.materias = res.content;
    });
  }
}
