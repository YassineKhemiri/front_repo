import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUserVerifieComponent } from './liste-user-verifie.component';

describe('ListeUserVerifieComponent', () => {
  let component: ListeUserVerifieComponent;
  let fixture: ComponentFixture<ListeUserVerifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeUserVerifieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeUserVerifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
