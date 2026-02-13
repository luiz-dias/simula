import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/assuntos';

@Injectable({ providedIn: 'root' })
export class AssuntosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Assunto>> {
    return this.http.get<PageResponse<Assunto>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  buscarPorId(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${API_URL}/${id}`);
  }

  criar(payload: { nome: string; materiaId: number }): Observable<Assunto> {
    return this.http.post<Assunto>(API_URL, payload);
  }

  atualizar(id: number, payload: { nome: string; materiaId: number }): Observable<Assunto> {
    return this.http.put<Assunto>(`${API_URL}/${id}`, payload);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
