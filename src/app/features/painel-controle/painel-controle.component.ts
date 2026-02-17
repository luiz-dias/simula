import { Component } from '@angular/core';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../shared/ui';

@Component({
  selector: 'app-painel-controle',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './painel-controle.component.html',
  styleUrl: './painel-controle.component.scss'
})
export class PainelControleComponent {
  atalhos = [
    { label: 'CRUD de Questões', path: '/questoes', icon: 'quiz' },
    { label: 'CRUD de Matérias', path: '/materias', icon: 'menu_book' },
    { label: 'CRUD de Assuntos', path: '/assuntos', icon: 'topic' },
    { label: 'CRUD de Tópicos', path: '/topicos', icon: 'list_alt' },
    { label: 'Simulados por filtros', path: '/simulados', icon: 'assignment' },
    { label: 'CRUD de Órgãos', path: '/orgaos', icon: 'account_balance' },
    { label: 'CRUD de Cargos', path: '/cargos', icon: 'badge' },
    { label: 'Backup e Exportação', path: '/backup', icon: 'cloud_download' }
  ];
}
