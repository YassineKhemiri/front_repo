import { Component, Input } from '@angular/core';
import { ContratService } from '../_services/contrat.service';
import{TokenStorageService} from '../_services/token-storage.service';
@Component({
  selector: 'app-listpaiements',
  templateUrl: './listpaiements.component.html',
  styleUrl: './listpaiements.component.css'
})
export class ListpaiementsComponent {
  payments: any[] = [];
  totalRecords!: number;
  loading!: boolean;

  constructor(private paymentService: ContratService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    if (user && user.id) {
      this.loadPayments(user.id, { first: 0, rows: 10 });
    } else {
      console.error('User ID not found in the token storage');
    }
  }

  loadPayments(userId: number, event: any): void {
    this.loading = true;
    this.paymentService.getPaymentsByUserId(userId).subscribe(
      (data) => {
        this.payments = data.slice(event.first, event.first + event.rows);
        this.totalRecords = data.length;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching payments', error);
        this.loading = false;
      }
    );
  }

  onPageChange(event: any): void {
    const user = this.tokenStorageService.getUser();
    if (user && user.id) {
      this.loadPayments(user.id, event);
    }
  }
}
