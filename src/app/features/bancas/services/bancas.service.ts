import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AssuntoRequestDTO, AssuntoResponseDTO, Banca, BancaRequestDTO, BancaResponseDTO, PageResponse } from '../../../models/entities';


@Injectable({ providedIn: 'root' })
export class BancasService {
  private readonly apiUrl = 'http://localhost:8080/api/bancas';
  constructor(private readonly http: HttpClient) {}


  listar(): Observable<BancaResponseDTO[]> {
    return this.http
      .get<PageResponse<BancaResponseDTO>>(this.apiUrl, {
        params: { page: '0', size: '100' }
      })
      .pipe(map((res) => res.content));
  }


  buscarPorId(id: number): Observable<BancaResponseDTO> {
    return this.http.get<BancaResponseDTO>(`${this.apiUrl}/${id}`);
  }

  criar(dto: BancaRequestDTO): Observable<BancaResponseDTO> {
    return this.http.post<BancaResponseDTO>(this.apiUrl, dto);
  }


  atualizar(id: number, dto: BancaRequestDTO): Observable<BancaResponseDTO> {
    return this.http.put<BancaResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }


  deletar(id: number, cascade = false): Observable<void> {
    const params = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${this.apiUrl}/${id}`, params);
  }
}
