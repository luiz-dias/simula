import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { BancasService } from '../services/bancas.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bancas-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './bancas-form.component.html',
  styleUrl: './bancas-form.component.scss'
})
export class BancasFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly bancasService = inject(BancasService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  id: number | null = null;

  form = this.formBuilder.group({
    nome: [''],
    sigla: ['']
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.bancasService.buscarPorId(this.id).subscribe({
        next: (banca) => this.form.patchValue({ nome: banca.nome, sigla: banca.sigla }),
        error: (err) => console.error('Erro ao carregar banca', err)
      });
    }
  } 

  salvar(): void {
    const nome = this.form.get('nome')?.value?.trim();
    const sigla = this.form.get('sigla')?.value?.trim();
    if (!nome || !sigla) return;

    const request = this.id ? this.bancasService.atualizar(this.id, { nome, sigla }) : this.bancasService.criar({ nome, sigla });
    request.subscribe({
      next: () => this.router.navigate(['/bancas']),
      error: (err) => console.error('Erro ao salvar banca', err)
    });
  }
}
