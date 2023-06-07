import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^[a-z0-9]+[\._]?[a-z0-9]+[@]student[.]agh[.]edu[.]pl$/
        ),
      ],
    ],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.signInForm.value);
  }
}
