import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partenaire } from 'app/models/partenaire';
import { PartenaireService } from 'app/services/partenaire.service';
import { ViewPartenaireComponent } from '../view-partenaire/view-partenaire.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-partenaire',
  templateUrl: './list-partenaire.component.html',
  styleUrls: ['./list-partenaire.component.scss']
})
export class ListPartenaireComponent implements OnInit {

  partenaire : Partenaire[]=[];
  title : string;

  constructor(
    private partenaireService : PartenaireService,
    private router : Router,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.title="Liste des partenaires";
    this.getAllmodalite();
  

  }

  getAllmodalite(): void{
    this.partenaireService.getAllPartner().subscribe(data=>
    {
      console.log("ici data : " , data);
      this.partenaire = data;
    }
    )
  }


  delete(id:number) :void{
    if(confirm('Voulez-vous vraiment supprimer cette partenaire??'))
    {
      this.partenaireService.deletePartner(id).subscribe({
        next:(Response)=>{
          console.log("partenaire supprimé" , Response);
          this.partenaire.filter(partenaire => partenaire.idPartenaire !== id);

          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/listpartenaire']);
        });
        },
        error:(err) =>{
          console.error('erreur lors de la supression' , err);
        }
      });
    }
  }

  update(id: any){
    console.log(id)
    this.router.navigate(['/addpartenaire', id])
  }


  onClickView(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(ViewPartenaireComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
    console.log('Référence du modal:', modalRef);

    modalRef.componentInstance.id = id;
    
  }
}
