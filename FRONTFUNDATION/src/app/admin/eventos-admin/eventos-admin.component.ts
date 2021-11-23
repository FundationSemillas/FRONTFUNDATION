import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {

  events;
  event;
  registerEvent = {
    name: '',
    description: '',
    place: '',
    date: '',
    hour: '',
    delay: ''
  };
  selectEvent = false;
  createEvent = false;
  displayResponsibleModificar:boolean

  constructor(private service: EventService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }

  getAllEvents() {
    let url = '/events';
    this.service.getEvent(url).subscribe((data) => {
      this.events = data;
    })
  }

  getEvent(id) {
    let url = `/events/${id}`;
    this.service.getEvent(url).subscribe((data) => {
      this.event = data;
    })
  }

  addEvent() {
    let url = '/event/create'
    this.service.addEvent(url, this.registerEvent).subscribe(() => {
      console.log('exito al crear')
    }, (err) => {
      console.log('error', err)
    })
  }

  updateEvent() {
    let url = '/event/update'
    this.service.updateEvent(url, this.event).subscribe(() => {
      console.log('exito al actualizar')
    }, (err) => {
      console.log('error', err)
    })
  }
}
