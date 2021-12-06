import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil, tap } from "rxjs/operators";

import { UsersApiService } from "../../services/users-api.service";
import { DialogService } from "../../../shared/components/dialog/dialog.service";

import { User } from "../../../shared/models/user";
import { ListItemElement } from "../../../shared/components/list/list.model";
import { DialogCreateData } from "../../../shared/components/dialog/dialog-create/dialog-create.model";
import { DialogConfirmData } from "../../../shared/components/dialog/dialog-confirm/dialog-confirm.model";
import { DIALOG_CONFIRM_DATA, DIALOG_CREATE_DATA, DIALOG_USERS_LEARNINGS_DATA, ELEMENTS } from "./users-page.constants";

import { DialogCreateComponent } from "../../../shared/components/dialog/dialog-create/dialog-create.component";
import { DialogConfirmComponent } from "../../../shared/components/dialog/dialog-confirm/dialog-confirm.component";
import { UsersLearningsDialogComponent } from "../../components/users-learnings-dialog/users-learnings-dialog.component";
import { UsersLearningsDialogData } from "../../components/users-learnings-dialog/users-learnings-dialog.model";
import { PageContentEvent } from "../../../shared/components/page-content/page-content.model";
import { ItemsApiData } from "../../../shared/models/items-api.model";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit, OnDestroy {
  private readonly updateUsers$ = new Subject<PageContentEvent>();

  readonly users$: Observable<User[]> = this.updateUsers$.asObservable()
    .pipe(
      switchMap((query: PageContentEvent) => this.getUsers(query))
    )

  readonly elements: ListItemElement[] = ELEMENTS(
    (user: User) => this.deleteUser(user),
    (user: User) => this.infoUser(user)
  );

  pageLength: number = 0;

  private pageContentState: PageContentEvent | undefined;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly usersApiService: UsersApiService,
    private readonly dialogService: DialogService
  ) { }

  ngOnInit(): void {}

  private getUsers(query: PageContentEvent): Observable<User[]> {
    return this.usersApiService.getUsers(query).pipe(
      tap((users: ItemsApiData<User[]>) => this.pageLength = users.totalCount),
      map((users: ItemsApiData<User[]>) => users.data)
    );
  }

  createUser(): void {
    this.dialogService.openDialog<DialogCreateComponent, DialogCreateData, User>(
      DialogCreateComponent, DIALOG_CREATE_DATA
    )
      .pipe(
        filter((user: User | undefined) => user !== undefined),
        switchMap((user) => this.usersApiService.createUser(user as User)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateUsers$.next(this.pageContentState))
  }

  private deleteUser(user: User): void {
    this.dialogService.openDialog<DialogConfirmComponent, DialogConfirmData<User>, User>(
      DialogConfirmComponent, { ...DIALOG_CONFIRM_DATA(user.name), data: user }
    )
      .pipe(
        filter((user: User | undefined) => user !== undefined),
        switchMap((user) => this.usersApiService.deleteUser(user as User)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateUsers$.next(this.pageContentState))
  }

  private infoUser({ learnings }: User): void {
    if (!learnings.length) {
      return;
    }

    this.usersApiService.getUsersLearnings(learnings)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((learnings: string[]) =>
        this.dialogService.openDialog<UsersLearningsDialogComponent, UsersLearningsDialogData, User>(
          UsersLearningsDialogComponent, {
            ...DIALOG_USERS_LEARNINGS_DATA,
            learnings
          }
        )
      );
  }

  changePageContent(event: PageContentEvent): void {
    this.pageContentState = event;

    this.updateUsers$.next(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
