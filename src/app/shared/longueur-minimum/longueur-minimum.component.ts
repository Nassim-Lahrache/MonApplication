import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    // le paramètre indique 
    static longueurMinimum(longueur): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL, autrement retourner une [clé: valeur] JSON
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {

            if (valeurControle.value == null) {
                return { 'nbreCaracteresInsuffisants': true };
            }
            if (valeurControle.value.trim().length >= longueur && valeurControle.value.trim() != '') {
                return null;
            } return { 'nbreCaracteresInsuffisants': true };
        };
    }
}