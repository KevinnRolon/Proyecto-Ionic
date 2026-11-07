import { Directive } from '@angular/core';

@Directive({ selector: '[appImagenRespaldo]', standalone: true, host: { '(error)': 'usarRespaldo($event)' } })
export class ImagenRespaldoDirective {
  usarRespaldo(evento: Event): void {
    const imagen = evento.target as HTMLImageElement;
    if (imagen.dataset['respaldo']) return;
    imagen.dataset['respaldo'] = 'true';
    imagen.src = 'assets/producto-sin-imagen.svg';
  }
}
