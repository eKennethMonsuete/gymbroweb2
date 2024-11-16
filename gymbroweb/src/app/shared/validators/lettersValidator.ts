import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado para permitir apenas letras
export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      return { onlyLetters: true };
    }
    return null;
  };
}
