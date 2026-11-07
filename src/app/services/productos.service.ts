import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaProductos } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  constructor(private http: HttpClient) {}

  listar(): Observable<RespuestaProductos> {
    return this.http.get<RespuestaProductos>(environment.productosUrl, {
      params: { limit: 0, select: 'id,title,description,category,price,rating,stock,thumbnail' },
    }).pipe(timeout(15000));
  }
}
