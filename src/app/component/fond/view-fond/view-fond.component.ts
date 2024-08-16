import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Fond } from 'app/models/fond';
import { FondService } from 'app/services/fond.service';

@Component({
  selector: 'app-view-fond',
  templateUrl: './view-fond.component.html',
  styleUrls: ['./view-fond.component.scss']
})
export class ViewFondComponent implements OnInit {

  fonds: Fond[] = [];
  mode : string = ''
  @Input()  id : number | undefined;
  title: string 

  fondForm :  any ;
//pour le mode view 
  @Input() modeView: boolean
  

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private fondService : FondService,
    
    private router : Router,

    private activeModal: NgbActiveModal,



  ) { }

  ngOnInit() {
    console.log(" id with pop up modal" , this.id)
    let id ;
    if(this.id == null)
      
    { id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  } else {
    id = this.id;
  }
   
    

    //this.infoForm();
   
    if ( id  == null) {
      this.infoForm();
      this.title = "Ajout fond";
      this.mode ='add'
  
      
    }
    else { 
      console.log("mode view:::", this.modeView);


      this.mode ='update'
      this.id = +id
      this.title = "Modification fond";
      this.infoForm();
      this.fondService.getByIdFond(+id).subscribe(data => {
        console.log(data);
        this.fondForm.controls.nomCompletFond.setValue(data.nomCompletFond);
        this.fondForm.controls.dateDemarrageFond.setValue(data.dateDemarrageFond);
        this.fondForm.controls.dateClotureFond.setValue( data.dateClotureFond);
        this.fondForm.controls.montantMax.setValue(data.montantMax);
        this.fondForm.controls.montantMin.setValue(data.montantMin);
        

        if(this.modeView === true) {
          this.fondForm.get('nomCompletFond').disable()
          this.fondForm.get('montantMax').disable() 
          this.fondForm.get('montantMin').disable() 
          this.fondForm.get('dateDemarrageFond').disable() 
          this.fondForm.get('dateClotureFond').disable() 

        }

      });
      console.log("id line" , this.id);
     }
    
    }
    
    addFond(){
      if(this.mode == 'add'){   
       console.log(this.fondForm.value)
       


       const item = Object.assign({
       // "idFond" : this.fondForm.value.fond.idFond ,
        "montantMin" : this.fondForm.value. montantMin,
        "nomCompletFond" : this.fondForm.value.nomCompletFond,
        "montantMax" : this.fondForm.value.montantMax,
        "dateDemarrageFond" : this.fondForm.value.dateDemarrageFond,
        "dateClotureFond" : this.fondForm.value.dateClotureFond,
        

        

})
        this.fondService.createFond(this.fondForm.value).subscribe(
          data =>{ console.log("add ok " , data);
            
           this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
             this.router.navigate(['/listfonds']);
         });
          },
          error => {
            console.error('Error creating fond', error);
          }
        );
       }else {
 
 
 
         this.fondService. updateFond(this.id , this.fondForm.value).subscribe(
           data =>{ console.log(" update  ok " , data);
             this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
               this.router.navigate(['/listfonds']);
           });
           },
           error => {
             console.error('Error creating fonds', error);
           }
         );
       
       }
      }
    
 



  infoForm() {
    this.fondForm =  this.fb.group({
      idFond: null,
      nomCompletFond: ['', [Validators.required, Validators.minLength(5)]],
      montantMax: ['', [Validators.required]],
      montantMin:['', [Validators.required]],
      dateDemarrageFond: ['', [Validators.required]],
      dateClotureFond: ['', [Validators.required]],
      
    });
  }

  close() {
    this.activeModal.dismiss();
  }
 

}
