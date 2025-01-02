import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {
  private apiUrl = 'http://localhost:8881/process';

  constructor(
    private http: HttpClient
  ) { }


 // Récupérer la tâche par taskDefinitionKey et assignee
 getTasksByTaskDefinitionKeyAndAssignee(taskDefinitionKey: string, assignee: string): Observable<any[]> {
  const params = new HttpParams()
    .set('taskDefinitionKey', taskDefinitionKey)
    .set('assignee', assignee);
  
  return this.http.get<any[]>(`${this.apiUrl}/by-task-and-assignee`, { params });
}
  
// Terminer la tâche avec l'ID fourni
completeTask(taskId: string, request: any): Observable<string> {
  return this.http.post<string>(`${this.apiUrl}/complete-task`, { taskId, ...request });
}

}
