import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponents";

export class SignInModal extends BaseComponent {
  _emailInPut;
  _PasswordInPut;
  _loginBtn;

  constructor(page) {
    super(page, page.locator("app-signin-modal"));
    this._emailInPut = this._container.locator("#signinEmail");
    this._PasswordInPut = this._container.locator("#signinPassword");
    this._loginBtn = this._container.getByRole("button", { name: "Login" });
  }

  async login(login, pass) {
    await this._emailInPut.fill(login);
    await this._PasswordInPut.fill(pass);
    await this._loginBtn.click();
  }
}
