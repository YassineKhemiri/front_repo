import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUserDesactivesComponent } from './liste-user-desactives.component';

describe('ListeUserDesactivesComponent', () => {
  let component: ListeUserDesactivesComponent;
  let fixture: ComponentFixture<ListeUserDesactivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeUserDesactivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeUserDesactivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
