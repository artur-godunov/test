import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Environment } from "../../../../environments";

import { User } from "../../shared/models/user";
import { Learning } from "../../shared/models/learnings";
import { PageContentEvent } from "../../shared/components/page-content/page-content.model";
import { ItemsApiData } from "../../shared/models/items-api.model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly API_URL: string = this.environment.API_URL;

  constructor(
    private readonly environment: Environment,
    private readonly httpClient: HttpClient
  ) { }

  getUsers(query: PageContentEvent): Observable<ItemsApiData<User[]>> {
    const params = new HttpParams()
      .append('_page', `${query.pageIndex + 1}`)
      .append('_limit', `${query.pageSize}`)
      .append('name_like', `${query.search}`);

    return this.httpClient.get<User[]>(`${this.API_URL}users`, {
      params,
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<User[]>) => ({
        data: response.body as User[],
        totalCount: Number(response.headers.get('X-Total-Count'))
      }))
    )
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.API_URL}users`, {
      ...user,
      learningsId: []
    });
  }

  deleteUser({ id }: User): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}users/${id}`);
  }

  getUsersLearnings(learnings: number[]): Observable<string[]> {
    const regexp = '^('
      + learnings.reduce((learningsIdAcc: string, learnings: number, i: number) =>
          learningsIdAcc + (i > 0 ? '|' : '') + learnings, '')
      + ')$';

    const params = new HttpParams()
      .append('id_like', `${regexp}`);

    return this.httpClient.get<Learning[]>(`${this.API_URL}learnings`, { params })
      .pipe(
        map((learnings: Learning[]) => learnings.map((learning: Learning) => learning.name))
      );
  }
}
