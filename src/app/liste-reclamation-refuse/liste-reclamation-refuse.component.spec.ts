import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReclamationRefuseComponent } from './liste-reclamation-refuse.component';

describe('ListeReclamationRefuseComponent', () => {
  let component: ListeReclamationRefuseComponent;
  let fixture: ComponentFixture<ListeReclamationRefuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeReclamationRefuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeReclamationRefuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
