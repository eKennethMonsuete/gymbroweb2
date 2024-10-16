import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email2: string = '123';
  senha: string = '123';
  showErrorMessage: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmitLogin(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      if (
        this.loginForm.value.email == this.email2 &&
        this.loginForm.value.password == this.senha
      ) {
        console.log('login feito com sucess');
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        this.showErrorMessage = true;
        console.log('invalido');
      }
    }
  }
}
