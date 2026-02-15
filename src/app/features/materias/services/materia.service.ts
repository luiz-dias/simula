import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MateriaResponseDTO,
  MateriaRequestDTO,
  PageResponse
} from '../../../models/entities';

@Injectable({ providedIn: 'root' })
export class MateriaService {
  private readonly apiUrl = 'http://localhost:8080/api/materias';

  constructor(private readonly http: HttpClient) {}


  listar(): Observable<MateriaResponseDTO[]> {
    return this.http
      .get<PageResponse<MateriaResponseDTO>>(this.apiUrl, {
        params: { page: '0', size: '100' }
      })
      .pipe(map((res) => res.content));
  }


  buscarPorId(id: number): Observable<MateriaResponseDTO> {
    return this.http.get<MateriaResponseDTO>(`${this.apiUrl}/${id}`);
  }


  criar(dto: MateriaRequestDTO): Observable<MateriaResponseDTO> {
    return this.http.post<MateriaResponseDTO>(this.apiUrl, dto);
  }


  atualizar(id: number, dto: MateriaRequestDTO): Observable<MateriaResponseDTO> {
    return this.http.put<MateriaResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }


  deletar(id: number, cascade = false): Observable<void> {
    const params = cascade ? { params: { cascade: 'true' } } : {};
    return this.http.delete<void>(`${this.apiUrl}/${id}`, params);
  }
}
