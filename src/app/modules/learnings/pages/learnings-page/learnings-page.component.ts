import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil, tap } from "rxjs/operators";

import { DialogService } from "../../../shared/components/dialog/dialog.service";
import { LearningsApiService } from "../../services/learnings-api.service";

import { PageContentEvent } from "../../../shared/components/page-content/page-content.model";
import { ListItemElement } from "../../../shared/components/list/list.model";
import { ItemsApiData } from "../../../shared/models/items-api.model";
import { DialogCreateData } from "../../../shared/components/dialog/dialog-create/dialog-create.model";
import { DialogConfirmData } from "../../../shared/components/dialog/dialog-confirm/dialog-confirm.model";
import { Learning, LearningsStatus } from "../../../shared/models/learnings";
import { DIALOG_ASSIGN_DATA, DIALOG_CONFIRM_DATA, DIALOG_CREATE_DATA, ELEMENTS } from "./learnings-page.constants";
import { LearningsAssignDialogData } from "../../components/learnings-assign-dialog/learnings-assign-dialog.model";
import { User } from "../../../shared/models/user";

import { DialogCreateComponent } from "../../../shared/components/dialog/dialog-create/dialog-create.component";
import { DialogConfirmComponent } from "../../../shared/components/dialog/dialog-confirm/dialog-confirm.component";
import { LearningsAssignDialogComponent } from "../../components/learnings-assign-dialog/learnings-assign-dialog.component";

@Component({
  selector: 'app-learnings-page',
  templateUrl: './learnings-page.component.html',
  styleUrls: ['./learnings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningsPageComponent implements OnInit, OnDestroy {
  private readonly updateLearnings$ = new Subject<PageContentEvent>();

  readonly learnings$: Observable<Learning[]> = this.updateLearnings$.asObservable()
    .pipe(
      switchMap((query: PageContentEvent) => this.getLearnings(query))
    )

  readonly elements: ListItemElement[] = ELEMENTS(
    (learning: Learning) => this.deleteLearning(learning),
    (learning: Learning) => this.changeStatus(learning),
    (learning: Learning) => this.assignUsers(learning)
  );

  pageLength: number = 0;

  private pageContentState: PageContentEvent | undefined;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly learningsApiService: LearningsApiService,
    private readonly dialogService: DialogService
  ) { }

  ngOnInit(): void {}

  private getLearnings(query: PageContentEvent): Observable<Learning[]> {
    return this.learningsApiService.getLearnings(query).pipe(
      tap((learnings: ItemsApiData<Learning[]>) => this.pageLength = learnings.totalCount),
      map((learnings: ItemsApiData<Learning[]>) => learnings.data)
    );
  }

  createLearning(): void {
    this.dialogService.openDialog<DialogCreateComponent, DialogCreateData, Learning>(
      DialogCreateComponent, DIALOG_CREATE_DATA
    )
      .pipe(
        filter((learning: Learning | undefined) => learning !== undefined),
        switchMap((learning) => this.learningsApiService.createLearning(learning as Learning)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateLearnings$.next(this.pageContentState))
  }

  private deleteLearning(learning: Learning): void {
    this.dialogService.openDialog<DialogConfirmComponent, DialogConfirmData<Learning>, Learning>(
      DialogConfirmComponent, { ...DIALOG_CONFIRM_DATA(learning.name), data: learning }
    )
      .pipe(
        filter((learning: Learning | undefined) => learning !== undefined),
        switchMap((learning) => this.learningsApiService.deleteLearning(learning as Learning)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateLearnings$.next(this.pageContentState))
  }

  private changeStatus(learning: Learning): void {
    const updatedLearning: Learning = {
      ...learning,
      status: learning.status === LearningsStatus.ACTIVE ? LearningsStatus.ARCHIVED : LearningsStatus.ACTIVE
    };

    this.learningsApiService.updateLearning(updatedLearning)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateLearnings$.next(this.pageContentState));
  }

  private assignUsers(learning: Learning): void {
    this.learningsApiService.getUsers()
      .pipe(
        switchMap((users: User[]) =>
          this.dialogService.openDialog<LearningsAssignDialogComponent, LearningsAssignDialogData, User[]>(
            LearningsAssignDialogComponent, {
              ...DIALOG_ASSIGN_DATA,
              learningId: learning.id,
              users
            }
          )
        ),
        filter((users: User[] | undefined) => users !== undefined && users.length !== 0),
        switchMap((users: User[] | undefined) => this.learningsApiService.updateUsers(users as User[])),
        takeUntil(this.destroy$)
      )
      .subscribe((v) => this.updateLearnings$.next(this.pageContentState));

  }

  changePageContent(event: PageContentEvent): void {
    this.pageContentState = event;

    this.updateLearnings$.next(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
