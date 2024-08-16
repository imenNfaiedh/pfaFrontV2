import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Convention } from 'app/models/convention';
import { Partenaire } from 'app/models/partenaire';
import { ConventionService } from 'app/services/convention.service';
import { PartenaireService } from 'app/services/partenaire.service';

@Component({
  selector: 'app-view-partenaire',
  templateUrl: './view-partenaire.component.html',
  styleUrls: ['./view-partenaire.component.scss']
})
export class ViewPartenaireComponent implements OnInit {
  partenaire =  new Partenaire();
  convention : Convention;
  conventions: Convention[] = [];
  partenaireId: number;


   @Input() id: number; 

  constructor(
    private route: ActivatedRoute,
    private partenaireService: PartenaireService,
    private conventionService : ConventionService,
    private activeModal: NgbActiveModal,



  ) { }

  ngOnInit(): void {

    
    if ( (this.id)) {
      this.partenaireId = +this.id; // Convertir l'ID en nombre
      this.partenaireDetails(this.partenaireId);
      this.detailsConventions(this.partenaireId);

      
    }
  }

  partenaireDetails(id: number): void {
    this.partenaireService.getByIdPartner(id).subscribe(
      data => this.partenaire = data,
      error => console.error('Erreur lors de la récupération des détails du partenaire', error)
    );
  }

  detailsConventions(id: number): void {
    this.conventionService.getConventionsByPartenaireId(id).subscribe(
      data => this.conventions = data,
      error => console.error('Erreur lors de la récupération des conventions', error)
    );
  }

  close() {
    this.activeModal.dismiss();
  }

}
