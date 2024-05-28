import { Component } from '@angular/core';
import { BrancheService } from '../_services/branche.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-branches',
  templateUrl: './liste-branches.component.html',
  styleUrl: './liste-branches.component.css'
})
export class ListeBranchesComponent {

  branches: any
  id: any


  constructor(private brancheService: BrancheService,  private router:Router) { }


  ngOnInit(): void {
    this.getAllbranches();
  }

  deleteBranche(id:any){
    Swal.fire({
      title: "vous êtes sûre ?",
      text: "Vous ne pourrez pas annuler cela !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.brancheService.deleteBranche(id).subscribe(
          (response)=>{
          console.log("here response deleted from BE ",response);
          this.getAllbranches()
          }, 
          (err) => {
            console.error('Error deleting branche:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur de suppression !',
              text: err.error.message || 'Une erreur est survenue !',
              confirmButtonColor: '#dc3545'
            });
          }
        )
        Swal.fire({
          title: "supprimé!",
          text: "la branche a été supprimé.",
          icon: "success"
        });
      }
    });

    
  }

  navigate(id:any){
    this.router.navigate(["/add-branche/"+id])
  }

  

  navigate2(){
    this.router.navigate(["/add-branche/"])
  }

  getAllbranches() {
    this.brancheService.getAllBranches().subscribe(
      data => {
        console.log("this is data :" + data);
        console.log(data);
        this.branches = data;
        console.log("branche:" + this.branches);

      },
      err => {
        console.log(err);
        console.log("there is error here");

      }
    );
  }


}
