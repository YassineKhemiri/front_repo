import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { MustMatch } from '../confirmPwd/confirmPwd';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;  // Ignore validation if value is empty
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const minLength = value.length >= 6;
    return !hasUpperCase || !hasNumber || !minLength ? { passwordStrength: 'Password must be at least 6 characters long, include an uppercase letter and a number.' } : null;
  };
}

function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value && !/^[a-zA-Z]+$/.test(value) ? { nonAlphabetic: 'Only alphabetic characters are allowed.' } : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  isUsing2FA = false;
  errorMessage = '';
  qrCodeImage = '';
  passwordErrors = {
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false
  };

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
      num: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      password: ['', [Validators.required,Validators.minLength(6), this.passwordPatternValidator]],
      matchingPassword: ['', [Validators.required]],
      using2FA: new FormControl(false)
      
    }, {
      validator: MustMatch('password', 'matchingPassword')
    });
  }

  checkPasswordErrors() {
    const newPassword = this.registerForm.get('newPassword')?.value || '';
    this.passwordErrors.lowercase = !/[a-z]/.test(newPassword);
    this.passwordErrors.uppercase = !/[A-Z]/.test(newPassword);
    this.passwordErrors.number = !/\d/.test(newPassword);
    this.passwordErrors.specialChar = !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  }

  passwordPatternValidator(control: any) {
    const value = control.value || '';
    const errors = {
      lowercase: !/[a-z]/.test(value),
      uppercase: !/[A-Z]/.test(value),
      number: !/\d/.test(value),
      specialChar: !/[!@#$%^&*(),.?":{}|<>]/.test(value)
    };

    if (errors.lowercase || errors.uppercase || errors.number || errors.specialChar) {
      return { pattern: errors };
    }

    return null;
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          console.log("sign up success");
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if (data.using2FA) {
            this.isUsing2FA = true;
            this.qrCodeImage = data.qrCodeImage;
          }
          Swal.fire({
            icon: 'success',
            title: 'Registered!',
            text: 'Votre inscription a été réalisée avec succès ! Un mail de vérification a été envoyé',
            confirmButtonColor: '#3085d6'
          });
        },
        err => {
          console.log("sign up failed");
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message || 'Une erreur est survenue !',
            confirmButtonColor: '#d33'
          });
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Informations Incorrects .',
        confirmButtonColor: '#d33'
      });
    }
  }
}
