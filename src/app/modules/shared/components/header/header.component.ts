import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppLink, AppLinks } from "../../models/links";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly HEADER_LINKS: AppLink[] = AppLinks;
}
