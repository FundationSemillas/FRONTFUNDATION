import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from './../services/album.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { environment } from "../../environments/environment";
const API_URL_FORM = environment.baseUrl;

const directorioImagenes: any = API_URL_FORM +'/storage/posts/';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss']
})

export class ComponentsComponent implements OnInit {
    @ViewChild('nav') slider: NgImageSliderComponent;
    partners: any;
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: { year: number, month: number };
    model: NgbDateStruct;
    visibleSidebar1;
    private _opened: boolean = false;
    private _toggleSidebar() {
        this._opened = !this._opened;
    }
    responsiveOptions;
    imageObject = [
        {
            image: './assets/img/carrusel1.jpeg',
            thumbImage: './assets/img/carrusel1.jpeg',
            alt: 'alt of image',
            title: '1'
        },
        {
            image: './assets/img/carrusel2.jpeg',
            thumbImage: './assets/img/carrusel2.jpeg',
            alt: 'alt of image',
            title: '2'
        },
        {
            image: './assets/img/carrusel3.jpeg',
            thumbImage: './assets/img/carrusel3.jpeg',
            alt: 'alt of image',
            title: '3'
        },
        {
            image: './assets/img/carrusel4.jpeg',
            thumbImage: './assets/img/carrusel4.jpeg',
            alt: 'alt of image',
            title: '4'
        }
        ,
        {
            image: './assets/img/carrusel5.jpeg',
            thumbImage: './assets/img/carrusel5.jpeg',
            alt: 'alt of image',
            title: '5'
        }
    ];


    constructor(private renderer: Renderer2, private primengConfig: PrimeNGConfig, private router: Router, private restService: AlbumService) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    prevImageClick() {
        this.slider.prev();
    }

    nextImageClick() {
        this.slider.next();
    }


    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    ngOnInit() {
        this.getSponsors();
        this.primengConfig.ripple = true;
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function () {
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function () {
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }

    getSponsors() {
        this.restService.get("/sponsor").subscribe((data) => {
            this.partners = data;
            for (var i = 0; i < this.partners.length; i++) {
                this.partners[i].image = directorioImagenes + this.partners[i].image;
            }

            console.log("sponsornes: ", this.partners);
        });
    }

}
