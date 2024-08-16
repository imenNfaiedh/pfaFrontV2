import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fond } from 'app/models/fond';
import { Modalite } from 'app/models/modalite';
import { TypeModalite } from 'app/models/modalite-type.enum';
import { FondService } from 'app/services/fond.service';
import { ModaliteService } from 'app/services/modalite.service';
import { data } from 'autoprefixer';

@Component({
  selector: 'app-add-modalite',
  templateUrl: './add-modalite.component.html',
  styleUrls: ['./add-modalite.component.scss']
})
export class AddModaliteComponent implements OnInit {

  modaliteForm:FormGroup;
  title:string;
  mode: string ='';
  modalite : Modalite;
  id : number;
  
  idFond : number;
  

//list fonds
  fondList : Fond[] = [];

  //select typemodalite
  //typeModalite = Object.values(TypeModalite);


  

  constructor(
    public fb: FormBuilder,
    private modaliteService : ModaliteService,
    private router : Router,
    private route: ActivatedRoute,

    private fondService : FondService,
  ) { }

  ngOnInit(): void {
    


    // pour la creation d une liste des fonds 
    this.fondService.getAllFond().subscribe(
      rep =>{this.fondList = rep},
      err =>{console.error(err);}
    );

    //Récupération de l'identifiant de la Modalite
    const id = this.route.snapshot.paramMap.get('id');

    if(id==null)
    {
      this.infoForm();
      this.title="ajout modalite";
      this.mode='add'
    }
    else{
      this.mode='update'
      this.id=+id
      this.title="Modification Modalité"
      this.infoForm();
      this.modaliteService.getByIdModalite(+id).subscribe(data=> {

        
        console.log(data);
        this.modaliteForm.controls.nomCompletModalite.setValue(data.nomCompletModalite);
        this.modaliteForm.controls.montantMax.setValue(data.montantMax);
        this.modaliteForm.controls.montantMin.setValue(data.montantMin);
        //this.modaliteForm.controls.fond.setValue(data.listFonds);

        this.modaliteForm.controls.fondId.setValue(data.fondId);
        this.modaliteForm.controls.typeModalite.setValue(data.typeModalite);

      })
    }
  
  }

  


addModalite(){

  
  if(this.mode == 'add'){   
   console.log(this.modaliteForm.value)
   console.log(this.idFond)

   debugger;
   const item = Object.assign({"fondId" : this.modaliteForm.value.fondId ,
                               "montantMin" : this.modaliteForm.value. montantMin,
                               "nomCompletModalite" : this.modaliteForm.value.nomCompletModalite,
                               "montantMax" : this.modaliteForm.value.montantMax,
                               "typeModalite" : this.modaliteForm.value.typeModalite,
                               

   })
   console.log(item)
    this.modaliteService.createModalite(item).subscribe(
      data =>{ console.log("add ok " , data);
        
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.router.navigate(['/listmodalite']);
     });
      },
      error => {
        console.error('Error creating modalite', error);
      }
    );
   }else {



     this.modaliteService. updateModalite(this.id , this.modaliteForm.value).subscribe(
       data =>{ console.log(" update  ok " , data);
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
           this.router.navigate(['/listmodalite']);
       });
       },
       error => {
         console.error('Error creating modalite', error);
       }
     );
   
   }
  }



  infoForm() {
    this.modaliteForm = this.fb.group({
    idModalite: null,
    nomCompletModalite: ['', [Validators.required, Validators.minLength(5)]],
    montantMax: ['', [Validators.required]],
    montantMin:['', [Validators.required]],
    fondId:[null],
    typeModalite:['', [Validators.required]],

     
      
    });
  }

}
