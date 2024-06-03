import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-liste-user-non-verifie',
  templateUrl: './liste-user-non-verifie.component.html',
  styleUrl: './liste-user-non-verifie.component.css'
})
export class ListeUserNonVerifieComponent {
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
        this.users = data.filter((user: any) => user.nom !== 'Admin'&& user.verified === 0);
        console.log("filtered users :", this.users);
      },
      err => {
        console.log(err);
        console.log("there is error here");
      }
    );
  }
}
