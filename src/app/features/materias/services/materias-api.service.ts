import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/materias';

@Injectable({ providedIn: 'root' })
export class MateriasApiService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Materia>> {
    return this.http.get<PageResponse<Materia>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  criar(payload: { nome: string }): Observable<Materia> {
   alert(payload.nome);
    return this.http.post<Materia>(API_URL, payload);
  }
}
