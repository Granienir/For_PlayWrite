import { Locator, Page } from "@playwright/test";

export class BaseComponent {
  _page;
  _container;

  constructor(page, container) {
    this._page = page;
    this._container = container;
  }
}
