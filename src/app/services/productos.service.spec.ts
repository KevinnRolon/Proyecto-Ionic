import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let http: HttpTestingController;
  let servicio: ProductosService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
    servicio = TestBed.inject(ProductosService);
  });
  afterEach(() => http.verify());

  it('consulta la URL configurada y devuelve el JSON', () => {
    let total = -1;
    servicio.listar().subscribe(respuesta => total = respuesta.total);
    const peticion = http.expectOne(req => req.url === environment.productosUrl);
    expect(peticion.request.params.get('limit')).toBe('0');
    peticion.flush({ products: [], total: 0, skip: 0, limit: 0 });
    expect(total).toBe(0);
  });

  it('propaga el fallo HTTP para mostrar el mensaje y permitir reintentar', () => {
    let fallo = false;
    servicio.listar().subscribe({ error: () => fallo = true });
    http.expectOne(req => req.url === environment.productosUrl).flush('Error', { status: 503, statusText: 'Unavailable' });
    expect(fallo).toBe(true);
  });

  it('rechaza un JSON incompleto aunque la petición HTTP sea exitosa', () => {
    let mensaje = '';
    servicio.listar().subscribe({ error: (error: Error) => mensaje = error.message });
    http.expectOne(req => req.url === environment.productosUrl).flush({ products: [{ id: 1 }] });
    expect(mensaje).toContain('formato esperado');
  });
});
