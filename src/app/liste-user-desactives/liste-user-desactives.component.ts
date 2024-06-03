import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-user-desactives',
  templateUrl: './liste-user-desactives.component.html',
  styleUrl: './liste-user-desactives.component.css'
})
export class ListeUserDesactivesComponent {
  users: any[] = [];
  id: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        console.log("this is users :", data);
        // Filtrer les utilisateurs pour exclure ceux avec le nom "Admin"
        this.users = data.filter((user: any) => user.nom !== 'Admin'&& user.verified === 3);
        console.log("filtered users :", this.users);
      },
      err => {
        console.log(err);
        console.log("there is error here");
      }
    );
  }

  reactiver(user: any){
    Swal.fire({
      title: "vous êtes sûre ?",
      text: "Vous ne pourrez pas annuler cela !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui,Reactive-le!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.ReactiverUser(user).subscribe(
          (response)=>{
          console.log("here account activated from BE ",response);
          }, 
          (err) => {
            console.error('Error activating account:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur de Reactivation !',
              text: err.error.message || 'Une erreur est survenue !',
              confirmButtonColor: '#dc3545'
            });
          }
        )
        Swal.fire({
          title: "Reactivé!",
          text: "le compte a été Reactivé.",
          icon: "success"
        });
      }
    });


  }
}
