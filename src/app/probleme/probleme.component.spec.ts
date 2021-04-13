import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { CategorieService } from './categorie.service';

import { ProblemeComponent } from './probleme.component';


describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], //Ajouté
      declarations: [ ProblemeComponent ],
      providers:[CategorieService]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('#1 Zone Prénom invalide avec 2 caractères ', () => {
  let errors = {};
  let zone = component.problemeForm.get('prenom');
  zone.setValue('a'.repeat(2));
  errors = zone.errors || {};
  expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });


  it('#2 - Zone Prénom valide avec 3 caractères ', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTrue();
    });


  it('#3 - Zone Prénom valide avec 200 caractères ', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTrue();
    });


  it('#4 - Zone Prénom invalide avec aucune valeur ', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');    
    errors = zone.errors || {};
    expect(zone.valid).toBeFalse();
    });

    
  it('#5 - Zone Prénom invalide avec 10 espaces ', () => {
    let validator = ZonesValidator.longueurMinimum(3);
    let zone = component.problemeForm.get('prenom');
    zone.setValue(' '.repeat(10));

    let result = validator(zone as AbstractControl);

    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

      
  it('#6 - Zone Prénom invalide avec 2 espaces et 1 caractère ', () => {
    
    let validator = ZonesValidator.longueurMinimum(3);
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    
    let result = validator(zone as AbstractControl);

    expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });



  it('Zone COURRIEL a la même valeur que la zone COURRIEL CONFIRMATION', () => {

    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('');
    zoneCourrielConfirmation.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielGroup']).toBeUndefined();
    });



  it('#15 - Zone TELEPHONE est désactivée quand ne pas me notifier ', () => {
  
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
    });

    
  it('#16 - Zone TELEPHONE est vide quand ne pas me notifier ', () => {
  
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
    });


  it('#17 - Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier ', () => {
  
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    // MISE À JOUR --> LE TEST MARCHE COMME CE QUI EST ECRIT CI-DESSOUS, MAIS EST CE QUE C'EST CA?
    expect(zone.status).not.toEqual('ENABLE');
    });
        

  it('#18 - Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier ', () => {
    
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
    });

 // *********************************SECTION DU TP12*********************************

 
  it('#19 - Zone TELEPHONE est désactivée quand notifier par courriel ', () => {
  
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
    });
  

  it('#20 - Zone ADRESSE COURRIEL est activée quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    //expect(zone.status).not.toEqual('DISABLE'); SI **ENABLE** NE MARCHE PAS
    // MISE À JOUR --> LE TEST MARCHE COMME CE QUI EST ECRIT CI-DESSOUS
    expect(zone.enabled).toBeTrue();
    });


  it('#21 - Zone CONFIRMER COURRIEL est activée quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    //expect(zone.status).not.toEqual('DISABLED'); SI **ENABLE** NE MARCHE PAS
    expect(zone.enabled).toBeTrue();
    });


  it('#22 - Zone ADRESSE COURRIEL est invalide SANS VALEUR quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    //status = disable, enable
    expect(zone.value).toBeNull();
    });


  it('#23 - Zone CONFIRMER COURRIEL est invalide SANS VALEUR quand notifier par courriel ', () => {
  
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation'); 
    //status = disable, enable
    expect(zone.value).toBeNull();
    });
  


//*******SECTION DU PATTERN*******
  it('#24 - Zone ADRESSE COURRIEL est invalide avec un format non conforme ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue('abc.com');

    let errors = {};
    errors = zone.errors || {};
    // **Pattern** --> doit respecter un modele de saisi des donnees (comme la nomenclature d'un courriel)
    expect(errors['pattern']).toBeTruthy(); 
    });


  //*******SECTION DES DÉTAILS DU VALIDATEUR À DÉVELOPPER******* 
  it('#25 - Zone ADRESSE COURRIEL --> (Sans valeur) et Zone CONFIRMER COURRIEL --> (Avec valeur) valide retourne null ', () => {
  
    component.appliquerNotifications('ParCourriel');

    //let zone01 = component.problemeForm.get('courrielGroup.courriel');
    let zone02 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');

    zone02.setValue('nassim@hotmail.com');
    // toBeTrue() --> retourne le boolean
    // toBeTruthy() --> par rapport a un objet (plus général)
    expect([groupe['controls'].courriel.errors['required']]).toBeTruthy();
  });


  it('#26 - Zone ADRESSE COURRIEL --> (Avec valeur) et Zone CONFIRMER COURRIEL --> (Sans valeur) valide retourne null ', () => {

    component.appliquerNotifications('ParCourriel');
    let errors = {};
    
    let zone01 = component.problemeForm.get('courrielGroup.courriel');
    //let zone02 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    zone01.setValue('nassim@hotmail.com');

    errors = groupe.errors || {};
    // la clé unmatch est pas la, donc on retourne un null --> car un des deux courriel est sans valeur. 
    // manque un --> return null
    // indentique --> null
    // different (mais avec valeur valide) --> { unmatch : true }
    expect(errors['unmatch']).toBeUndefined(); 
  });


  it('#27 - Zone ADRESSE COURRIEL et Zone CONFIRMER COURRIEL sont invalides si les valeurs sont DIFFÉRENTES quand notifier par courriel ', () => {
  
    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zone01 = component.problemeForm.get('courrielGroup.courriel');
    let zone02 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    zone01.setValue('nassim@hotmail.com');
    zone02.setValue('lahrache@hotmail.com');

    errors = groupe.errors || {};
    expect(errors['unmatch']).toBe(true);
  });


  it('#28 - Zone ADRESSE COURRIEL et Zone CONFIRMER COURRIEL sont valides si les valeurs sont INDENTIQUES quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zone01 = component.problemeForm.get('courrielGroup.courriel');
    let zone02 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    zone01.setValue('nassim@hotmail.com');
    zone02.setValue('nassim@hotmail.com');

    errors = groupe.errors || {};
    expect(errors['unmatch']).toBeUndefined(); 
  });


});
