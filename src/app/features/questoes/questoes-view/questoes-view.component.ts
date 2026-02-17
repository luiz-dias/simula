import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';
import { QuestaoResponseDTO } from '../../../models/entities';
import { QuestoesService } from '../services/questoes.service';

@Component({
  selector: 'app-questoes-view',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './questoes-view.component.html',
  styleUrl: './questoes-view.component.scss'
})
export class QuestoesViewComponent implements OnInit {
  questao: QuestaoResponseDTO | null = null;

  constructor(
    private readonly questoesService: QuestoesService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    const id = Number(idParam);
    this.questoesService.buscarPorId(id).subscribe((res) => {
      this.questao = res;
    });
  }
}
