import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;

  roles: string[] = ['saisie','verificateur', 'validateur'];  
 // token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJZTl3TE13WTlCeVFLMld0eC1ORGdPR3hWUmRYZ3d2R3RjVDVGeHR5LTVrIn0.eyJleHAiOjE3MjMxNTY3MzMsImlhdCI6MTcyMzE1NjQzMywianRpIjoiMWZlYjdkZjYtMWU4MC00N2ZmLWIyNzktNmE4NmIwZmQ4NzIyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9wZmFSZWFsbSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI1YWJjY2Q3Ny1mN2NmLTRlMWItOTViYy1kMjNiNjE2NWI4NWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwZmFDbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1wZmFyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLXVzZXJzIl19LCJwZmFDbGllbnQiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEyNy4wLjAuMSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1wZmFjbGllbnQiLCJjbGllbnRBZGRyZXNzIjoiMTI3LjAuMC4xIiwiY2xpZW50X2lkIjoicGZhQ2xpZW50In0.EJfqHTFvOR5SGxMyzyl-OwcoEucNM0hrppb460vayABT-7Q_OAAnU6l131eSAC54KON6RJS_7x4121DIU17RlGpwCqk4W5k1N4IjCRZXE4fM-e0zqCLVrma0_Xtymrq6fDuWh6wHalWfsJFwqIELwe4AiRhuzrlYFAIb0EPn5A8bgGJ6k2tzbyun614OGEYIUH35-t6VtdVhzyeFXpua03wA5W8YlgFSbreOT0iCtyP8Wl3sXO3oKhVjJnpagO8lq88P4X87BwtcT4CzT5KICzZFDdiH5QV9vXeZR4At3RxfZr5pdh2MLqvfLpkt294p5Vvz2SdoN1dMc2Z7gQ9Wsw"
  
  constructor(
    private authService : AuthService,
    private formBuilder: UntypedFormBuilder,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
     // registerForm :Cette propriété est utilisée pour stocker l'objet FormGroup qui représente le formulaire.
  
    //FormBuilder, un service fourni par Angular qui permet de créer des formulaires réactifs facilement.

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleName: ['', Validators.required]
    });
    
    
  }

  get f() { 
    return this.registerForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
  
    // Create a user object with the form data
    const user = {
      firstName :this.registerForm.value.firstName,
      lastName :this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roleName: this.registerForm.value.roleName

     // enabled: true,
     /* credentials: [{
        type: 'password',
        value: this.registerForm.value.password,
        temporary: false
      }]*/
    };
  
    
      this.authService.createUser( user).subscribe(
        response => {
          console.log('User created successfully:', response);
          // Affichage de la notification
          
          
         this.toastr.success('👋User created successfully!', 'Success!', {
            toastClass: 'toast ngx-toastr',
            
          });
        

          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/auth']);
        });
        },
        error => {
          console.error('Error creating user:', error);
        }
      );
    
  }

}

