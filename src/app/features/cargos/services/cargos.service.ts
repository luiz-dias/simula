import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/cargos';

@Injectable({ providedIn: 'root' })
export class CargosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Cargo>> {
    return this.http.get<PageResponse<Cargo>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }
}
