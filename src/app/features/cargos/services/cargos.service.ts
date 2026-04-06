import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo, CargoRequestDTO, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/cargos';

@Injectable({ providedIn: 'root' })
export class CargosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Cargo>> {
    return this.http.get<PageResponse<Cargo>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  buscarPorId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${API_URL}/${id}`);
  }

  criar(dto: CargoRequestDTO): Observable<Cargo> {
    return this.http.post<Cargo>(API_URL, dto);
  }

  atualizar(id: number, dto: CargoRequestDTO): Observable<Cargo> {
    return this.http.put<Cargo>(`${API_URL}/${id}`, dto);
  }

  deletar(id: number, cascade = false): Observable<void> {
    const options = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${API_URL}/${id}`, options);
  }
}
