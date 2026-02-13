import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topico, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/topicos';

@Injectable({ providedIn: 'root' })
export class TopicosService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Topico>> {
    return this.http.get<PageResponse<Topico>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }
}
