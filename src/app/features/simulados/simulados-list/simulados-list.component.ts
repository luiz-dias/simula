import { Component, OnInit } from '@angular/core';
import { Simulado, SimuladoResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { SimuladosService } from '../services/simulados.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-simulados-list',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './simulados-list.component.html',
  styleUrl: './simulados-list.component.scss'
})
export class SimuladosListComponent implements OnInit {
  simulados: SimuladoResponseDTO[] = [];
  displayedColumns = ['titulo', 'orgao', 'cargo', 'ano', 'acoes'];

  constructor(private readonly simuladosService: SimuladosService, private readonly router: Router  ) {
  } 

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.simuladosService.listar().subscribe((res) => {
      this.simulados = res.content || [];
    });
  }
  deletar(simulado: SimuladoResponseDTO): void {
    if (!confirm(`Excluir o simulado "${simulado.titulo}"?`)) return;
    this.simuladosService.deletar(simulado.id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir simulado', err)
    });
  }
  editar(simulado: SimuladoResponseDTO): void {
    this.router.navigate(['/simulados', simulado.id]);
  }
  novo(): void {
    this.router.navigate(['/simulados/gerar']);
  }
}
