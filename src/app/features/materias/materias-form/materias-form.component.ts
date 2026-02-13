import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-materias-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './materias-form.component.html',
  styleUrl: './materias-form.component.scss'
})
export class MateriasFormComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: [''],
      descricao: ['']
    });
  }
}
