import { Component } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ContratService } from '../_services/contrat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contrat-by-id',
  templateUrl: './contrat-by-id.component.html',
  styleUrl: './contrat-by-id.component.css'
})
export class ContratByIdComponent {


  contrat: any = {};
  isSuccessful = false;
  errorMessage = '';

  id: any;

  constructor(private contratService: ContratService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getContactById();
    }
  }

  getContactById() {
    this.contratService.getContratById(this.id).subscribe(
      (response) => {
        console.log("here contrat by id", response);
        this.contrat = response;
        this.contrat.date_effet = this.extractDate(response.date);  // Transform the date here
        this.contrat.date_fin_effet = this.extractDate(response.date);  // Transform the date here
      },
      (error) => {
        console.error('Error fetching contact by id', error);
      }
    );
  }

  extractDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toISOString().split('T')[0];  // Extract only the date part
  }


  generatePdf() {
    const element :any = document.getElementById('theContent');
    html2canvas(element , {scale :2 }).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'),'PNG', 0, 0 , 211 ,298);
      pdf.save("contrat.pdf");
    });
    this.router.navigate(["/home"])
  }

}
