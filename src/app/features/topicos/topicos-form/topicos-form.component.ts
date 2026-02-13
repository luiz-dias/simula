import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-topicos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './topicos-form.component.html',
  styleUrl: './topicos-form.component.scss'
})
export class TopicosFormComponent {
  assuntos: ReturnType<MockService['getAssuntos']>;
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly mockService: MockService
  ) {
    this.assuntos = this.mockService.getAssuntos();
    this.form = this.formBuilder.group({
      nome: [''],
      assunto: ['']
    });
  }
}
