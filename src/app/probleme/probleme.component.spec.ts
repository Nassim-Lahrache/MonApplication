import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], //Ajouté
      declarations: [ ProblemeComponent ]
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
  expect(errors['minlength']).toBeTruthy();
  });

  it('#2 - Zone Prénom valide avec 3 caractères ', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });

  it('#3 - Zone Prénom valide avec 200 caractères ', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });

  it('#4 - Zone Prénom invalide avec aucune valeur ', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');    
    errors = zone.errors || {};
    expect(zone.valid).toBeFalse();
    });

  it('#5 - Zone Prénom valide avec 10 espaces ', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue(' '.repeat(10));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });
      
  it('#6 - Zone Prénom valide avec 2 espaces et 1 caractère ', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });

});
