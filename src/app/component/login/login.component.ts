import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  //private router: Router


  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router : Router,
    
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    const loginData = {
      username: this.loginForm.value.username,
      password : this.loginForm.value.password,
      
    };
    this.authService.login(loginData.username, loginData.password).subscribe(
      response => {
        const accessToken = response.access_token;
        
          this.authService.storeToken(accessToken);
          console.log('Login successful, token stored.');

          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/listfonds']);
        });
        
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }


}
