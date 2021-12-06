import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Environment } from "../../../../environments";

import { PageContentEvent } from "../../shared/components/page-content/page-content.model";
import { ItemsApiData } from "../../shared/models/items-api.model";
import { Learning, LearningsStatus } from "../../shared/models/learnings";
import { User } from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class LearningsApiService {
  private readonly API_URL: string = this.environment.API_URL;

  constructor(
    private readonly environment: Environment,
    private readonly httpClient: HttpClient
  ) { }

  getLearnings(query: PageContentEvent): Observable<ItemsApiData<Learning[]>> {
    const params = new HttpParams()
      .append('_page', `${query.pageIndex + 1}`)
      .append('_limit', `${query.pageSize}`)
      .append('name_like', `${query.search}`);

    return this.httpClient.get<Learning[]>(`${this.API_URL}learnings`, {
      params,
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<Learning[]>) => ({
        data: response.body as Learning[],
        totalCount: Number(response.headers.get('X-Total-Count'))
      }))
    )
  }

  createLearning(learning: Learning): Observable<Learning> {
    return this.httpClient.post<Learning>(`${this.API_URL}learnings`, {
      ...learning,
      status: LearningsStatus.ACTIVE
    });
  }

  deleteLearning({ id }: Learning): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}learnings/${id}`);
  }

  updateLearning(learning: Learning): Observable<Learning> {
    return this.httpClient.put<Learning>(`${this.API_URL}learnings/${learning.id}`, learning);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}users`);
  }

  updateUsers(users: User[]): Observable<User[]> {
    const users$: Observable<User>[] = users.map(
      (user: User) => this.httpClient.put<User>(`${this.API_URL}users/${user.id}`, user)
    );

    return forkJoin(...users$);
  }
}
