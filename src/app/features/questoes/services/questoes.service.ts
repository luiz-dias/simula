import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questao, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/questoes';

@Injectable({ providedIn: 'root' })
export class QuestoesService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Questao>> {
    return this.http.get<PageResponse<Questao>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }
}
