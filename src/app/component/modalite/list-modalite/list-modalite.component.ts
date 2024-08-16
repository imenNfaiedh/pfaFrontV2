import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modalite } from 'app/models/modalite';
import { ModaliteService } from 'app/services/modalite.service';

@Component({
  selector: 'app-list-modalite',
  templateUrl: './list-modalite.component.html',
  styleUrls: ['./list-modalite.component.scss']
})
export class ListModaliteComponent implements OnInit {
  modalites : Modalite[] =[];
  title:string;

  public pageBasic = 5;

  constructor(
    private modaliteService : ModaliteService,
    private router : Router,

  ) { }

  ngOnInit(): void {
    this.title="Liste des modalités";
    this.getAllmodalite();
  }

  getAllmodalite(): void{
    this.modaliteService.getAllModalite().subscribe(data=>
    {
      console.log("ici data : " , data);
      this.modalites = data;
    }
    )
  }

  delete(id:number) :void{
    if(confirm('Voulez-vous vraiment supprimer cette modalité??'))
    {
      this.modaliteService.deletemodalite(id).subscribe({
        next:(Response)=>{
          console.log("modalite supprimé" , Response);
          this.modalites.filter(modalite => modalite.idModalite !== id);

          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/listmodalite']);
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
    this.router.navigate(['/addmodalite', id])
  }

}
