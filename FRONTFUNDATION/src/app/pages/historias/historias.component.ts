import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss']
})
export class HistoriasComponent implements OnInit {
  displayResponsive: boolean;
  usuarioSeleccionado: {};
  historias = [{
    id: 1,
    imagen: 'https://i.pinimg.com/474x/83/a9/a1/83a9a144ab03763667b8d8aa381bb441.jpg',
    titulo: 'José Rodriguez',
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    year: 2020
  }, {
    imagen: 'https://i.pinimg.com/474x/83/a9/a1/83a9a144ab03763667b8d8aa381bb441.jpg',
    titulo: 'Edul Manzano',
    id: 2,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    year: 2019
  },
  {
    imagen: 'https://i.pinimg.com/474x/83/a9/a1/83a9a144ab03763667b8d8aa381bb441.jpg',
    titulo: 'Pedro Martinez',
    id: 3,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    year: 2018
  },
  {
    imagen: 'https://i.pinimg.com/474x/83/a9/a1/83a9a144ab03763667b8d8aa381bb441.jpg',
    titulo: 'Xavier Torres',
    id: 4,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    year: 2020
  }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  getId(item) {
    let id = item.id;
    let album = item.titulo;
    console.log("galeria: ", id + "  || ", album)
    this.router.navigate(['/imagenes', id, album], { skipLocationChange: true });
  }

  showResponsiveDialog(value) {
    let idSeleccionado = value.id;
    this.usuarioSeleccionado = this.historias.find(historia => historia.id === idSeleccionado);
    this.displayResponsive = true;
    console.log("usuario seleccionado: ", this.usuarioSeleccionado)
  }
}