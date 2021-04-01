import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeProbleme';
import { CategorieService } from './categorie.service';
//import { PassThrough } from 'node:stream';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  categoriesProblemes: ITypeProbleme[];
  errorMessage: string;

  produitForm: any;

  constructor(private fb: FormBuilder,  private categories: CategorieService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required, ZonesValidator.longueurMinimum(3)]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noCategorie: ['', [Validators.required]],
     
      noTypeProbleme: ['', Validators.required], 

      courrielGroup: this.fb.group({
      courriel: [{value: '', disabled: true}],
      courrielConfirmation: [{value: '', disabled: true}],
      }),

      telephone: [{value: '', disabled: true}]
      
    });

    this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  

  } // ngOnInit

  // code à modifier venant du bloc-notes
  //datesGroup --> courrielGroup
	//dateCommande --> courriel
	//dateExpedition --> courrielConfirmation
  appliquerNotifications(typeCueillette: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');   
    const telephoneControl = this.problemeForm.get('telephone');

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invalides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();    
    telephoneControl.disable();


    if (typeCueillette === 'ParCourriel') {   
      courrielControl.setValidators([Validators.required]);      
      courrielControl.enable();  
      courrielConfirmationControl.setValidators([Validators.required]);              
      courrielConfirmationControl.enable();  
            // Si le validateur est dans un autre fichier l'écrire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])

            //courrielGroupControl.setValidators([Validators.compose([datesValides])]);     

      } else if(typeCueillette === 'ParTelephone') {
          courrielControl.setValidators([Validators.required]);      
          courrielControl.disable();           
        }
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
  save(): void {}
}
