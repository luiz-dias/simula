import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AssuntoResponseDTO,
  AssuntoRequestDTO,
  PageResponse
} from '../../../models/entities';

@Injectable({ providedIn: 'root' })
export class AssuntosService {
  private readonly apiUrl = 'http://localhost:8080/api/assuntos';

  constructor(private readonly http: HttpClient) {}


  listar(): Observable<AssuntoResponseDTO[]> {
    return this.http
      .get<PageResponse<AssuntoResponseDTO>>(this.apiUrl, {
        params: { page: '0', size: '100' }
      })
      .pipe(map((res) => res.content));
  }


  buscarPorId(id: number): Observable<AssuntoResponseDTO> {
    return this.http.get<AssuntoResponseDTO>(`${this.apiUrl}/${id}`);
  }

  criar(dto: AssuntoRequestDTO): Observable<AssuntoResponseDTO> {
    return this.http.post<AssuntoResponseDTO>(this.apiUrl, dto);
  }


  atualizar(id: number, dto: AssuntoRequestDTO): Observable<AssuntoResponseDTO> {
    return this.http.put<AssuntoResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }


  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
