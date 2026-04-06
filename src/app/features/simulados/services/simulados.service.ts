import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulado, PageResponse, SimuladoRequestDTO } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/simulados';

@Injectable({ providedIn: 'root' })
export class SimuladosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Simulado>> {
    return this.http.get<PageResponse<Simulado>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  buscarPorId(id: number): Observable<Simulado> {
    return this.http.get<Simulado>(`${API_URL}/${id}`);
  }

  /** Alinhado a POST /api/simulados/gerar */
  gerar(dto: SimuladoRequestDTO): Observable<Simulado> {
    return this.http.post<Simulado>(`${API_URL}/gerar`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  baixarSimulado(id: number, formato: 'pdf' | 'docx'): Observable<Blob> {
    return this.http.get(`${API_URL}/${id}/download`, {
      params: { formato },
      responseType: 'blob'
    });
  }
}
