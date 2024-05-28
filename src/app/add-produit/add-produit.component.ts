// import { Component } from '@angular/core';
// import { TokenStorageService } from '../_services/token-storage.service';
// import { ProduitService } from '../_services/produit.service';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-add-produit',
//   templateUrl: './add-produit.component.html',
//   styleUrl: './add-produit.component.css'
// })
// export class AddProduitComponent {

//   produit: any = {};
//   IconFile: File | null = null;
//   ImageFile: File | null = null;

//   id: any;
//   title = "ajouter produit"


//   constructor(private tokenStorageService: TokenStorageService, private activatedRoute: ActivatedRoute, private produitService: ProduitService, private router: Router) { }

//   ngOnInit(): void {

//     this.id = this.activatedRoute.snapshot.paramMap.get("id")
//     if (this.id) {
//       this.title = "modifier produit"
//       this.getproduitById();
//     }
//   }
 
//   onFileChange(event: Event): void {
//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
//     if (fileList) {
//       this.ImageFile = fileList[0];
//     } else {
//       this.ImageFile = null;
//     }
//   }

//   onFileChange2(event: Event): void {
//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
//     if (fileList) {
//       this.IconFile = fileList[0];
//     } else {
//       this.IconFile = null;
//     }
//   }

//   onSubmit(form: NgForm): void {
//     if (!form.valid) {
//       alert('Please fill all required fields.');
//       return;
//     }
//     if (this.IconFile && this.ImageFile && this.id) {

//       this.produitService.editProduit(this.IconFile,this.ImageFile,this.produit).subscribe({
//         next: response => {
//           console.log('Produit updated successfully', response);
//           alert('Produit updated successfully');
//         },
//         error: error => {
//           console.error('Failed to update Produit', error);
//           alert('Failed to update Produit: ' + error.message);
//         }
//       });
//     } else if (this.IconFile && this.ImageFile && !this.id) {
//       this.produitService.addProduit(this.IconFile, this.ImageFile, this.produit).subscribe({
//         next: response => {
//           console.log('Produit submitted successfully', response);
//           alert('Produit submitted successfully');
//         },
//         error: error => {
//           console.error('Failed to submit Produit', error);
//           alert('Failed to submit Produit: ' + error.message);
//         }
//       });
//     } else {
//       alert('Please attach a file.');
//     }
//   }


//   getproduitById() {
//     this.produitService.getProduitById(this.id).subscribe(
//       (response) => {
//         console.log("here produit by id", response);
//         this.produit = response
//       }
//     )
//   }
// }

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProduitService } from '../_services/produit.service';
import { BrancheService } from '../_services/branche.service'; // Add this import
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  produit: any = {};
  IconFile: File | null = null;
  ImageFile: File | null = null;
  branches: any[] = []; // Add this to store branches
  selectedBrancheId: number | null = null; // Add this to store selected branche ID

  id: any;
  title = "ajouter produit"

  constructor(private tokenStorageService: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private produitService: ProduitService,
              private brancheService: BrancheService, // Add this
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    if (this.id) {
      this.title = "modifier produit"
      this.getproduitById();
    }

    this.loadBranches(); // Load branches when component initializes
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.ImageFile = fileList[0];
    } else {
      this.ImageFile = null;
    }
  }

  onFileChange2(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.IconFile = fileList[0];
    } else {
      this.IconFile = null;
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill all required fields.');
      return;
    }
    if (this.IconFile && this.ImageFile && this.selectedBrancheId && this.id) {
      this.produitService.editProduit(this.IconFile, this.ImageFile, this.produit, this.selectedBrancheId).subscribe({
        next: response => {
          console.log('Produit updated successfully', response);
          //alert('Produit updated successfully');
          Swal.fire({
            icon: 'success',
            title: 'Modifié!',
            text: 'Produit Modifié avec succès !',
            confirmButtonColor: '#3085d6'
          });
          this.router.navigate(['/listeProduit']);

        },
        error: error => {
          console.error('Failed to update Produit', error);
          //alert('Failed to update Produit: ' + error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message || 'Une erreur est survenue !',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else if (this.IconFile && this.ImageFile && this.selectedBrancheId && !this.id) {
      this.produitService.addProduit(this.IconFile, this.ImageFile, this.produit, this.selectedBrancheId).subscribe({
        next: response => {
          console.log('Produit submitted successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Enregistré!',
            text: 'Produit Enregistré avec succès !',
            confirmButtonColor: '#3085d6'
          });
          this.router.navigate(['/listeProduit']);
          //alert('Produit submitted successfully');
        },
        error: error => {
          console.error('Failed to submit Produit', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message || 'Une erreur est survenue !',
            confirmButtonColor: '#d33'
          });
         // alert('Failed to submit Produit: ' + error.message);
        }
      });
    } else {
      alert('Please attach a file and select a branch.');
    }
  }

  getproduitById() {
    this.produitService.getProduitById(this.id).subscribe(
      (response) => {
        console.log("here produit by id", response);
        this.produit = response;
        this.selectedBrancheId = response.branche.id; // Set the selected branch ID
      }
    );
  }

  loadBranches() {
    this.brancheService.getAllBranches().subscribe(
      (response) => {
        this.branches = response;
        console.log('Branches loaded successfully', response);
      },
      (error) => {
        console.error('Failed to load branches', error);
      }
    );
  }
}

