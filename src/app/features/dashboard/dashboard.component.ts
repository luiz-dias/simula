import { Component } from '@angular/core';
import { MockService } from '../../data/mock.service';
import { COMMON_IMPORTS, MATERIAL_IMPORTS } from '../../shared/ui';

@Component({
  selector: 'app-dashboard',
  imports: [...COMMON_IMPORTS, ...MATERIAL_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats: ReturnType<MockService['getDashboardStats']>;

  constructor(private readonly mockService: MockService) {
    this.stats = this.mockService.getDashboardStats();
  }
}
