import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/shared/models/auth/AuthRequest';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showErrorMessage: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmitLogin(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      const values = this.loginForm.value;
      const request: AuthRequest = {
        email: values.email ?? '',
        password: values.password ?? '',
      };
      this.authService.login(request).subscribe((resposta) => {
        console.log(resposta);
        if (resposta.accessToken) {
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
