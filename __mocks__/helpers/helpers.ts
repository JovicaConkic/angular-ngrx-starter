import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export const provide = (obj: any) => obj as any;

export const frames = (n: number, unit: string = '-'): string =>
  n === 1 ? unit : unit + frames(n - 1, unit);

/**
 * Locates element inside testing unit
 * @param debugElement debug testing unit
 * @param selector css selector
 */
export const find = (debugElement: DebugElement, selector: string) => {
  return debugElement.query(By.css(selector)).nativeElement;
};

/**
 * Locates element inside testing unit and clicks on it
 * @param debugElement debug testing unit
 * @param selector css selector
 */
export const click = (debugElement: DebugElement, selector: string) => {
  find(debugElement, selector).click();
};
