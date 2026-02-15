import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Orgao, OrgaoRequestDTO, OrgaoResponseDTO, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/orgaos';

@Injectable({ providedIn: 'root' })
export class OrgaosService {
  private readonly apiUrl = 'http://localhost:8080/api/orgaos';
  constructor(private readonly http: HttpClient) {}

  listar(): Observable<OrgaoResponseDTO[]> {
    return this.http.get<PageResponse<OrgaoResponseDTO>>(this.apiUrl, {
      params: { page: '0', size: '100' }
    }).pipe(map((res) => res.content));
  }

  buscarPorId(id: number): Observable<OrgaoResponseDTO> {
    return this.http.get<OrgaoResponseDTO>(`${this.apiUrl}/${id}`);
  }

  criar(dto: OrgaoRequestDTO): Observable<OrgaoResponseDTO> {
    return this.http.post<OrgaoResponseDTO>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: OrgaoRequestDTO): Observable<OrgaoResponseDTO> {
    return this.http.put<OrgaoResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number, cascade = false): Observable<void> {
    const params = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${this.apiUrl}/${id}`, params);
  } 
}
