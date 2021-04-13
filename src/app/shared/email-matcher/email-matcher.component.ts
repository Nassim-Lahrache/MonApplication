import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {
    static courrielDifferents(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
              return null;
            }
            // si c'est égale, on retourne NULL. sinon --> retourne la clé "match : true"
            return c['controls'].courriel.value === c['controls'].courrielConfirmation.value ? null : { unmatch: true };
        };
    }   
}