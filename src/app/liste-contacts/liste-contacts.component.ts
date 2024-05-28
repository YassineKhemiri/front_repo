import { Component } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.component.html',
  styleUrl: './liste-contacts.component.css'
})
export class ListeContactsComponent {

  contacts: any
  id: any


  constructor(private contactService: ContactService,  private router:Router) { }


  ngOnInit(): void {
    this.getAllbranches();
  }


  navigate(id:any){
    this.router.navigate(["/getContact/"+id])
  }

  

  getAllbranches() {
    this.contactService.getAllContacts().subscribe(
      data => {
        console.log("this is data :" + data);
        console.log(data);
        this.contacts = data;
        console.log("contact:" + this.contacts);

      },
      err => {
        console.log(err);
        console.log("there is error here");

      }
    );
  }


}
