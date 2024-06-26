import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './_services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  private userSubscription!: Subscription;
  user: any = {};
  User: any;
  id: any
  image: any
  safeImage: SafeUrl | null = null;
  userStorage: any = {};

  constructor(private router: Router, private tokenStorageService: TokenStorageService, private userService: UserService, private sanitizer: DomSanitizer) {

   }

  ngOnInit(): void {

    // Subscribe to the currentUser observable to reactively update on user changes
    this.userSubscription = this.tokenStorageService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.User = user;
      if (user) {
        this.roles = user.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.username = user.displayName;
        this.id = user.id;
      } else {
        // Reset view state when logged out
        this.roles = [];
        this.showAdminBoard = false;
        this.username = undefined;
        this.id = undefined;
      }
    });
    // this.userStorage = this.tokenStorageService.getUser();
     this.getUserById();
    // console.log("this is user storage: ", this.userStorage);
    // console.log("this is user : ", this.user);
    // console.log("this is image : ", this.image);

  }

  getSafeImage(image: string | null): SafeUrl | null {
    if (image) {
      const imageUrl = 'data:image/png;base64,' + image;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    // No longer need to reload the window; UI will reactively adjust due to the subscription

  }

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getUserById() {
    this.userService.getUserById(this.User.id).subscribe(
      (response) => {
        console.log("here user by id from BE", response);
        this.user = response
        this.image = this.user.image;
        console.log("this is image : ", this.image);
        this.safeImage = this.getSafeImage(this.image)
      }
    )
  }
}
