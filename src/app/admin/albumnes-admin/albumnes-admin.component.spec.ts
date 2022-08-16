import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumnesAdminComponent } from './albumnes-admin.component';

describe('AlbumnesAdminComponent', () => {
  let component: AlbumnesAdminComponent;
  let fixture: ComponentFixture<AlbumnesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumnesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumnesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
