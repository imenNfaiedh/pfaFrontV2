import { Component, OnInit } from '@angular/core';
import { Demande } from 'app/models/demande';
import { DemandeService } from 'app/services/demande.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {
  demandes : Demande []=[];

  constructor(
    private demandeService : DemandeService,
  ) { }

  ngOnInit(): void {

    this.getAllDemande();

  }

  getAllDemande(): void {
  
    this.demandeService.getAllDemande().subscribe(data => {
      console.log("ici data :" , data);
      this.demandes = data;
      
    } )
  }

}
