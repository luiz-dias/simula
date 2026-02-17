import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulado, SimuladoRequestDTO, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/simulados';

@Injectable({ providedIn: 'root' })
export class SimuladosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Simulado>> {
    return this.http.get<PageResponse<Simulado>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  criar(dto: SimuladoRequestDTO): Observable<Simulado> {
    return this.http.post<Simulado>(API_URL, dto);
  }
}
