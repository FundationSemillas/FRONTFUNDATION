import { Component, OnInit } from '@angular/core';
import { ZoneInterface } from '../../models/zone';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zonas-admin',
  templateUrl: './zonas-admin.component.html',
  styleUrls: ['./zonas-admin.component.css']
})
export class ZonasAdminComponent implements OnInit {

  Zones: any;
  newZone: string = "";
  constructor(private service: ZoneService) { }

  ngOnInit() {
    this.getAllZone();
  }

  getAllZone() {
    this.service.get("/zone").subscribe((res) => {
      console.log(res)
      this.Zones = res
    })
  }

  createZone() {
    this.service.add({ "name": this.newZone }, "/zone/create").subscribe((res) => {
      console.log(res)
      this.getAllZone()
    },
    (err) =>{
      console.log("Error", err)
    })
    this.newZone = "";
  }

  deleteZone(id: string) {
    console.log(id);
    this.service.delete('/zone/delete/' + id).subscribe((res) => {
      console.log(res)
      this.getAllZone()
    },
    (err) =>{
      console.log("Error", err)
    })
  }
}
