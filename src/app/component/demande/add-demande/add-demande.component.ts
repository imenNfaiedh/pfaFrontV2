import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeService } from 'app/services/demande.service';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit {

  demandeForm :  any ;

  constructor(
    public fb: FormBuilder,
    private demandeService : DemandeService,
    private router : Router,

  ) { }

  ngOnInit(): void {

    this.demandeForm =  this.fb.group({
      
      nameDemande: ['', [Validators.required]],
      idModalite: ['', [Validators.required]],
      idPartenaire:['', [Validators.required]],
     // projet:['', [Validators.required]],

     // credit:['', [Validators.required]],

      
    });

   
  }

  onSubmit(): void {
   
      this.demandeService.createDemande(this.demandeForm.value).subscribe(response => {
        console.log('Demande added successfully!', response);

        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/listdemande']);
      });
       },
       error => {
         console.error('Error creating demand', error);
       }
     
      );
    
  }

}
