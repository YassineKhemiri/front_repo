import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactByIdComponent } from './contact-by-id.component';

describe('ContactByIdComponent', () => {
  let component: ContactByIdComponent;
  let fixture: ComponentFixture<ContactByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
