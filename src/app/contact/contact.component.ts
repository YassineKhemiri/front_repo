import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {

  contact: any = {};
  isSuccessful = false;
  errorMessage = '';

  test = true

  id: any

  constructor(private elementRef: ElementRef, private contactService: ContactService, private activatedRoute: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
  }



  add() {
      this.contactService.addContact(this.contact).subscribe(
        (response: any) => {
          console.log('here response from BE', response);
          Swal.fire({
            icon: 'success',
            title: 'Envoyé!',
            text: 'Contact Envoyé avec succès !',
            confirmButtonColor: '#3085d6'
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error adding contact:', error);}
        );
    this.isSuccessful = true;
   
  }

  mail = "mae.assurances@mae.tn";


  ngAfterViewInit() {
    this.setupInputs();
  }

  private setupInputs() {
    // Retrieve all elements with the class 'input'
    const inputs = this.elementRef.nativeElement.querySelectorAll('.input');

    // Properly typecast each node to HTMLElement
    const inputsArray = Array.from(inputs) as HTMLElement[];

    const focusFunc = (event: FocusEvent) => {
      const parent = (event.target as HTMLElement)?.parentNode as HTMLElement;
      if (parent) {
        parent.classList.add("focus");
      }
    };

    const blurFunc = (event: FocusEvent) => {
      const parent = (event.target as HTMLElement)?.parentNode as HTMLElement;
      if (parent && !(event.target as HTMLInputElement).value) {
        parent.classList.remove("focus");
      }
    };

    // Use forEach on the array with type assertion
    inputsArray.forEach((input: HTMLElement) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });
  }
}
