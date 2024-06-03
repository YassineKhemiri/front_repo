import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUserNonVerifieComponent } from './liste-user-non-verifie.component';

describe('ListeUserNonVerifieComponent', () => {
  let component: ListeUserNonVerifieComponent;
  let fixture: ComponentFixture<ListeUserNonVerifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeUserNonVerifieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeUserNonVerifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
