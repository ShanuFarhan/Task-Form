import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function aadhaarNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const aadhaarNumber = control.value;
    const isValid = /^[0-9]{12}$/.test(aadhaarNumber);

    return isValid ? null : { invalidAadhaarNumber: true };
  };
}
export function panNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const panNumber = control.value;
      const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber);
  
      return isValid ? null : { invalidPanNumber: true };
    };
  }
  export function drivingLicenseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const drivingLicense = control.value;
  
      const drivingLicenseRegex = /^[A-Z]{2}\d{13}$/;
  
      const isValid = drivingLicenseRegex.test(drivingLicense);
  
      return isValid ? null : { invalidDrivingLicense: true };
    };
  }
  export function voterIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const voterId = control.value;
  
      const voterIdRegex = /^[A-Z]{3}\d{7}$/;
  
      const isValid = voterIdRegex.test(voterId);
  
      return isValid ? null : { invalidVoterId: true };
    };
  }
  export function contactNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const contactNumber = control.value;
        const isValid = /^[0-9]{10}$/.test(contactNumber);
  
      return isValid ? null : { invalidContactNumber: true };
    };
  }
  
