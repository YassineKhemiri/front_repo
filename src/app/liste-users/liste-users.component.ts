// import { Component } from '@angular/core';
// import { UserService } from '../_services/user.service';

// @Component({
//   selector: 'app-liste-users',
//   templateUrl: './liste-users.component.html',
//   styleUrl: './liste-users.component.css'
// })
// export class ListeUsersComponent {

//   users: any
//   id: any


//   constructor(private userService: UserService) { }


//   ngOnInit(): void {
//     this.getAllUsers();
//   }

//   getAllUsers() {
//     this.userService.getAllUsers().subscribe(
//       data => {
//         console.log("this is users :" + data);
//         console.log(data);
//         this.users = data;
//         console.log("user :" + this.users);

//       },
//       err => {
//         console.log(err);
//         console.log("there is error here");

//       }
//     );
//   }


// }

// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../_services/user.service';

// @Component({
//   selector: 'app-liste-users',
//   templateUrl: './liste-users.component.html',
//   styleUrl: './liste-users.component.css'
// })
// export class ListeUsersComponent implements OnInit {

//   users: any[] = [];
//   id: any;

//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.getAllUsers();
//   }

//   getAllUsers() {
//     this.userService.getAllUsers().subscribe(
//       data => {
//         console.log("this is users :", data);
//         // Filtrer les utilisateurs pour exclure ceux avec le nom "Admin"
//         this.users = data.filter((user: any) => user.nom !== 'Admin');
//         console.log("filtered users :", this.users);
//       },
//       err => {
//         console.log(err);
//         console.log("there is error here");
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrl: './liste-users.component.css'
})
export class ListeUsersComponent implements OnInit {

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
        // Filtrer les utilisateurs pour exclure ceux avec le nom "Admin" et ceux dont le champ verified n'est pas égal à 2
        this.users = data.filter((user: any) => user.nom !== 'Admin' && user.verified === 2);
        console.log("filtered users :", this.users);
      },
      err => {
        console.log(err);
        console.log("there is error here");
      }
    );
  }
}

