import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { log } from 'console';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login-v1',
  templateUrl: './auth-login-v1.component.html',
  styleUrls: ['./auth-login-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV1Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public submitted = false;
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _coreConfigService: CoreConfigService, 
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router : Router,
    private _formBuilder: UntypedFormBuilder) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
   // this._unsubscribeAll.next();
   // this._unsubscribeAll.complete();
  }

  login() {
    console.log("hello !!!!")
    const user = {
      id: 1,
      email: 'admin@demo.com',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'avatar-s-11.jpg',
      role: 'Admin',
      token: 'fake-jwt-token.1'
    };

    // Stocker l'utilisateur dans le local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    const loginData = {
      username: this.loginForm.value.email,
      password : this.loginForm.value.password,
      
    };
    this.authService.login(loginData.username, loginData.password).subscribe(
      response => {
        const accessToken = response.access_token;
        
          this.authService.storeToken(accessToken);
          console.log('Login successful, token stored.');
        
        //  window.location.reload();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['dashboard/ecommerce']);
        });
        
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
  }

