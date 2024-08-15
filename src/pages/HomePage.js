import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SignInModal } from "../components/SignInModal";

export class HomePage extends BasePage {
  _header;
  _signInBtn;
  _signInPopUp;

  constructor(page) {
    super(page, "/");
    this._header = this._page.locator(".header");
    this._signInBtn = this._header.getByRole("button", { name: "Sign in" });
    this._signInPopUp = new SignInModal(this._page);
  }

  async loginFormOpen() {
    await this._signInBtn.click();
  }

  async loginAsUser(login, pass) {
    await this._signInBtn.click();
    await this._signInPopUp.login(login, pass);
  }
}
