import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({ selector: 'app-perfil', templateUrl: './perfil.page.html', styleUrls: ['./perfil.page.scss'], standalone: false })
export class PerfilPage implements OnInit {
  mensaje = '';
  error = false;
  readonly formulario;

  constructor(private formularios: FormBuilder) {
    this.formulario = this.formularios.nonNullable.group({
      nombre: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(60)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
      ciudad: ['', Validators.maxLength(60)],
    });
  }

  ngOnInit(): void {
    try {
      const datos: unknown = JSON.parse(localStorage.getItem('bolsa-urbana-perfil') ?? '{}');
      if (datos && typeof datos === 'object') {
        const perfil = datos as Record<string, unknown>;
        this.formulario.patchValue({
          nombre: typeof perfil['nombre'] === 'string' ? perfil['nombre'] : '',
          correo: typeof perfil['correo'] === 'string' ? perfil['correo'] : '',
          ciudad: typeof perfil['ciudad'] === 'string' ? perfil['ciudad'] : '',
        });
      }
    } catch { this.mensaje = 'No se pudo recuperar el perfil guardado.'; this.error = true; }
  }

  guardar(): void {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) {
      this.error = true;
      this.mensaje = 'Revisá el nombre y el correo antes de guardar.';
      return;
    }
    try {
      const datos = this.formulario.getRawValue();
      localStorage.setItem('bolsa-urbana-perfil', JSON.stringify({ nombre: datos.nombre.trim(), correo: datos.correo.trim(), ciudad: datos.ciudad.trim() }));
      this.error = false;
      this.mensaje = 'Perfil guardado en este navegador.';
    } catch {
      this.error = true;
      this.mensaje = 'El navegador no permitió guardar el perfil.';
    }
  }
}
