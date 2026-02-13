import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-orgaos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './orgaos-form.component.html',
  styleUrl: './orgaos-form.component.scss'
})
export class OrgaosFormComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: [''],
      sigla: ['']
    });
  }
}
