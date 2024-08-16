import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Fond } from 'app/models/fond';
import { FondService } from 'app/services/fond.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddFondComponent } from '../add-fond/add-fond.component';
import { ViewFondComponent } from '../view-fond/view-fond.component';

@Component({
  selector: 'app-list-fond',
  templateUrl: './list-fond.component.html',
  styleUrls: ['./list-fond.component.scss']
})
export class ListFondComponent implements OnInit {
  fonds  : Fond[] = [];
  title: string;
  modeView : boolean;

  @Input() rowData: any;

  public pagePosition = 3;


  constructor(
    private fondService : FondService,
    private router: Router,
    private modalService: NgbModal,
     

  ) { }

  ngOnInit(): void {

    this.title = "Liste des fonds";
    this.getAllFond();
  }


  getAllFond(): void {
  
      this.fondService.getAllFond().subscribe(data => {
        console.log("ici data :" , data);
        this.fonds = data;
        
      } )
    }


    delete(id: number): void {
      if (confirm('Voulez-vous vraiment supprimer ce fond ?')) {
        this.fondService.deleteFond(id).subscribe({
          next: (response) => {
            console.log("Fond supprimé:", response);
            // Supprimez l'élément supprimé de la liste locale
            this.fonds = this.fonds.filter(fond => fond.idFond !== id);
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du fond', err);
          }
        });
      }
    }

    update(id: any){
      console.log(id)
      this.router.navigate(['/addfonds', id])
    }

 /*   onClickView(id: number) {
      console.log(id)
      this.modeView = true;
      this.modalService.open(  AddFondComponent, {
        centered: true,
        backdrop: 'static',
        size: 'lg',
        windowClass: 'modal modal-primary'
  });
  
  
}*/
onClickView(id: number) {
  console.log(id);
  this.modeView = true;
  const modalRef = this.modalService.open(ViewFondComponent, {
    centered: true,
    backdrop: 'static',
    size: 'lg',
    windowClass: 'modal modal-primary'
  });
  modalRef.componentInstance.id = id;
  modalRef.componentInstance.modeView = this.modeView;
}




}
