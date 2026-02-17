import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Assunto, Banca, Cargo, Materia, Orgao, Questao, Topico, TipoResponseDTO } from '../../../models/entities';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { AssuntosService } from '../../assuntos/services/assuntos.service';
import { MateriaService } from '../../materias/services/materia.service';
import { TopicosService } from '../../topicos/services/topicos.service';
import { OrgaosService } from '../../orgaos/services/orgaos.service';
import { BancasService } from '../../bancas/services/bancas.service';
import { CargosService } from '../../cargos/services/cargos.service';
import { Router } from '@angular/router';
import { QuestoesService } from '../services/questoes.service';
import { TiposService } from '../services/tipos.service';

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
  private readonly tiposService = inject(TiposService);
    materias: Materia[] = [];
  assuntos: Assunto[] = [];
  topicos: Topico[] = [];
  orgaos: Orgao[] = [];
  bancas: Banca[] = [];
  cargos: Cargo[] = [];
  tipos: TipoResponseDTO[] = [];
  id: number | null = null;

  form = this.formBuilder.group({
    enunciado: [''],
    tipoId: [null as number | null],
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

  /** True quando o tipo selecionado é Múltipla Escolha (exibe alternativas A–E). */
  get ehMultiplaEscolha4Alternativas(): boolean {
    const tipoId = this.form.get('tipoId')?.value;
    const tipo = this.tipos.find((t) => t.id === tipoId);
    const nome = tipo?.nome?.toLowerCase() ?? '';
    return nome.includes('4 alternativas');
  }

  get ehMultiplaEscolha5Alternativas(): boolean {
    const tipoId = this.form.get('tipoId')?.value;
    const tipo = this.tipos.find((t) => t.id === tipoId);
    const nome = tipo?.nome?.toLowerCase() ?? '';
    return nome.includes('5 alternativas');
  }
  get ehVouF(): boolean {
    const tipoId = this.form.get('tipoId')?.value;
    const tipo = this.tipos.find((t) => t.id === tipoId);
    const nome = tipo?.nome?.toLowerCase() ?? '';
    return nome.includes('v/f');
  }
  ngOnInit(): void {
    this.materiaService.listar().subscribe((materias) => (this.materias = materias));
    this.assuntosService.listar().subscribe((assuntos) => (this.assuntos = assuntos));
    this.topicosService.listar().subscribe((topicos) => (this.topicos = topicos));
    this.orgaosService.listar().subscribe((orgaos) => (this.orgaos = orgaos));
    this.bancasService.listar().subscribe((bancas) => (this.bancas = bancas));
    this.cargosService.listar().subscribe((cargos) => (this.cargos = cargos));
    this.tiposService.listar().subscribe((tipos) => (this.tipos = tipos));
  }
  

  salvar(): void {
    const raw = this.form.getRawValue();
    if (!raw) return;

    const payload = { ...raw };
    if (this.ehVouF) {
      payload.alternativaA = 'V';
      payload.alternativaB = 'F';
      payload.alternativaC = '';
      payload.alternativaD = '';
      payload.alternativaE = '';
      payload.respostaCorreta = payload.respostaCorreta === 'B' ? 'B' : 'A';
    } 

    const request = this.id
      ? this.questoesService.atualizar(this.id, payload as unknown as Questao)
      : this.questoesService.criar(payload as unknown as Questao);
    request.subscribe({
      next: () => this.router.navigate(['/questoes']),
      error: (err: unknown) => console.error('Erro ao salvar questão', err)
    });
  }

}