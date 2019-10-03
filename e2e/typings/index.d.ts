/* tslint:disable */
type ICodeceptCallback = (i: CodeceptJS.I, ...any: any[]) => void;

interface ILocator {
  xpath?: string;
  css?: string;
  name?: string;
  value?: string;
  frame?: string;
  android?: string;
  ios?: string;
}

declare const actor: (object?: any) => CodeceptJS.I;
declare const Feature: (string: string) => void;
declare const Scenario: (string: string, callback: ICodeceptCallback) => void;
declare const Before: (callback: ICodeceptCallback) => void;
declare const BeforeSuite: (callback: ICodeceptCallback) => void;
declare const After: (callback: ICodeceptCallback) => void;
declare const AfterSuite: (callback: ICodeceptCallback) => void;
declare const within: (selector: string, callback: Function) => void;
declare const pause: () => void;

declare namespace CodeceptJS {
  export interface I {
    switchToContractType: (contractType: string) => void;
    switchToState: (state: string) => void;
    haveRequestHeaders: (headers: any) => void;
    sendPostRequest: (endpoint: string, payload: any, headers?: any) => any;
    sendGetRequest: (endpoint: string, headers?: any) => any;
    Nightmare(options: string): void;
    grabHAR(): Promise<any>;
    saveHAR(fileName: string): void;
    resetHAR(): void;
    haveHeader(header: string, value: string): void;
    amOnPage(url: string, headers?: string): void;
    seeInTitle(text: string): void;
    dontSeeElement(locator: string): void;
    dontSeeInTitle(text: string): void;
    grabTitle(): Promise<any>;
    grabCurrentUrl(): Promise<any>;
    seeInCurrentUrl(url: string): void;
    dontSeeInCurrentUrl(url: string): void;
    seeCurrentUrlEquals(url: string): void;
    dontSeeCurrentUrlEquals(url: string): void;
    see(text: string, context?: ILocator): void;
    see(text: string, context?: string): void;
    dontSee(text: string, context?: ILocator): void;
    dontSee(text: string, context?: string): void;
    seeElement(locator: ILocator | string, context?: ILocator | string): void;
    dontSeeElement(locator: ILocator | string, context?: ILocator | string): void;
    seeElementInDOM(locator: ILocator | string, context?: ILocator | string): void;
    dontSeeElementInDOM(locator: ILocator | string, context?: ILocator | string): void;
    seeInSource(text: string): void;
    dontSeeInSource(text: string): void;
    seeNumberOfElements(selector: string, num: number): void;
    seeNumberOfVisibleElements(locator: ILocator, num: number): void;
    seeNumberOfVisibleElements(locator: string, num: number): void;
    grabNumberOfVisibleElements(locator: ILocator, undefined: string): Promise<any>;
    click(locator: ILocator, context?: ILocator): void;
    click(locator: string, context?: ILocator): void;
    click(locator: ILocator, context?: string): void;
    click(locator: string, context?: string): void;
    doubleClick(locator: ILocator, context?: ILocator): void;
    doubleClick(locator: string, context?: ILocator): void;
    doubleClick(locator: ILocator, context?: string): void;
    doubleClick(locator: string, context?: string): void;
    moveCursorTo(locator: ILocator, offsetX?: string, offsetY?: string): void;
    moveCursorTo(locator: string, offsetX?: string, offsetY?: string): void;
    executeScript(fn: Function): void;
    executeAsyncScript(fn: Function): void;
    resizeWindow(width: number, height: number): void;
    checkOption(field: ILocator, context?: ILocator): void;
    checkOption(field: string, context?: ILocator): void;
    checkOption(field: ILocator, context?: string): void;
    checkOption(field: string, context?: string): void;
    fillField(field: ILocator, value: string): void;
    fillField(field: string, value: string): void;
    clearField(field: ILocator, undefined: string): void;
    appendField(field: ILocator, value: string): void;
    appendField(field: string, value: string): void;
    seeInField(field: ILocator, value: string): void;
    seeInField(field: string, value: string): void;
    dontSeeInField(field: ILocator, value: string): void;
    dontSeeInField(field: string, value: string): void;
    pressKey(key: string): void;
    triggerMouseEvent(event: string): void;
    seeCheckboxIsChecked(field: ILocator, undefined: string): void;
    dontSeeCheckboxIsChecked(field: ILocator, undefined: string): void;
    attachFile(locator: ILocator, pathToFile: string): void;
    attachFile(locator: string, pathToFile: string): void;
    grabTextFrom(locator: ILocator, undefined: string): Promise<any>;
    grabValueFrom(locator: ILocator, undefined: string): Promise<any>;
    grabAttributeFrom(locator: ILocator, attr: string): Promise<any>;
    grabAttributeFrom(locator: string, attr: string): Promise<any>;
    selectOption(select: ILocator, option: string): void;
    selectOption(select: string, option: string): void;
    setCookie(cookie: string): void;
    seeCookie(name: string): void;
    dontSeeCookie(name: string): void;
    grabCookie(name: string): Promise<any>;
    clearCookie(cookie?: string): void;
    wait(sec: number): void;
    waitForText(text: string, sec: number, context?: ILocator): void;
    waitForText(text: string, sec: number, context?: string): void;
    waitForVisible(locator: ILocator, sec: number): void;
    waitForVisible(locator: string, sec: number): void;
    waitToHide(locator: ILocator, sec?: number): void;
    waitToHide(locator: string, sec?: number): void;
    waitForFunction(fn: Function, sec?: number): void;
    waitForInvisible(locator: ILocator, sec: number): void;
    waitForInvisible(locator: string, sec: number): void;
    waitForElement(locator: ILocator, sec: number): void;
    waitForElement(locator: string, sec: number): void;
    waitForRequest(locator: ILocator, sec: number): void;
    waitForRequest(locator: ILocator, sec: number): void;
    waitUntilExists(locator: ILocator, sec: number): void;
    waitUntilExists(locator: string, sec: number): void;
    waitForDetached(locator: ILocator, sec: number): void;
    waitForDetached(locator: string, sec: number): void;
    refreshPage(): void;
    refresh(): void;
    saveScreenshot(fileName: string, fullPage?: string): void;
    scrollTo(locator: ILocator, offsetX?: string, offsetY?: string): void;
    scrollTo(locator: string, offsetX?: string, offsetY?: string): void;
    scrollPageToTop(): void;
    scrollPageToBottom(): void;
    grabPageScrollPosition(): Promise<any>;
    debug(msg: string): void;
    debugSection(section: string, msg: string): void;

    test(): void;
  }
}

declare module 'codeceptjs' {
  export = CodeceptJS;
}
