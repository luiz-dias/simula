import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../shared/ui';

@Component({
  selector: 'app-montar-simulado',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './montar-simulado.component.html',
  styleUrl: './montar-simulado.component.scss'
})
export class MontarSimuladoComponent {
  materias: ReturnType<MockService['getMaterias']>;
  assuntos: ReturnType<MockService['getAssuntos']>;
  topicos: ReturnType<MockService['getTopicos']>;
  orgaos: ReturnType<MockService['getOrgaos']>;
  bancas: ReturnType<MockService['getBancas']>;
  cargos: ReturnType<MockService['getCargos']>;
  form: ReturnType<FormBuilder['group']>;

  materiasSelecionadas: string[] = ['Direito Constitucional', 'Português'];

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
      titulo: ['Simulado Personalizado'],
      orgao: ['TCU'],
      banca: ['Cebraspe'],
      cargo: ['Analista'],
      assunto: ['Controle de Constitucionalidade'],
      topico: ['ADI e ADC'],
      ano: [2024],
      materia: ['']
    });
  }

  addMateria() {
    const materia = this.form.value.materia;
    if (materia && !this.materiasSelecionadas.includes(materia)) {
      this.materiasSelecionadas.push(materia);
    }
  }

  removerMateria(materia: string) {
    this.materiasSelecionadas = this.materiasSelecionadas.filter((item) => item !== materia);
  }
}
