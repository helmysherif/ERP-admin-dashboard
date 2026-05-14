import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../components/services/translation.service';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    TranslatePipe,
    SelectModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  currentTheme: 'light' | 'dark' = 'light';
  private translationService = inject(TranslationService);
  private fb = inject(NonNullableFormBuilder);
  selectedOptionIndex: number = 0;
  currentLanguage: 'ar' | 'en' = 'ar';
  showPassword: boolean = false;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });
  ngOnInit() {
    this.translationService.currentTheme.subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      },
    );
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  displayError(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required') && (control.touched || control.dirty)) {
      return this.currentLanguage === 'ar'
        ? `${controlName} مطلوب`
        : `${controlName} is required`;
    }
    if (control?.hasError('minlength') && (control.touched || control.dirty)) {
      const requiredLength = control.getError('minlength').requiredLength;
      return this.currentLanguage === 'ar'
        ? `${controlName} يجب أن يكون على الأقل ${requiredLength} أحرف`
        : `${controlName} must be at least ${requiredLength} characters long`;
    }
    return '';
  }
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
