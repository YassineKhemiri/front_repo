import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratByIdComponent } from './contrat-by-id.component';

describe('ContratByIdComponent', () => {
  let component: ContratByIdComponent;
  let fixture: ComponentFixture<ContratByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContratByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContratByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
