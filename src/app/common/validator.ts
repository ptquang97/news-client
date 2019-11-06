import {AbstractControl, FormGroup} from '@angular/forms';
declare const $: any;
export class Validator {
  public static loginIDRegex = /^[a-zA-Z0-9\@\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~\.]+$/;
  public static emailRegex = /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

  constructor() {
  }

  validateForm(form: FormGroup, field: string, validationMessages: any) {
    let messages = '';
    const control = form.get(field);
    if (control && !control.valid) {
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          messages = validationMessages[key];
          return messages;
        }
      }
    }
    return messages;
  }

  gotoError() {
    setTimeout(() => {
      const $firstError = $('.has-danger').first();
      if ($firstError.length > 0) {
        $('html, body').animate({
          scrollTop: $firstError.offset().top - $(window).height() / 3
        }, 70);
        return true;
      }
      return false;
    }, 200);
  }
}

