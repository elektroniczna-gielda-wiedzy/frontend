import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent {
  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        matchValidator('confirmPassword', true),
      ],
    ],
    repeatPassword: ['', [Validators.required, matchValidator('password')]],

  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
