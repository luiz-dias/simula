import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banca, PageResponse } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/bancas';

@Injectable({ providedIn: 'root' })
export class BancasService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Banca>> {
    return this.http.get<PageResponse<Banca>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }
}
