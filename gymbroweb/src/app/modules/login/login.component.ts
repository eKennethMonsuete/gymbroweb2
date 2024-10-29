import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    private authService: AuthService,
    private messageService: MessageService
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

      this.authService.login(request).subscribe({
        next: (resposta) => {
          if (resposta.accessToken) {
            sessionStorage.setItem('user-info', resposta.accessToken);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            this.showErrorMessage = false;
          }
        },
        error: (err) => {
          this.showErrorMessage = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer o login!`,
            life: 2000,
          });
          console.log('Credenciais erradas');
          console.log(err);
        },
      });
    }
  }
}

// (resposta)  => {

//   console.log(resposta);
//   if (resposta.accessToken) {
//     sessionStorage.setItem('user-info', resposta.accessToken)
//     this.loginForm.reset();
//     this.router.navigate(['/dashboard']);
//   }
