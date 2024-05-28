// import { Component } from '@angular/core';
// import { TokenStorageService } from '../_services/token-storage.service';
// import { ContratService } from '../_services/contrat.service';
// import { loadStripe } from '@stripe/stripe-js';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-contrats',
//   templateUrl: './contrats.component.html',
//   styleUrl: './contrats.component.css'
// })
// export class ContratsComponent {

//   user:any
//   contrats:any
//   id:any

//   constructor(private token: TokenStorageService , private contratService:ContratService , private router:Router) { }

//   ngOnInit(): void {
//     this.user = this.token.getUser();
//     this.id=this.user.id;
//     this.getContrats(this.user.id);
//   }

//   getContrats(id:any){
//     this.contratService.getUserContrats(id).subscribe(
//       data => {
//         console.log("this is data :"+data);
//         console.log(data);
//         this.contrats = data;
//         console.log("contrat:"+this.contrats);

//       },
//       err => {
//         console.log(err);
//         console.log("there is error here");

//       }
//     );
//   }
//   async payForContrat(contratId: number) {
//     this.contratService.createPaymentSession(contratId).subscribe(async (sessionId: string) => {
//       if (sessionId.startsWith("Error:")) {
//         console.error("Failed to create session:", sessionId);
//         alert("Failed to create payment session. Please try again.");
//         return;
//       }

//       const stripe = await loadStripe('pk_test_51PG9CNLvE4Q0JCmFhoDb5P5rbPlGKjJBbvEedLa8STPVcf8svw6QzQqh5q33ao2tj0RZCqY1kJnZZrNhvPyWJ2AR00gLcrr9Qp');
//       if (stripe) {
//         stripe.redirectToCheckout({ sessionId: sessionId });
//       }
//     }, error => {
//       console.error("HTTP Error:", error);
//       alert("Failed to communicate with the server. Please try again.");
//     });
//   }

//   navigate(id:any){
//     this.router.navigate(["/getContrat/"+id])
//   }

// }

import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ContratService } from '../_services/contrat.service';
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent {

  user: any;
  contrats: any;
  id: any;

  constructor(
    private token: TokenStorageService, 
    private contratService: ContratService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.token.getUser();
    this.id = this.user.id;
    this.getContrats(this.user.id);
  }

  getContrats(id: any): void {
    this.contratService.getUserContrats(id).subscribe(
      data => {
        console.log("this is data :" + data);
        this.contrats = data;
        console.log("contrat:" + this.contrats);
      },
      err => {
        console.log(err);
        console.log("there is error here");
      }
    );
  } 
  

  async payForContrat(contratId: number): Promise<void> {
    this.contratService.createPaymentSession(contratId).subscribe(async (sessionId: string) => {
      if (sessionId.startsWith("Error:")) {
        console.error("Failed to create session:", sessionId);
        alert("Failed to create payment session. Please try again.");
        return;
      }

      const stripe = await loadStripe('pk_test_51PG9CNLvE4Q0JCmFhoDb5P5rbPlGKjJBbvEedLa8STPVcf8svw6QzQqh5q33ao2tj0RZCqY1kJnZZrNhvPyWJ2AR00gLcrr9Qp');
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: sessionId });
      }
    }, error => {
      console.error("HTTP Error:", error);
      alert("Failed to communicate with the server. Please try again.");
    });
  }

  navigate(id: any): void {
    this.router.navigate(["/getContrat/" + id]);
  }

}

