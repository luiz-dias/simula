import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Assunto, Banca, Cargo, Materia, Orgao, Questao, Topico } from '../../../models/entities';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { AssuntosService } from '../../assuntos/services/assuntos.service';
import { MateriaService } from '../../materias/services/materia.service';
import { TopicosService } from '../../topicos/services/topicos.service';
import { OrgaosService } from '../../orgaos/services/orgaos.service';
import { BancasService } from '../../bancas/services/bancas.service';
import { CargosService } from '../../cargos/services/cargos.service';
import { Router } from '@angular/router';
import { QuestoesService } from '../services/questoes.service';

@Component({
  selector: 'app-questoes-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './questoes-form.component.html',
  styleUrl: './questoes-form.component.scss'
})
export class QuestoesFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly materiaService = inject(MateriaService);
  private readonly assuntosService = inject(AssuntosService);
  private readonly topicosService = inject(TopicosService);
  private readonly orgaosService = inject(OrgaosService);
  private readonly bancasService = inject(BancasService);
  private readonly cargosService = inject(CargosService);
  private readonly router = inject(Router);
  private readonly questoesService = inject(QuestoesService);
  materias: Materia[] = [];
  assuntos: Assunto[] = [];
  topicos: Topico[] = [];
  orgaos: Orgao[] = [];
  bancas: Banca[] = [];
  cargos: Cargo[] = [];
  id: number | null = null;
  form = this.formBuilder.group({
    enunciado: [''],
    alternativaA: [''],
    alternativaB: [''],
    alternativaC: [''],
    alternativaD: [''],
    alternativaE: [''],
    respostaCorreta: ['A'],
    materiaId: [null as number | null],
    assuntoId: [null as number | null],
    topicoId: [null as number | null],
    orgaoId: [null as number | null],
    bancaId: [null as number | null],
    cargoId: [null as number | null],
    ano: [2024]
  });

  ngOnInit(): void {
    this.materiaService.listar().subscribe((materias) => this.materias = materias);
    this.assuntosService.listar().subscribe((assuntos) => this.assuntos = assuntos);
    this.topicosService.listar().subscribe((topicos) => this.topicos = topicos);
    this.orgaosService.listar().subscribe((orgaos) => this.orgaos = orgaos);
    this.bancasService.listar().subscribe((bancas) => this.bancas = bancas);
    this.cargosService.listar().subscribe((cargos) => this.cargos = cargos);
  }
  

  salvar(): void {
    const raw = this.form.getRawValue();
    if (!raw) return;

    const request = this.id
      ? this.questoesService.atualizar(this.id, raw as unknown as Questao)
      : this.questoesService.criar(raw as unknown as Questao);
    request.subscribe({
      next: () => this.router.navigate(['/questoes']),
      error: (err: any) => console.error('Erro ao salvar questão', err)
    });
  }

}