import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banca, BancaRequestDTO, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/bancas';

@Injectable({ providedIn: 'root' })
export class BancasService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Banca>> {
    return this.http.get<PageResponse<Banca>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  buscarPorId(id: number): Observable<Banca> {
    return this.http.get<Banca>(`${API_URL}/${id}`);
  }

  criar(dto: BancaRequestDTO): Observable<Banca> {
    return this.http.post<Banca>(API_URL, dto);
  }

  atualizar(id: number, dto: BancaRequestDTO): Observable<Banca> {
    return this.http.put<Banca>(`${API_URL}/${id}`, dto);
  }

  deletar(id: number, cascade = false): Observable<void> {
    const options = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${API_URL}/${id}`, options);
  }
}
