import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosAdminComponent } from './voluntarios-admin.component';

describe('VoluntariosAdminComponent', () => {
  let component: VoluntariosAdminComponent;
  let fixture: ComponentFixture<VoluntariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
