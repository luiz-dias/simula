import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../../../models/entities';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { MateriaService } from '../../materias/services/materia.service';
import { AssuntosService } from '../services/assuntos.service';

@Component({
  selector: 'app-assuntos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './assuntos-form.component.html',
  styleUrl: './assuntos-form.component.scss'
})
export class AssuntosFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly assuntosService = inject(AssuntosService);
  private readonly materiaService = inject(MateriaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  materias: Materia[] = [];
  id: number | null = null;

  form = this.formBuilder.group({
    nome: [''],
    materiaId: [null as number | null]
  });

  ngOnInit(): void {
    this.materiaService.listar().subscribe((materias) => {
      this.materias = materias;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.assuntosService.buscarPorId(this.id).subscribe({
        next: (assunto) => {
          this.form.patchValue({
            nome: assunto.nome,
            materiaId: assunto.materiaId
          });
        },
        error: (err) => console.error('Erro ao carregar assunto', err)
      });
    }
  }

  /** Chamado pelo (ngSubmit) do formulário. */
  salvar(): void {
    const nome = this.form.get('nome')?.value?.trim();
    const materiaId = this.form.get('materiaId')?.value;
    if (!nome || materiaId == null) return;

    const request = this.id
      ? this.assuntosService.atualizar(this.id, { nome, materiaId })
      : this.assuntosService.criar({ nome, materiaId });

    request.subscribe({
      next: () => this.router.navigate(['/assuntos']),
      error: (err) => console.error('Erro ao salvar assunto', err)
    });
  }
}
