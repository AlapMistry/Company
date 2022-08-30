import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  constructor() { }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  alphaNumericOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!this.numberOnly(event) &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  isValidPassword(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode === 60 || charCode === 62) && (this.alphaNumericOnly)) {
      return false;
    }
    return true;
  }

  validateEmail(event: any): boolean {
    const emailValue = (event.which) ? event.which : event.srcElement.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
      return true;
    }
    return false;
  }
}
