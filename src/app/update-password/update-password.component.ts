import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../confirmPwd/confirmPwd';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  oldPassword: any;
  newPassword: any;
  form!: FormGroup;
  isSuccessful = false;
  passwordVisible: boolean = false;
  passwordVisible2: boolean = false;
  passwordVisible3: boolean = false;

  passwordErrors = {
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false
  };

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6), this.passwordPatternValidator]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });

    this.form.get('newPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordErrors();
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordVisibility2(): void {
    this.passwordVisible2 = !this.passwordVisible2;
  }

  togglePasswordVisibility3(): void {
    this.passwordVisible3 = !this.passwordVisible3;
  }

  checkPasswordErrors() {
    const newPassword = this.form.get('newPassword')?.value || '';
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
    if (this.form.invalid) {
      return;
    }  
    if (this.oldPassword && this.newPassword) {
      this.userService.changePwd(this.oldPassword, this.newPassword).subscribe({
        next: response => {
          console.log('Password changed successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Changé!',
            text: 'Votre mot de passe a été changé avec succès',
            confirmButtonColor: '#3085d6'
          });
          this.router.navigate(['/profile']);
        },
        error: err => {
          console.error('Failed to change password', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.error || 'Une erreur est survenue !',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }
}
