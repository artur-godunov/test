import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() color: 'primary' | 'accent' | 'warn' | undefined;

  @Input() disabled = false;

  @Input() type: 'button' | 'submit' = 'button';
}
