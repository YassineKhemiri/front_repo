import { Component } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-by-id',
  templateUrl: './contact-by-id.component.html',
  styleUrl: './contact-by-id.component.css'
})
export class ContactByIdComponent {

  contact: any = {};
  isSuccessful = false;
  errorMessage = '';

  id: any;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getContactById();
    }
  }

  getContactById() {
    this.contactService.getContactById(this.id).subscribe(
      (response) => {
        console.log("here contact by id", response);
        this.contact = response;
        this.contact.date = this.extractDate(response.date);  // Transform the date here
      },
      (error) => {
        console.error('Error fetching contact by id', error);
      }
    );
  }

  extractDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toISOString().split('T')[0];  // Extract only the date part
  }
}
