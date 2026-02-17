import { Component } from '@angular/core';
import { COMMON_IMPORTS, FORM_IMPORTS, MATERIAL_IMPORTS } from '../../../shared/ui';

@Component({
  selector: 'app-backup-export',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS, ...FORM_IMPORTS],
  templateUrl: './backup-export.component.html',
  styleUrl: './backup-export.component.scss'
})
export class BackupExportComponent {
  tipos = ['Questões', 'Simulados', 'Completo'];
}
