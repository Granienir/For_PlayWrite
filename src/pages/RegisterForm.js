import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "./HomePage";

export class RegisterForm extends HomePage {
  _modal;
  _registerBtn;
  _modalR;
  _firstNameInput;
  _lastNameInput;
  _emailInput;
  _passwordInput;
  _repeatPasswordInput;
  _errorMsg;

  constructor(page) {
    super(page, "/");
    this._modal = this._page.locator(".modal-content");
    this._registerBtn = this._modal
      .getByRole("button", { name: "registration" })
      .or(this._modal.getByRole("button", { name: "реєстрація" }));
    this._modalR = this._page.locator(".modal-content");
    this._firstNameInput = this._modalR.locator("#signupName");
    this._lastNameInput = this._modalR.locator("#signupLastName");
    this._emailInput = this._modalR.locator("#signupEmail");
    this._passwordInput = this._modalR.locator("#signupPassword");
    this._repeatPasswordInput = this._modalR.locator("#signupRepeatPassword");
    this._errorMsg = this._modalR.locator(".invalid-feedback");
  }

  async registFormOpen() {
    await this._registerBtn.click();
    return new RegisterForm(this._page);
  }
}
