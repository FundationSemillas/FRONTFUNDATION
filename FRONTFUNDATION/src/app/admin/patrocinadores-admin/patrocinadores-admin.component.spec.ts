import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadoresAdminComponent } from './patrocinadores-admin.component';

describe('PatrocinadoresAdminComponent', () => {
  let component: PatrocinadoresAdminComponent;
  let fixture: ComponentFixture<PatrocinadoresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatrocinadoresAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrocinadoresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
