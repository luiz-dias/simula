import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopicoResponseDTO, TopicoRequestDTO, PageResponse, AssuntoResponseDTO } from '../../../models/entities';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class TopicosService {
  private readonly API_URL = 'http://localhost:8080/api/topicos';
  constructor(private readonly http: HttpClient) {}



  listar(): Observable<TopicoResponseDTO[]> {
    return this.http
      .get<PageResponse<TopicoResponseDTO>>(this.API_URL, {
        params: { page: '0', size: '100' }
      })
      .pipe(map((res) => res.content));
  }


  buscarPorId(id: number): Observable<TopicoResponseDTO> {
    return this.http.get<TopicoResponseDTO>(`${this.API_URL}/${id}`);
  }

  criar(dto: TopicoRequestDTO): Observable<TopicoResponseDTO> {
    return this.http.post<TopicoResponseDTO>(this.API_URL, dto);
  }


  atualizar(id: number, dto: TopicoRequestDTO): Observable<TopicoResponseDTO> {
    return this.http.put<TopicoResponseDTO>(`${this.API_URL}/${id}`, dto);
  }


  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
