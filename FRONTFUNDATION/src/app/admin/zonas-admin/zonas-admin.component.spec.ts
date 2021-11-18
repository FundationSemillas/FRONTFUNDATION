import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasAdminComponent } from './zonas-admin.component';

describe('ZonasAdminComponent', () => {
  let component: ZonasAdminComponent;
  let fixture: ComponentFixture<ZonasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
