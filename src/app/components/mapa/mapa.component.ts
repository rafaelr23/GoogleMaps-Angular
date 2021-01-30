import { Component, OnInit } from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../classes/marcador.class';
import { MatDialog } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  animal: string;
  name: string;

  constructor( private snackBar:MatSnackBar,public dialog: MatDialog ) {
    if( localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse( localStorage.getItem('marcadores'));
    }
   }

  ngOnInit(): void {
  }

  agregarMarcador( lat: number,lng: number ,event){
    console.log({lat,lng},event,this.marcadores);
    const newMarcador = new Marcador( lat, lng)
    this.marcadores.push(newMarcador);
    this.guardarStireage()
    this.snackBar.open('Marcador Agregado', 'Cerrar',{duration:2000,panelClass:[`SnakBar`]});
  }
  guardarStireage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores));
  }

  borrarMarcador( index:number){
    this.marcadores.splice(index,1);
    console.log(index);
    this.guardarStireage();
    this.snackBar.open('Marcador Eliminado', 'Cerrar',
      {
        
      panelClass:[`SnakBar`]
      
    },
    );
    
  }
  openDialog(marcador:Marcador): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe((result:Marcador) => {

      if(!result){
        return
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStireage();
      this.snackBar.open('Marcador Editado Correctamente', 'Cerrar',{ panelClass:[`SnakBar`] },
    );
    });

    }
}
