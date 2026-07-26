import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Exactly 10 digits. */
export const mobileNumberValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }
  return /^[0-9]{10}$/.test(control.value) ? null : { invalidMobile: true };
};

/** Exactly 12 digits. */
export const aadhaarValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }
  return /^[0-9]{12}$/.test(control.value) ? null : { invalidAadhaar: true };
};

/** Standard Indian PAN format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F). */
export const panValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(control.value)
    ? null
    : { invalidPan: true };
};

/** 6-digit Indian PIN code. */
export const pincodeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }
  return /^[0-9]{6}$/.test(control.value) ? null : { invalidPincode: true };
};

/**
 * Cross-field validator — attach to the parent FormGroup.
 * Flags `passwordMismatch` on the confirmPassword control so the
 * error can be displayed right under that field.
 */
export function passwordsMatchValidator(
  passwordKey: string,
  confirmKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey);
    const confirm = group.get(confirmKey);

    if (!password || !confirm) {
      return null;
    }

    if (confirm.value && password.value !== confirm.value) {
      confirm.setErrors({ ...confirm.errors, passwordMismatch: true });
    } else if (confirm.errors) {
      const { passwordMismatch, ...rest } = confirm.errors;
      confirm.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };
}