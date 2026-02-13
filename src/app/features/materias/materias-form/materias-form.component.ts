import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { MateriasApiService } from '../services/materias-api.service';

@Component({
  selector: 'app-materias-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './materias-form.component.html',
  styleUrl: './materias-form.component.scss'
})
export class MateriasFormComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly materiasApi: MateriasApiService,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.group({
      nome: ['']
    });
  }

  salvar(): void {
    const nome = this.form.get('nome')?.value?.trim();
    if (!nome) return;
    this.materiasApi.criar({ nome }).subscribe({
      next: () => this.router.navigate(['/materias']),
      error: (err) => console.error('Erro ao criar matéria', err)
    });
  }
}
