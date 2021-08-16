import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  listaSugerencias: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;
    
    this.paisService.buscarPais( this.termino ).subscribe( paises => {
      // console.log(paises);
      this.paises = paises;
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    } );
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais( termino ).subscribe( paises => {
      this.listaSugerencias = paises.splice(0,5);
    }, (err) => {
      this.listaSugerencias = [];
    } );
  }

}