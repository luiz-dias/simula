import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cargo, CargoRequestDTO, CargoResponseDTO, PageResponse } from '../../../models/entities';



@Injectable({ providedIn: 'root' })
export class CargosService {
  private readonly apiUrl = 'http://localhost:8080/api/cargos';
  constructor(private readonly http: HttpClient) {}

  listar(): Observable<CargoResponseDTO[]> {
    return this.http.get<PageResponse<CargoResponseDTO>>(this.apiUrl, {
      params: { page: '0', size: '100' }
    }).pipe(map((res) => res.content));
  }

  buscarPorId(id: number): Observable<CargoResponseDTO> {
    return this.http.get<CargoResponseDTO>(`${this.apiUrl}/${id}`);
  }

  criar(dto: CargoRequestDTO): Observable<CargoResponseDTO> {
    return this.http.post<CargoResponseDTO>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: CargoRequestDTO): Observable<CargoResponseDTO> {
    return this.http.put<CargoResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number, cascade = false): Observable<void> {
    const params = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${this.apiUrl}/${id}`, params);
  }
}
