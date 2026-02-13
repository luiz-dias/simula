import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-assuntos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './assuntos-form.component.html',
  styleUrl: './assuntos-form.component.scss'
})
export class AssuntosFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly mockService = inject(MockService);

  materias: ReturnType<MockService['getMaterias']>;

  form = this.formBuilder.group({
    nome: [''],
    materia: ['']
  });

  constructor() {
    this.materias = this.mockService.getMaterias();
  }
}
