import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgaosService } from '../services/orgaos.service';

@Component({
  selector: 'app-orgaos-form',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './orgaos-form.component.html',
  styleUrl: './orgaos-form.component.scss'
})
export class OrgaosFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly orgaosService = inject(OrgaosService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  id: number | null = null;

  form = this.formBuilder.group({
    nome: [''],
    sigla: [''] 
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.orgaosService.buscarPorId(this.id).subscribe({
        next: (orgao) => {
          this.form.patchValue({ nome: orgao.nome, sigla: orgao.sigla });
          alert("ÓRGÃO CARREGADO");
        },
        error: (err) => console.error('Erro ao carregar órgão', err)
      });
    }
  }

  salvar(): void {
    alert("SALVANDO");
    const nome = this.form.get('nome')?.value?.trim();
    const sigla = this.form.get('sigla')?.value?.trim();
    if (!nome || !sigla) return;

    const request = this.id ? this.orgaosService.atualizar(this.id, { nome, sigla }) : this.orgaosService.criar({ nome, sigla });
    request.subscribe({
      next: () => this.router.navigate(['/orgaos']),
      error: (err) => console.error('Erro ao salvar órgão', err)
    });
  }
}
