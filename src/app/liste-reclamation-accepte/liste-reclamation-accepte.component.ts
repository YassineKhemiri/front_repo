import { Component } from '@angular/core';
import { Reclamation } from '../models/reclamation';
import { ReclamtionService } from '../_services/reclamtion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-reclamation-accepte',
  templateUrl: './liste-reclamation-accepte.component.html',
  styleUrl: './liste-reclamation-accepte.component.css'
})
export class ListeReclamationAccepteComponent {
  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamtionService, private router: Router) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data.filter(reclamation => reclamation.status === 'APPROVED');
      },
      error => {
        console.error('Error fetching reclamations', error);
      }
    );
  }

  updateStatus(id: number, status: string): void {
    this.reclamationService.updateReclamationStatus(id, status).subscribe(
      response => {
        console.log('Status updated', response);
        if (status === 'APPROVED') {
          Swal.fire('Success', 'Reclamation approved', 'success').then(() => {
            this.router.navigate(['/listeReclamationAccepte']);
          });
        } else if (status === 'DENIED') {
          Swal.fire('Success', 'Reclamation denied', 'success').then(() => {
            this.router.navigate(['/listeReclamationRefuse']);
          });
        }
        this.loadReclamations(); // Reload data to see the updated status
      },
      error => {
        console.error('Failed to update status', error);
        Swal.fire('Error', 'Failed to update status', 'error');
      }
    );
  }

  downloadFile(id: number): void {
    this.reclamationService.downloadFile(id).subscribe(
      response => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `file_${id}`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => console.error('Error downloading file:', error)
    );
  }
}
