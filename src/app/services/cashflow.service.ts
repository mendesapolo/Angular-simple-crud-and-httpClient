import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Cashflow } from '../models/cashflow';

@Injectable({
  providedIn: 'root'
})
export class CashflowService {

  public isload = false

  constructor(
    private http: HttpClient
  ) { }

  public list(): Observable<any> {
    return this.http.get(`${env.api_url}/cashflows`)
  }

  public show(id: number): Observable<any> {
    return this.http.get(`${env.api_url}/cashflows/${id}`)
  }

  public insert(data: Cashflow): Observable<any> {
    return this.http.post(`${env.api_url}/cashflows`, {
      descricao: data.descricao,
      valor: data.valor,
      is_entrada: data.is_entrada,
    })
  }

  public update(data: Cashflow): Observable<any> {
    return this.http.put(`${env.api_url}/cashflows/${data.id}`, {
      descricao: data.descricao,
      valor: data.valor,
      is_entrada: data.is_entrada,
    })
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${env.api_url}/cashflows/${id}`)
  }

}
