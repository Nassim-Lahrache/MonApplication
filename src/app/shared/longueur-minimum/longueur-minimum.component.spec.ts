import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {

    it('#7 | une chaine avec 10 espaces est invalide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: ' '.repeat(10) };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#8 | une phrase avec des mots est valide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: 'vive Angular' };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result).toBeNull();
    });

    it('#9 | une phrase avec des mots est valide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '   je le veux   ' };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result).toBeNull();
    });


    it('#10 | une phrase avec 1 espace et 2 caractères est invalide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: ' ' + 'x'.repeat(2) };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#11 | une phrase avec 2 espaces et 1 caractère est invalide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '  ' + 'x'.repeat(1) };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#12 | une phrase avec 3 espaces et 3 caractères est valide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '   ' + 'x'.repeat(3) };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result).toBeNull();
    });

    it('#13 | une phrase avec 5 espaces et 5 caractères et 5 espaces est valide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '     ' + 'x'.repeat(5) + '     ' };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result).toBeNull();
    });

    it('#14 | une chaîne nulle est invalide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: null };

        // faire l'appel du validateur
        let result = validator(control as AbstractControl);

        // comparer le résultat OBTENU avec le résultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });


});