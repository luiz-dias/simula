import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestaoRequestDTO, QuestaoResponseDTO, PageResponse, Questao } from '../../../models/entities';

const API_URL = 'http://localhost:8080/api/questoes';

@Injectable({ providedIn: 'root' })
export class QuestoesService {
  constructor(private readonly http: HttpClient) {}

  listar(page = 0, size = 20): Observable<PageResponse<Questao>> {
    return this.http.get<PageResponse<Questao>>(API_URL, {
      params: { page: String(page), size: String(size) }
    });
  }

  criar(questao: Questao): Observable<Questao> {
    return this.http.post<Questao>(API_URL, questao);
  }

  atualizar(id: number, questao: Questao): Observable<Questao> {
    return this.http.put<Questao>(`${API_URL}/${id}`, questao);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  buscarPorId(id: number): Observable<QuestaoResponseDTO> {
    return this.http.get<QuestaoResponseDTO>(`${API_URL}/${id}`);
  }
}
