import { Component } from '@angular/core';
import { BrancheService } from '../_services/branche.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-branche',
  templateUrl: './add-branche.component.html',
  styleUrl: './add-branche.component.css'
})
export class AddBrancheComponent {

  branche: any = {};
  isSuccessful = false;
  errorMessage = '';

  test=true

  id:any
  title="ajouter branche"
  


  constructor(private brancheService:BrancheService , private activatedRoute:ActivatedRoute ,private router:Router ) { }


  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.paramMap.get("id")
    if (this.id){
      this.title="modifier branche"
      this.getbrancheById();
  }
  
}

add() {
  if (this.id) {
    // Edit branche
    this.brancheService.editBranche(this.branche).subscribe(
      (response: any) => {
        console.log('here response updated from BE', response);
        Swal.fire({
          icon: 'success',
          title: 'Modifié!',
          text: 'Branche Modifié avec succès !',
          confirmButtonColor: '#3085d6'
        });
        this.router.navigate(['/branches']);
      },
      (error) => {
        console.error('Error updating branche:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message || 'Une erreur est survenue !',
          confirmButtonColor: '#d33'
        });
      }
    );
  } else {
    // Add branche
    this.brancheService.addBranche(this.branche).subscribe(
      (response: any) => {
        console.log('here response from BE', response);
        Swal.fire({
          icon: 'success',
          title: 'Enregistré!',
          text: 'Branche Enregistré avec succès !',
          confirmButtonColor: '#3085d6'
        });
        this.router.navigate(['/branches']);
      },
      (error) => {
        console.error('Error adding branche:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message || 'Une erreur est survenue !',
          confirmButtonColor: '#d33'
        });
      }
    );
  }
  this.isSuccessful = true;
  this.router.navigate(['/branches']);
}


getbrancheById(){
  this.brancheService.getBrancheById(this.id).subscribe(
    (response)=>{console.log("here branche by id",response);
  this.branche=response
  }
  )
}


}
