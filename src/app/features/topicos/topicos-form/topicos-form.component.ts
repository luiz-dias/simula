import { Component, inject,OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { Assunto } from '../../../models/assunto';
import { AssuntosService } from '../../assuntos/services/assuntos.service';
import {TopicosService } from '../../topicos/services/topicos.service';


@Component({
  selector: 'app-topicos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './topicos-form.component.html',
  styleUrl: './topicos-form.component.scss'
})
export class TopicosFormComponent  implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly topicosService = inject(TopicosService);
  private readonly assuntoService = inject(AssuntosService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  assuntos: Assunto[] = [];
  id: number | null = null;

  form = this.formBuilder.group({
    nome: [''],
    assuntoId: [null as number | null]
  });

  ngOnInit(): void {
    this.assuntoService.listar().subscribe((assuntos) => {
      this.assuntos = assuntos;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.topicosService.buscarPorId(this.id).subscribe({
        next: (topico) => {
          this.form.patchValue({
            nome: topico.nome,
            assuntoId: topico.assuntoId
          });
        },
        error: (err) => console.error('Erro ao carregar assunto', err)
      });
    }
  }

  salvar(): void {
    const nome = this.form.get('nome')?.value?.trim();
    const assuntoId = this.form.get('assuntoId')?.value;
    if (!nome || assuntoId == null) return;
    
    const request = this.id
    ? this.topicosService.atualizar(this.id, { nome, assuntoId })
    : this.topicosService.criar({ nome, assuntoId });

    request.subscribe({
      next: () => this.router.navigate(['/topicos']),
      error: (err) => console.error('Erro ao salvar topico', err)
    });
  }
}
