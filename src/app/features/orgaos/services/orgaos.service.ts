import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orgao, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/orgaos';

@Injectable({ providedIn: 'root' })
export class OrgaosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Orgao>> {
    return this.http.get<PageResponse<Orgao>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }
}
