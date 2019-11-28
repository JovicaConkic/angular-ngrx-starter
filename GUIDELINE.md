# Angular Guidelines

## Overview

In order to achieve the best performance, easier testability, maintenance etc as pattern we will use unidirectional data flow using [NGRX store](https://ngrx.io/guide/store) with [Effects](https://ngrx.io/guide/effects) and functional programming using [RamdaJS](https://ramdajs.com/) library.

Unidirectional data flow pattern is based on immutable objects and require pure functions which will prevent mutations of the objects. Read more about [Object mutations and pure functions](https://blog.bitsrc.io/understanding-javascript-mutation-and-pure-functions-7231cc2180d3).

That is a reason why we are using functionality programming with RamdaJS. Ramda's methods are having cross browser support which means that all methods will work on IE10+, Safari.... browser without necessarity of using additional polyfills.

## Guidelines

### Naming conventions

#### **Naming Classes**

Suffix classes with context, i.e. Component, Directive, Module, Pipe or Service.

Always use contextual suffix for Angular Components: PriceComponent.
Name files accordingly: _sample.component.ts_, _sample.pipe.ts_, etc.

See: [Angular style guide curated by John Papa](https://angular.io/guide/styleguide)

#### **Ramda/RxJS Naming collisions**

When importing from both, *Ramda* and _RxJS_, naming collisions may occur, e.g. _map_, _filter_, etc.

Always prefix *Ramda* functions with **R**.

```ts
import { filter, map } from 'rxjs/operators';
import Rfilter from 'ramda/es/filter';
import Rmap from 'ramda/es/map';
```

### Imports (module)

Utilise *webpack* aliases. Never write relative paths.

See: [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias)

Imports should be used in alphabetical order and preferbale would be to group and separate with empty line 3rd party from local imports.

```ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { environment } from '@environments/environment';
import { reducers } from '@store/app.reducer';
```

### Structure

Always have a module per page. All pages should be lazy-loaded if there are multiple entry points to the application.

#### **Module with providers**

Implement static *forRoot* method.

```ts
@NgModule({...})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [SampleService]
    };
  }
}
```

Call *forRoot* only in the application's root module.

See: [configure core services with CoreModule.forRoot](https://angular.io/guide/ngmodules#configure-core-services-with-coremoduleforroot)

#### **Module without providers**

Do not implement _ModuleWithProviders_ interface.

```ts
@NgModule({...})
export class CoreModule {
  ...
}
```

### NGRX

#### **Smart components**

A smart component referred to also as container components has only the following responsibilities:

- Connecting to the store
- Dispatching actions
- Rendering child components

Basic styles can be applied to the container but this should be restricted to few lines and avoided altogether if possible.

Business logic ought to be captured in effects not inside components.

Testing note: HTML testing via snapshots should not be needed for Smart components in general

#### **Dumb components**

A dumb component acts as a pure function. From a determinate input it will output the same HTML.

A dumb component should receive every data from Input and use Output to notify the parent.

No business logic should be written for a dumb component but presentational logic is very much welcomed.

Testing note: HTML testing via snapshots is encouraged for dumb components since keeping the output tested is key when editing/refactoring

#### **Hybrid components**

There are very specific scenarios where a smart component will need @Input()s, what turns them into hybrid components.

This is mostly the case when a component needs to pull data from the store (making them smart) but based on a specific key or id that comes from an API.

Ex.:

```html
<!-- Assuming we have "let foo = [1, 2, 3];" (from an API) and that we need to render a smart components per element in the array -->

<smart-component *ngFor="let bar of foo" [someIdInput]="bar"> </smart-component>
```

Since there is no way for the component to retrieve that key or id via a read operation, we're forced to allow this behavior. Keep it mind, it should always be kept to a minimum in order to prevent an endless @Input hierarchy.

The solution to this goes in line with the nesting of components (explained below). We should use smart components within dumb components whenever we need to tap into the store to provide another dumb component with information.

Ex.:

```html
<smart-component-1>
  <!-- This one taps into the store -->
  <dumb-component-1 [input1]="x" [input2]="y">
    <!-- This one receives inputs from smart-component-1 -->
    <smart-component-2>
      <!-- This one taps into the store for different data -->
      <dumb-component-2 [input1]="z">
        <!-- This one receives inputs from smart-component-2 -->
      </dumb-component-2>
    </smart-component-2>
  </dumb-component-1>
</smart-component-1>
```

The idea behind this is that `<smart-component-1>` will never have to tap into the store for information that is not required by its immediate dumb child. If additional information is needed for another nested dumb component, another smart/dumb pair will be created, `<smart-component-2>` and `<dumb-component-2>` in the example.

#### **Components nesting**

Component nesting should be as simple as possible, which is why we must aim to have nesting no deeper than the following:

```html
<smart-component>
  <dumb-component-1>
    <!-- First level of nesting, ideally we stop here -->
    <dumb-component-2> <!-- Second level of nesting, OK --> </dumb-component-2>
  </dumb-component-1>
</smart-component>
```

Note that this only applies to project-wide components. Components from 3rd parties are not taken into account for this rule.

#### **Folder structure**

Folder structure should be as flat as possible. Smart and dumb components are stored in the same folder. Example of folder structure for angular module:

```
/components
/constants
/enums
/guards
/maps
/models
/pipes
/services
/utils

- feature.module.ts
- feature.routes.ts
```

#### **Actions**

Event like style for actions is more preferred over command one. It means that actions should capture unique events in the application and not follow _order to do something_ template.

See [NGRX actions](https://ngrx.io/guide/store/actions)

Actions dispatching should not be wrapped around a service. In the example below _SomeSmartComponent_ talks to _MyService_ to dispatch an action. This adds an extra layer of complexity, making it more difficult to track actions dispatched.

```ts
/* avoid */
@Component({ ... })
export class SomeSmartComponent {
constructor(private myService: MyService) {}

    public onClick(): void {
    	this.myService.doSomething();
    }

}

@Injectable()
export class MyService {
constructor(private store\$: Store<...>) {}

    public doSomething(): void {
    	this.store$.dispatch(logout());
    }

}
```

On the contrary, the Smart component itself should dispatch the actions without the need of an extra abstraction.

```ts
/* recommended */
@Component({ ... })
export class SomeSmartComponent {
constructor(private store\$: Store<...>) {}

    public onClick(): void {
    	this.store$.dispatch(logout());
    }

}
```

#### **RouterStore**

While creating angular project, it comes with RouterStoreSerializer which saves current url state in ngrx store. RouterStore enables you to parse url without injecting ActivatedRoute and it has queryParams and params already in place. Consistent approach is to subscribe to router ngrx state to get all url related information needed.

```ts
interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}
```

#### **Features modules**

When developing a new feature and adding new components group them in feature module.

```ts
@NgModule({
  ...
  declarations: [LoadingBarComponent, LoadingOverlayComponent, LoadingOverlayTemplateComponent],
  exports: [LoadingBarComponent, LoadingOverlayComponent]
})
export class LoadingModule {}
```

Later build page module from feature modules

```ts
@NgModule({
  ...
  imports: [LoadingModule, Feature2Module, Feature3Module, ...],
  ...
})
export class HomePageModule {}
```

**DO NOT** use common components module as it will grow and grow and lazy loading of modules would not make any sense because most of the code will be loaded in any view with common component

```ts
// DO NOT DO THIS
@NgModule({
  ...
  declarations: [
    BadgeComponent,
    CancellationPolicyBadgeComponent,
    CancellationPolicyTextComponent,
    CarouselGalleryComponent,
    DiscountedPriceComponent,
    ... // and 100 more components
  ],
  exports: [
    ...
    // everything form declaration
  ]
})
export class CommonModule {}
```

#### **Components**

Import all components and directives that a given component is referencing in its template.

```ts
@Component({
  selector: 'prefix-super-awesome',
  ...
})
export class SuperAwesomeComponent {
  @HostBinding('attr.class') public hostClass = 'super-awesome';

  @ViewChild('templateEl', {static: false}) public templateEl: ElementRef;
  @ViewChild(DifferentComponent, {static: false}) public templateEl: DifferentComponent;
  @ViewChildren(OtherComponent, {static: false}) public otherComponents: QueryList<OtherComponent>;
  @ContentChild('ngContentReference', {static: false}) public ngContentEl: ElementRef;
  @ContentChild(NgContentComponent, {static: false}) public ngContentComponent: NgContentComponent;
  @ContentChild(OtherNgContentComponent, {static: false}) public otherNgContentComponents: QueryList<OtherNgContentComponent>;
  @Input() public value: string;
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public variableUsedInTemplate: boolean;
  public initializedVariableUsedInTemplate: boolean = true;

  private variableUsedOnlyWithinClass: number = 1;
}
```

If you want to add CSS class to host element use *HostBinding*.

Use formatting as above, so group entries of class and add whitespace between groups:

- HostBinding
- ViewChild, ViewChildren, ContentChild, ContentChildren
- Input, Output
- public members used in templates
- private members

#### **Event handlers naming**

Use the following naming convention when dealing with output events:

```html
<prefix-super-awesome (valueChange)="onValueChange($event)">...</prefix-super-awesome>
```

#### **Change detection strategy**

Prefer _OnPush_ change detection strategy.

```ts
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent {...}
```

See: [OnPush change detection](https://blog.angular-university.io/onpush-change-detection-how-it-works/)

#### **View encapsulation**

Always use *emulated* view encapsulation. It is the default view encapsulation: there's no need to specify it in a component's metadata.

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  ...
})
export class SampleComponent {...}
```

On the root AppComponent we define ViewEncapsulation of None and we attach all the global styles directly to the AppComponent.

This way we are reducing the number of requests and also removing a blocking request for CSS.

#### **ng-template**

Use *ng-template* element to define a template:

```html
<ng-template #termsAndConditions>
  <h1>...</h1>
  <p>...</p>
</ng-template>
```

...and reference it in multiple places within the same file via *ngTemplateOutlet*:

```html
<section>
  <h1>...</h1>
  <p>...</p>
  <div [ngTemplateOutlet]="termsAndConditions"></div>
  ...
  <footer>
    <div [ngTemplateOutlet]="termsAndConditions"></div>
  </footer>
</section>
```

Always use camel case when naming template reference, e.g. _#myNewTemplate_.

#### **ng-container**

Use *ng-container* element to reduce nesting in templates. It is not going to be rendered itself.

The following code:

```html
<section>
  <ng-container *ngIf="isMobile">
    <h1>...</h1>
    <p>...</p>
  </ng-container>
</section>
```

...if *isMobile* evaluates to true will become:

```html
<section>
  <h1>...</h1>
  <p>...</p>
</section>
```

...or otherwise:

```html
<section></section>
```

#### **Animations**

Define all animations for a given component inside a separate file, e.g. *component-name.animations.ts*. Always export individual animation triggers for best reusability.

See: [animations](https://angular.io/guide/animations)

### Directives

Never place more than one structural directive on an element.

See: [one structural directive per host element](https://angular.io/guide/structural-directives#!#one-structural-directive-per-host-element)

### Tests

Utilise _page object_ when dealing with a complex template.

See: [page object](https://angular.io/guide/testing#page-object)

All test files should have **.spec.ts** sufix and should be placed in **\_\_tests\_\_** directory.

#### **Components**

See: [component test](https://angular.io/guide/testing#component-test-basics)

#### **Pipes**

See: [pipes](https://angular.io/guide/testing#pipe-testing)

#### **Services**

See: [services and services with dependencies](https://angular.io/guide/testing#service-tests)

### RxJS

Suffix all observable names with **\$**, e.g. _this.state\$_, _this.result\$_, etc.

Use _async_ pipe in conjunction with the so-called **Elvis operator** within templates:

```html
<user-details [details]="(user$ | async)?.details"></user-details>
```

...or _ngIf_ as, depending on the nesting level and how often a property is accessed.

Read more about [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview)

#### **Actions**

Read [NGRX actions](https://ngrx.io/guide/store/actions)

See also: [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)

#### **Effects**

Read [NGRX effects](https://ngrx.io/guide/effects#writing-effects)

#### **Reducers**

Read [NGRX reducers](https://ngrx.io/guide/store/reducers)

#### **Selectors**

Read [NGRX selectors](https://ngrx.io/guide/store/selectors)

### Importing RxJS operators and Ramda

#### **Tree Shaking & bundle size of rxjs and ramda**

There is a raised concern around the bundle size of the above libraries and the way that webpack is bundling them (via angular-cli). It was found that, tree-shaking would not work as expected and in fact those libraries are bundled in full.

Using angular-cli new to create the default app, I've imported only _pick_ from _ramda_ and _tap_ from _rxjs_.

```ts
import { Component } from '@angular/core';
import { Rpick } from 'ramda/es';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    Rpick();
    new Observable().pipe(tap(console.log));
  }
}
```

The result is that libraries have been bundled in full.

Deep imports to the rescue. At the moment with the current setup of angular, angular/cli and rxjs we will have to revert to use deep imports to target specific imports. So the code above would become:

```ts
import Rpick from 'ramda/es/pick';
import { tap } from 'rxjs/operators/tap';
```
