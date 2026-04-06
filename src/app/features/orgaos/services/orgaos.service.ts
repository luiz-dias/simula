import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orgao, OrgaoRequestDTO, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/orgaos';

@Injectable({ providedIn: 'root' })
export class OrgaosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Orgao>> {
    return this.http.get<PageResponse<Orgao>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  buscarPorId(id: number): Observable<Orgao> {
    return this.http.get<Orgao>(`${API_URL}/${id}`);
  }

  criar(dto: OrgaoRequestDTO): Observable<Orgao> {
    return this.http.post<Orgao>(API_URL, dto);
  }

  atualizar(id: number, dto: OrgaoRequestDTO): Observable<Orgao> {
    return this.http.put<Orgao>(`${API_URL}/${id}`, dto);
  }

  deletar(id: number, cascade = false): Observable<void> {
    const options = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${API_URL}/${id}`, options);
  }
}
