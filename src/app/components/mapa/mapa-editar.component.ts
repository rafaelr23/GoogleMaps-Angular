import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Marcador } from '../../classes/marcador.class';



@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  titulo:String;

  form:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapaEditarComponent>,public formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Marcador) { 
     
      this.form = formBuilder.group({
        'titulo': data.titulo,
        'desc':data.desc
      });

    }

  ngOnInit(): void {
  }
  
  editarMarcador(){
    this.dialogRef.close( this.form.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
