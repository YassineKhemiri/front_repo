import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReclamationAccepteComponent } from './liste-reclamation-accepte.component';

describe('ListeReclamationAccepteComponent', () => {
  let component: ListeReclamationAccepteComponent;
  let fixture: ComponentFixture<ListeReclamationAccepteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeReclamationAccepteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeReclamationAccepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
