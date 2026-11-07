import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { esRespuestaProductos, RespuestaProductos } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  constructor(private http: HttpClient) {}

  listar(): Observable<RespuestaProductos> {
    return this.http.get<unknown>(environment.productosUrl, {
      params: { limit: 0, select: 'id,title,description,category,price,rating,stock,thumbnail' },
    }).pipe(timeout(15000), map(datos => {
      if (!esRespuestaProductos(datos)) throw new Error('El catálogo recibido no tiene el formato esperado.');
      return datos;
    }));
  }
}
