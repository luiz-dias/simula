import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-bancas-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './bancas-form.component.html',
  styleUrl: './bancas-form.component.scss'
})
export class BancasFormComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: [''],
      sigla: ['']
    });
  }
}
