import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
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


  it('#15 - Zone TELEPHONE est désactivée quand ne pas me notifier ', () => {
  
    component.appliquerNotifications();
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
    });

    it('#16 - Zone TELEPHONE est vide quand ne pas me notifier ', () => {
  
      component.appliquerNotifications();
      let zone = component.problemeForm.get('telephone');
      expect(zone.value).toBeNull();
      });

    

      




});
