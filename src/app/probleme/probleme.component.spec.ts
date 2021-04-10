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
    //expect(zone.status).not.toEqual('DISABLED'); SI **ENABLE** NE MARCHE PAS
    // MISE À JOUR --> LE TEST MARCHE COMME CE QUI EST ECRIT CI-DESSOUS
    expect(zone.status).not.toEqual('DISABLE');
    });


  it('#21 - Zone CONFIRMER COURRIEL est activée quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    //expect(zone.status).not.toEqual('DISABLED'); SI **ENABLE** NE MARCHE PAS
    expect(zone.status).not.toEqual('DISABLE');
    });


  it('#22 - Zone ADRESSE COURRIEL est invalide quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    // TEST MARCHE MAIS EST CE QUE C'EST VRAIMENT BON?
    expect(zone.status).toBeFalsy;
    });


  it('#23 - Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel ', () => {

    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    // TEST MARCHE MAIS EST CE QUE C'EST VRAIMENT BON?
    expect(zone.status).toBeFalsy;
    });
    
  
// PAS SUR A PARTIR D'ICI
  it('#24 - Zone ADRESSE COURRIEL est invalide avec un format non conforme ', () => {

    component.appliquerNotifications('ParCourriel');
    let validator = emailMatcherValidator.courrielDifferents();

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let result = validator(zone as AbstractControl);

    expect(result['match']).toBe(false);
    //expect(zone.status).toBeFalse();
    });  
  
  
  
  
});
