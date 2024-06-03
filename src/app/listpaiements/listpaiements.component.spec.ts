import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpaiementsComponent } from './listpaiements.component';

describe('ListpaiementsComponent', () => {
  let component: ListpaiementsComponent;
  let fixture: ComponentFixture<ListpaiementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListpaiementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListpaiementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
