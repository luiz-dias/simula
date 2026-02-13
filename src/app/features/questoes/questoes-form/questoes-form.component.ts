import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-questoes-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './questoes-form.component.html',
  styleUrl: './questoes-form.component.scss'
})
export class QuestoesFormComponent {
  materias: ReturnType<MockService['getMaterias']>;
  assuntos: ReturnType<MockService['getAssuntos']>;
  topicos: ReturnType<MockService['getTopicos']>;
  orgaos: ReturnType<MockService['getOrgaos']>;
  bancas: ReturnType<MockService['getBancas']>;
  cargos: ReturnType<MockService['getCargos']>;
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly mockService: MockService
  ) {
    this.materias = this.mockService.getMaterias();
    this.assuntos = this.mockService.getAssuntos();
    this.topicos = this.mockService.getTopicos();
    this.orgaos = this.mockService.getOrgaos();
    this.bancas = this.mockService.getBancas();
    this.cargos = this.mockService.getCargos();
    this.form = this.formBuilder.group({
      enunciado: [''],
      alternativaA: [''],
      alternativaB: [''],
      alternativaC: [''],
      alternativaD: [''],
      alternativaE: [''],
      respostaCorreta: ['A'],
      materia: [''],
      assunto: [''],
      topico: [''],
      orgao: [''],
      banca: [''],
      cargo: [''],
      ano: [2024]
    });
  }
}
