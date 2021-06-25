import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinosAdminComponent } from './ninos-admin.component';

describe('NinosAdminComponent', () => {
  let component: NinosAdminComponent;
  let fixture: ComponentFixture<NinosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NinosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
