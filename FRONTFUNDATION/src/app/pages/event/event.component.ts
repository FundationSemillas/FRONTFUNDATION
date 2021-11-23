import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events;
  constructor(private service: EventService) { }

  ngOnInit(): void {
  }

  getAllEvents() {
    let url = '/events';
    this.service.getEvent(url).subscribe((data) => {
      this.events = data;
    })
  }
}
