import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from './shared/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Simula';

  navSections = [
    {
      title: 'Resumo',
      links: [
    //    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { label: 'Visão Completa', path: '/visao-completa', icon: 'insights' }
        // { label: 'Montar Simulado', path: '/simulados/gerar', icon: 'playlist_add' },
       // { label: 'Painel de Controle', path: '/painel-controle', icon: 'grid_view' }
      ]
    },
    {
      title: 'Cadastros',
      links: [
        { label: 'Questões', path: '/questoes', icon: 'quiz' },
        { label: 'Matérias', path: '/materias', icon: 'menu_book' },
        { label: 'Assuntos', path: '/assuntos', icon: 'topic' },
        { label: 'Tópicos', path: '/topicos', icon: 'list_alt' },
        { label: 'Órgãos', path: '/orgaos', icon: 'account_balance' },
        { label: 'Bancas', path: '/bancas', icon: 'groups' },
        { label: 'Cargos', path: '/cargos', icon: 'badge' }
      ]
    },
    {
      title: 'Simulados',
      links: [
        { label: 'Montar Simulado', path: '/simulados/gerar', icon: 'playlist_add' },
        { label: 'Lista de Simulados', path: '/simulados', icon: 'assignment' },
        { label: 'Backup/Exportar', path: '/export', icon: 'cloud_download' }
      ]
    }
  ];
}
