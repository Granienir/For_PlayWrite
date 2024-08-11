import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  _header;
  _signInBtn;

  constructor(page) {
    super(page, "/");
    this._header = this._page.locator(".header");
    this._signInBtn = this._header.getByRole("button", { name: "Sign in" });
  }

  async loginFormOpen() {
    await this._signInBtn.click();
  }
}
