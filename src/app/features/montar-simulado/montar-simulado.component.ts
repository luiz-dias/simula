import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Orgao,
  Cargo,
  MateriaResponseDTO,
  AssuntoResponseDTO,
  TopicoResponseDTO
} from '../../models/entities';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MateriaService } from '../materias/services/materia.service';
import { AssuntosService } from '../assuntos/services/assuntos.service';
import { TopicosService } from '../topicos/services/topicos.service';
import { OrgaosService } from '../orgaos/services/orgaos.service';
import { CargosService } from '../cargos/services/cargos.service';
import { SimuladosService } from '../simulados/services/simulados.service';

export type NivelDetalhe = 'materia' | 'assunto' | 'topico';

export interface ItemSimulado {
  id: number;
  materia: MateriaResponseDTO;
  assunto?: AssuntoResponseDTO;
  topico?: TopicoResponseDTO;
  quantidadeQuestoes: number;
  nivel: NivelDetalhe;
}

@Component({
  selector: 'app-montar-simulado',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DragDropModule
  ],
  templateUrl: './montar-simulado.component.html',
  styleUrl: './montar-simulado.component.scss'
})
export class MontarSimuladoComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly materiaService = inject(MateriaService);
  private readonly assuntosService = inject(AssuntosService);
  private readonly topicosService = inject(TopicosService);
  private readonly orgaosService = inject(OrgaosService);
  private readonly cargosService = inject(CargosService);
  private readonly simuladosService = inject(SimuladosService);
  private readonly router = inject(Router);

  materias: MateriaResponseDTO[] = [];
  assuntos: AssuntoResponseDTO[] = [];
  topicos: TopicoResponseDTO[] = [];
  orgaos: Orgao[] = [];
  cargos: Cargo[] = [];

  /** Itens do simulado (matéria ± assunto ± tópico + quantidade). Ordem definida por arrastar. */
  itens: ItemSimulado[] = [];
  private nextId = 1;

  form = this.formBuilder.group({
    titulo: ['Simulado Personalizado'],
    orgaoId: [null as number | null],
    cargoId: [null as number | null],
    ano: [2024],
    descricao: [''],
    materiaId: [null as number | null],
    assuntoId: [null as number | null],
    topicoId: [null as number | null],
    quantidadeQuestoes: [5]
  });

  ngOnInit(): void {
    this.materiaService.listar().subscribe((m) => (this.materias = m));
    this.assuntosService.listar().subscribe((a) => (this.assuntos = a));
    this.topicosService.listar().subscribe((t) => (this.topicos = t));
    this.orgaosService.listar().subscribe((o) => (this.orgaos = o));
    this.cargosService.listar().subscribe((c) => (this.cargos = c));

    this.form.get('materiaId')?.valueChanges.subscribe(() => {
      this.form.patchValue({ assuntoId: null, topicoId: null }, { emitEvent: false });
    });
    this.form.get('assuntoId')?.valueChanges.subscribe(() => {
      this.form.patchValue({ topicoId: null }, { emitEvent: false });
    });
  }

  /** Assuntos da matéria selecionada no formulário. */
  get assuntosDaMateria(): AssuntoResponseDTO[] {
    const materiaId = this.form.get('materiaId')?.value;
    if (materiaId == null) return [];
    return this.assuntos.filter(
      (a) => (a.materiaId ?? (a.materia as { id?: number })?.id) === materiaId
    );
  }

  /** Tópicos do assunto selecionado no formulário. */
  get topicosDoAssunto(): TopicoResponseDTO[] {
    const assuntoId = this.form.get('assuntoId')?.value;
    if (assuntoId == null) return [];
    return this.topicos.filter(
      (t) => (t.assuntoId ?? (t.assunto as { id?: number })?.id) === assuntoId
    );
  }

  /** Nível de detalhe inferido: tópico > assunto > matéria. */
  get nivelInferido(): NivelDetalhe {
    if (this.form.get('topicoId')?.value != null) return 'topico';
    if (this.form.get('assuntoId')?.value != null) return 'assunto';
    return 'materia';
  }

  /** Texto do nível para exibir no label do campo quantidade. */
  get nivelLabel(): string {
    switch (this.nivelInferido) {
      case 'topico': return 'por tópico';
      case 'assunto': return 'por assunto';
      default: return 'por matéria';
    }
  }

  addItem(): void {
    const materiaId = this.form.get('materiaId')?.value;
    const quantidade = this.form.get('quantidadeQuestoes')?.value ?? 5;
    if (materiaId == null || quantidade < 1) return;

    const materia = this.materias.find((m) => m.id === materiaId);
    if (!materia) return;

    const assuntoId = this.form.get('assuntoId')?.value;
    const topicoId = this.form.get('topicoId')?.value;
    const assunto =
      assuntoId != null
        ? this.assuntosDaMateria.find((a) => a.id === assuntoId)
        : undefined;
    const topico =
      topicoId != null
        ? this.topicosDoAssunto.find((t) => t.id === topicoId)
        : undefined;

    const nivel = this.nivelInferido;

    this.itens.push({
      id: this.nextId++,
      materia,
      assunto,
      topico,
      quantidadeQuestoes: quantidade,
      nivel
    });

    this.form.patchValue({
      materiaId: null,
      assuntoId: null,
      topicoId: null,
      quantidadeQuestoes: 5
    });
  }

  removerItem(item: ItemSimulado): void {
    this.itens = this.itens.filter((i) => i.id !== item.id);
  }

  drop(event: CdkDragDrop<ItemSimulado[]>): void {
    moveItemInArray(this.itens, event.previousIndex, event.currentIndex);
  }

  descricaoItem(item: ItemSimulado): string {
    const parts = [item.materia.nome];
    if (item.assunto) parts.push(' → ' + item.assunto.nome);
    if (item.topico) parts.push(' → ' + item.topico.nome);
    parts.push(` (${item.quantidadeQuestoes} questão(ões) por ${item.nivel})`);
    return parts.join('');
  }

  salvar(): void {
    const raw = this.form.getRawValue();
    if (!raw) return;

    const orgao = this.orgaos.find((o) => o.id === raw.orgaoId);
    const cargo = this.cargos.find((c) => c.id === raw.cargoId);

    const ordemMaterias = [...new Set(this.itens.map((i) => i.materia.nome))];
    const itensPayload = this.itens.map((i) => ({
      materiaId: i.materia.id,
      assuntoId: i.assunto?.id ?? null,
      topicoId: i.topico?.id ?? null,
      quantidadeQuestoes: i.quantidadeQuestoes,
      nivel: i.nivel
    }));

    const dto = {
      titulo: raw.titulo ?? 'Simulado',
      orgao: orgao?.sigla ?? '',
      cargo: cargo?.nome ?? '',
      ano: raw.ano ?? new Date().getFullYear(),
      ordemMaterias,
      itens: itensPayload
    };

    this.simuladosService.criar(dto).subscribe({
      next: () => this.router.navigate(['/simulados']),
      error: (err: unknown) => console.error('Erro ao salvar simulado', err)
    });
  }
}
