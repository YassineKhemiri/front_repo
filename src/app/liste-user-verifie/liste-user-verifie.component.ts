import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-liste-user-verifie',
  templateUrl: './liste-user-verifie.component.html',
  styleUrl: './liste-user-verifie.component.css'
})
export class ListeUserVerifieComponent {
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
        this.users = data.filter((user: any) => user.nom !== 'Admin'&& user.verified === 1);
        console.log("filtered users :", this.users);
      },
      err => {
        console.log(err);
        console.log("there is error here");
      }
    );
  }
}
