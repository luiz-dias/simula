import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materias-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './materias-form.component.html',
  styleUrl: './materias-form.component.scss'
})
export class MateriasFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly materiaService = inject(MateriaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  id: number | null = null;

  form = this.formBuilder.group({
    nome: ['']
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.materiaService.buscarPorId(this.id).subscribe({
        next: (materia) => this.form.patchValue({ nome: materia.nome }),
        error: (err) => console.error('Erro ao carregar matéria', err)
      });
    }
  }

  salvar(): void {
    const nome = this.form.get('nome')?.value?.trim();
    if (!nome) return;

    const request = this.id
      ? this.materiaService.atualizar(this.id, { nome })
      : this.materiaService.criar({ nome });

    request.subscribe({
      next: () => this.router.navigate(['/materias']),
      error: (err) => console.error('Erro ao salvar matéria', err)
    });
  }
}
