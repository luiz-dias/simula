import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-cargos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './cargos-form.component.html',
  styleUrl: './cargos-form.component.scss'
})
export class CargosFormComponent {
  orgaos: ReturnType<MockService['getOrgaos']>;
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly mockService: MockService
  ) {
    this.orgaos = this.mockService.getOrgaos();
    this.form = this.formBuilder.group({
      nome: [''],
      orgao: ['']
    });
  }
}
