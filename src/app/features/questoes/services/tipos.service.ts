import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoResponseDTO, PageResponse } from '../../../models/entities';

@Injectable({ providedIn: 'root' })
export class TiposService {
  private readonly apiUrl = 'http://localhost:8080/api/tipos';

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<TipoResponseDTO[]> {
    return this.http
      .get<PageResponse<TipoResponseDTO>>(this.apiUrl, {
        params: { page: '0', size: '100' }
      })
      .pipe(map((res) => res.content));
  }
}
