import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manufacturer-index',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManufacturerIndex {}
