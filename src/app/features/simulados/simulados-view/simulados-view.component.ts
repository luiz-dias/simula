import { Component } from '@angular/core';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { SimuladosService } from '../services/simulados.service';
import { OnInit } from '@angular/core';
import { Simulado } from '../../../models/entities';

@Component({
  selector: 'app-simulados-view',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './simulados-view.component.html',
  styleUrl: './simulados-view.component.scss'
})
export class SimuladosViewComponent implements OnInit {
  simulado: Simulado | null = null;

  constructor(private readonly simuladosService: SimuladosService) {
  }

  ngOnInit(): void {
    this.carregar();
  } 
  carregar(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    const id = Number(idParam);
    this.simuladosService.buscarPorId(id).subscribe((res) => {
      this.simulado = res;
    });
  } 
  baixarSimulado(formato: 'pdf' | 'docx'): void {
    if (!this.simulado) return;
    this.simuladosService.baixarSimulado(this.simulado.id).subscribe((res) => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); 
    });
  }
  
}
