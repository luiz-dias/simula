import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../../data/mock.service';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { ActivatedRoute, Router } from '@angular/router';
import { CargosService } from '../services/cargos.service';
import { Orgao } from '../../../models/orgao';
import { OrgaosService } from '../../orgaos/services/orgaos.service';

@Component({
  selector: 'app-cargos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './cargos-form.component.html',
  styleUrl: './cargos-form.component.scss'
})
export class CargosFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly cargosService = inject(CargosService);
  private readonly orgaosService = inject(OrgaosService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  orgaos: Orgao[] = [];
  id: number | null = null;

  form = this.formBuilder.group({
    nome: [''],
    orgaoId: [null as number | null]
  });

  ngOnInit(): void {
    this.orgaosService.listar().subscribe((orgaos) => {
      this.orgaos = orgaos;
    });
  }

  salvar(): void {
    const nome = this.form.get('nome')?.value?.trim();
    const orgaoId = this.form.get('orgaoId')?.value;
    if (!nome || !orgaoId) return;

    const request = this.id ? this.cargosService.atualizar(this.id, { nome, orgaoId: orgaoId }) : this.cargosService.criar({ nome, orgaoId: orgaoId });
    request.subscribe({
      next: () => this.router.navigate(['/cargos']),
      error: (err) => console.error('Erro ao salvar cargo', err)
    });
  }
}
