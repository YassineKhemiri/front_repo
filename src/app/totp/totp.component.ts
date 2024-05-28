import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css']
})
export class TotpComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getUser()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  }

  onSubmit(): void {
    this.authService.verify(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
        console.log("data send successfully" + data.user)

      },
      err => {
        console.log("error in sending data")
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user: any): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    //window.location.reload();

    if (this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['/admin']).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: `Bienvenue Admin ${this.currentUser.displayName}`,
          confirmButtonColor: '#28a745'
        });
      });
    } else {
      this.router.navigate(['/home']).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: `Bienvenue ${this.currentUser.displayName}`,
          confirmButtonColor: '#28a745'
        });
        window.location.reload();
      });
    }

  }
}

