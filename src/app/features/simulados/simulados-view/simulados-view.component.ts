import { Component, OnInit, inject } from '@angular/core';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { SimuladosService } from '../services/simulados.service';
import { Simulado } from '../../../models/entities';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-simulados-view',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './simulados-view.component.html',
  styleUrl: './simulados-view.component.scss'
})
export class SimuladosViewComponent implements OnInit {
  simulado: Simulado | null = null;

      private readonly simuladosService = inject(SimuladosService);
  private readonly route = inject(ActivatedRoute);

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
    const mime =
      formato === 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    this.simuladosService.baixarSimulado(this.simulado.id, formato).subscribe((res) => {
      const blob = new Blob([res], { type: mime });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
}
