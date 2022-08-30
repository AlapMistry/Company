import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_components/notification/notification.service';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth/auth.service';
import { UtilityService } from '../_services/utility/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  private returnUrl: string;

  constructor(
    private notificationService: NotificationService,
    private utilityService: UtilityService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,25})/)]],
      role: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    });
  
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.authService.logout();
  }

  get f() {
    return this.loginForm.controls;
  }

  alphaNumericOnly(event: any): boolean {
    return this.utilityService.alphaNumericOnly(event);
  }

  isValidPassword(event: any): boolean {
    return this.utilityService.isValidPassword(event);
  }

  onSubmit() {
    this.notificationService.clear();
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['userName'].value, this.f['password'].value, this.f['role'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.notificationService.error(error);
        });

    this.loading = false;
  }
}
