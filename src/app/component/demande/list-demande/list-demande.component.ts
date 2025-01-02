import { Component, OnInit } from '@angular/core';
import { Demande } from 'app/models/demande';
import { CamundaService } from 'app/services/camunda.service';
import { DemandeService } from 'app/services/demande.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {
  demandes : Demande []=[];

  constructor(
    private demandeService : DemandeService,
    private camundaService : CamundaService
  ) { }

  ngOnInit(): void {

    this.getAllDemande();

  }

  getAllDemande(): void {
  
    this.demandeService.getAllDemande().subscribe(data => {
      console.log("ici data :" , data);
      this.demandes = data;
      
    } )
  }

  verifyDemande(demande: any) {
    const taskDefinitionKey = 'saisiepreleminaire'; // Remplacez par la clé de définition de tâche
    const assignee = 'nfaiedh'; // Remplacez par l'assigné réel

    this.camundaService.getTasksByTaskDefinitionKeyAndAssignee(taskDefinitionKey, assignee).subscribe(tasks => {
      const task = tasks.find(t => t.idDemande === demande.id);
      if (task) {
        this.completeTask(task.id);
      } else {
        console.error('Aucune tâche trouvée pour cette demande');
      }
    });
  }


  completeTask(taskId: string) {
    if (!taskId) {
      console.error('Task ID is missing');
      return;}

    const request = {
      assignee: 'nfaiedh',
      
      // Ajoutez d'autres variables si nécessaire
    };

    this.camundaService.completeTask(taskId, request).subscribe(response => {
      console.log('Tâche terminée avec succès', response);
      this.getAllDemande(); // Recharger les demandes après la vérification
    }, error => {
      console.error('Erreur lors de la terminaison de la tâche', error);
    });
  }

}
