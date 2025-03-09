import { DatePipe, NgComponentOutlet } from '@angular/common';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EmbeddedViewRef,
  inject,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { DynamicContentProjectionComponent } from '../dynamic-content-projection/dynamic-content-projection.component';
import { TestService, TOKEN1 } from '../test-service/test.service';
import { Test2Service, Test3Service } from '../test-service/test2.service';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, NgComponentOutlet, DatePipe],
  providers: [
    Test2Service,
    Test3Service,
    {
      provide: TOKEN1,
      useFactory: () => {
        return new TestService();
      },
    },
  ],
  template: `
    <button mat-flat-button (click)="hasTemplateRef.set(!hasTemplateRef())">
      Click
    </button>
    <button mat-flat-button (click)="pass1.set(pass1() + 1)">Click1</button>
    <button mat-flat-button (click)="pass2.set(pass2() + 1)">Click2</button>
    <ng-container
      [ngComponentOutlet]="component"
      [ngComponentOutletInputs]="forInput()"
      [ngComponentOutletContent]="content()"
    />
    @if (hasTemplateRef()) {
      <ng-template #toProject>
        <span>Span</span>
        <span>Span</span>
        <h1>H1</h1>
        <h2>H2</h2>
      </ng-template>
    }
    <!-- <app-dynamic-content-projection>
      <span>Span</span>
      <span>Span</span>
      <h1>H1</h1>
      <h2>H2</h2>
    </app-dynamic-content-projection> -->

    <!-- <span #toProjectNode>Test Second Projection</span>
    <h2 #toProjectNode>Test Second Projection</h2>
    <h1 #toProjectNode>Test Second Projection</h1>
    <h3 #toProjectNode>Delicious</h3> -->

    <div>{{ viewChecked() | date: 'medium' }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentProjectWithTemplateComponent {
  title = 'test-ng-19';
  component = DynamicContentProjectionComponent;
  vcr = inject(ViewContainerRef);
  toProject = viewChild('toProject', { read: TemplateRef });
  content = signal<HTMLElement[][] | undefined>(undefined);
  evr: EmbeddedViewRef<unknown> | undefined = undefined;
  hasTemplateRef = signal(true);
  pass1 = signal(0);
  pass2 = signal(2);
  forInput = computed(() => ({
    input1: this.pass1(),
    input2: this.pass2(),
  }));
  token1 = inject(TOKEN1);
  constructor() {
    console.log('This is Token 1 ', this.token1);
  }
  // toProjectNode = viewChildren<ElementRef<HTMLElement>>('toProjectNode');
  // contentNode = computed(() => {
  //   const toProjectElements = this.toProjectNode().map((e) => e.nativeElement);
  //   const es = [
  //     [toProjectElements[2]],
  //     [toProjectElements[0], toProjectElements[3]],
  //     [toProjectElements[1]],
  //   ];
  //   return es;
  // });

  a = effect(() => {
    console.log('Effect run before view checked ', this.hasTemplateRef());
  });
  renderNode = afterRenderEffect((onCleanup) => {
    const toProject = this.toProject();
    console.log('Effect run after view checked');
    if (toProject) {
      this.evr = this.vcr.createEmbeddedView(toProject);
      const rootNodes = this.evr.rootNodes;
      const es = [[rootNodes[2]], [rootNodes[0], rootNodes[3]], [rootNodes[1]]];
      console.log({ ref: this.evr, es });
      this.content.set(es);
    }
    onCleanup(() => {
      if (this.evr) {
        console.log('cleanup effect');
        this.evr.destroy();
        this.evr = undefined;
        this.content.set(undefined);
      }
    });
  });

  viewChecked() {
    console.log('change detected');
    return new Date();
  }
}
