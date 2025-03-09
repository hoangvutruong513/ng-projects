import { DatePipe } from '@angular/common';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-test-component',
  imports: [DatePipe],
  template: ` <div>{{ viewChecked() | date: 'medium' }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {
  ngOnInit(): void {
    console.log('Test Component is inited');
  }
  viewChecked() {
    console.log('This is called when this test component is change detected');
    return new Date();
  }
}

@Component({
  selector: 'app-content-in-template',
  template: `
    <ng-template #withContent>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentInTemplateComponent {
  vcr = inject(ViewContainerRef);
  template = viewChild('withContent', { read: TemplateRef<unknown> });
  e = afterRenderEffect((onCleanup) => {
    const template = this.template();
    let viewRef: EmbeddedViewRef<unknown> | undefined;
    if (template) {
      viewRef = this.vcr.createEmbeddedView(template);
    }
    onCleanup(() => {
      if (viewRef) {
        const index = this.vcr.indexOf(viewRef);
        this.vcr.remove(index);
      }
    });
  });
}

@Component({
  selector: 'app-content-projection-experiment',
  imports: [ContentInTemplateComponent, TestComponent],
  template: `
    <div>Hello World</div>
    <app-content-in-template>
      <app-test-component />
    </app-content-in-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentProjectionExperimentComponent {}
