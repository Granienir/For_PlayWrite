import { Page } from "@playwright/test";

export class BasePage {
  _page;
  _url;

  constructor(page, url) {
    this._page = page;
    this._url = url;
  }

  async navigate() {
    return this._page.goto("/");
  }
}
