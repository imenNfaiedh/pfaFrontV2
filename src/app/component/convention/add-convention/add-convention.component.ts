import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Convention } from 'app/models/convention';
import { Modalite } from 'app/models/modalite';
import { ConventionService } from 'app/services/convention.service';
import { ModaliteService } from 'app/services/modalite.service';
import { data } from 'autoprefixer';
import { log } from 'console';

@Component({
  selector: 'app-add-convention',
  templateUrl: './add-convention.component.html',
  styleUrls: ['./add-convention.component.scss']
})
export class AddConventionComponent implements OnInit {
  conventionForm : FormGroup;
  @Input() id: number ;

  //1
  modaliteList : Modalite[] =[];
   

  //add convention
 /* public items = [{ idConvention: '', partenaireId: '', modaliteId: '', dateSignature: '' }];

  public item = {
    partenaireId: '',
    modaliteId: '',
    dateSignature: ''
  };*/


  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    private conventionService: ConventionService ,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,

//2
    private modaliteService : ModaliteService,



) { }

  ngOnInit(): void {
    

    console.log("id  =>" , this.id)

// 3 pour la creationd une liste des modalités 
this.modaliteService.getAllModalite().subscribe(
  rep => {this.modaliteList = rep},
  err => {console.log(err);}
)
    

    this.infoForm();
    console.log('Formulaire initialisé:', this.conventionForm);


  }

  infoForm() {
    this.conventionForm = this.fb.group({
      idConvention: null,
      partenaireId: [ null],
      modaliteId: [ null  ],
      sigantureDate :['', [Validators.required]],
    
     
      
    });
  }


  addConvention() {
    if (this.conventionForm.valid) {
      console.log(this.conventionForm.value)
      
      
      // Créez un objet Convention à partir des données du formulaire
      const item: Convention = {
        partenaireId: this.id,
        modaliteId: this.conventionForm.value.modaliteId,
        sigantureDate: new Date(this.conventionForm.value.sigantureDate)
      };
  
      console.log('Données à envoyer au serveur:', item);
  
      // Utilisez le service pour envoyer les données au backend
      this.conventionService.createConvention(item).subscribe(
        data => {
          console.log('Convention ajoutée avec succès', data);
          // Vous pouvez rediriger ou fermer la modal après succès
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la convention', error);
        }
      );
    } else {
      console.log("not valid")
      console.log(this.conventionForm)
      console.log(this.conventionForm.errors)
    }
  }

  close() {
    this.activeModal.dismiss();
  }
  

 /* addItem() {
    this.items.push({
      idConvention: '',
      partenaireId: '',
      modaliteId: '',
      dateSignature: ''
    });
  }

  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  } */ 
  
  
 
}
