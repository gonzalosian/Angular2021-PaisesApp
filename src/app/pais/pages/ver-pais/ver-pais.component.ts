import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { fromEvent, interval } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor( private activatedRoute: ActivatedRoute,
              private paisService: PaisService ) { }

  ngOnInit(): void {
    //ActivatedRoute nos permite subscribirnos a cualquier cambio de url

    // this.activatedRoute.params
    //   .subscribe( ({id}) => {
    //     this.paisService.getPaisPorId(id)
    //     // Este doble subscribe se podría mejorar con un operador de RxJs
    //       .subscribe( resp => console.log(resp) );
    //   } );

    this.activatedRoute.params
      .pipe(
        // switchMap nos permite recibir un observable y regresar otro
        switchMap( ({id}) => this.paisService.getPaisPorId( id ) ),
        tap( console.log )
      )
      .subscribe( pais => this.pais = pais );
  }

}
