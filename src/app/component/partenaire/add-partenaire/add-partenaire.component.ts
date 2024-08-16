import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddConventionComponent } from 'app/component/convention/add-convention/add-convention.component';
import { Partenaire } from 'app/models/partenaire';
import { PartenaireService } from 'app/services/partenaire.service';

@Component({
  selector: 'app-add-partenaire',
  templateUrl: './add-partenaire.component.html',
  styleUrls: ['./add-partenaire.component.scss']
})
export class AddPartenaireComponent implements OnInit {

  partenaireForm : FormGroup;
  title:string;
  mode: string ='';
  partenaire : Partenaire;

  @Input()  id : number ; 






  constructor(
    public fb: FormBuilder,
    private partenaireService : PartenaireService,
    private router : Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    console.log("id with pop up modal", this.id); // Vérifie la valeur de l'ID passé en tant qu'Input
  
  let id;
  if (this.id == null) {
    id = this.route.snapshot.paramMap.get('id');
    console.log("ID from route", id); // Vérifie la valeur de l'ID récupéré depuis les paramètres de la route
  } else {
    id = this.id;
  }
   

    


    //const id = this.route.snapshot.paramMap.get('id');

    if(id==null)
    {
      this.infoForm();
      this.title="ajout partenaire";
      this.mode='add'
    }
    else{
      this.mode='update'
      this.id=+id
      this.title="Modification partenaire"
      this.infoForm();
      this.partenaireService.getByIdPartner(+id).subscribe(data=> {

        
        console.log(data);
        this.partenaireForm.controls.nomPartenaire.setValue(data.nomPartenaire);
        this.partenaireForm.controls.mail.setValue(data.mail);
       

      })
    }
  
  }

  addPartenaire(){

  
    if(this.mode == 'add'){   
     console.log(this.partenaireForm.value)
    
  
     const item = Object.assign({
                                 "nomPartenaire" : this.partenaireForm.value. nomPartenaire,
                                 "mail" : this.partenaireForm.value.mail,
                                 
  
     })
     console.log(item)
      this.partenaireService.createPartner(item).subscribe(
        data =>{ console.log("add ok " , data);
          
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
           this.router.navigate(['/listpartenaire']);
       });
        },
        error => {
          console.error('Error creating partenaire', error);
        }
      );
     }else {
  
  
  
       this.partenaireService. updatePartner(this.id , this.partenaireForm.value).subscribe(
         data =>{ console.log(" update  ok " , data);
           this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
             this.router.navigate(['/listpartenaire']);
         });
         },
         error => {
           console.error('Error creating partenaire', error);
         }
       );
     
     }
    }

  infoForm() {
    this.partenaireForm = this.fb.group({
      idPartenaire: null,
      nomPartenaire: ['', [Validators.required, Validators.minLength(5)]],
      mail: ['', [Validators.required]],
      bank :[null]
     
      
    });
  }

        
  addConvention(){

   /* this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/addconvention']);
  });*/
 const id = this.route.snapshot.paramMap.get('id');
    console.log('open pop up  add convention')
    console.log(id);

    const modalRef = this.modalService.open(AddConventionComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
    modalRef.componentInstance.id = id;
  }

  
 

    
  }


