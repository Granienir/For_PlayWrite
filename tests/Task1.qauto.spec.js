import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { RegisterForm } from "../src/pages/RegisterForm";

test.describe("Registration modal validation", async () => {
  test.beforeEach(async ({ page }) => {
    /*Підготовка коду до ПОМ*/
    const homePage = new HomePage(page);
    //const registerForm = new RegisterForm(page);
    await homePage.navigate();
    await homePage.loginFormOpen();
    //await registerForm.registFormOpen();
  });

  test("All fields fill in correctly", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();
    await registerFormNew._firstNameInput.focus();
    await registerFormNew._firstNameInput.fill("Sanya");
    await registerFormNew._firstNameInput.blur();
    await expect(registerFormNew._firstNameInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
    await registerFormNew._lastNameInput.focus();
    await registerFormNew._lastNameInput.fill("Yestarday");
    await registerFormNew._lastNameInput.blur();
    await expect(registerFormNew._lastNameInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
    await registerFormNew._emailInput.focus();
    await registerFormNew._emailInput.fill("test@test.com");
    await registerFormNew._emailInput.blur();
    await expect(registerFormNew._emailInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
    await registerFormNew._passwordInput.focus();
    await registerFormNew._passwordInput.fill("Qw1234567890");
    await registerFormNew._passwordInput.blur();
    await expect(registerFormNew._passwordInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
    await registerFormNew._repeatPasswordInput.focus();
    await registerFormNew._repeatPasswordInput.fill("Qw1234567890");
    await registerFormNew._repeatPasswordInput.blur();
    await expect(registerFormNew._repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
  });

  test("Empty Name field", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._firstNameInput.focus();
    await registerFormNew._firstNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name required");

    await expect
      .soft(registerFormNew._firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Name ", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._firstNameInput.focus();
    await registerFormNew._firstNameInput.fill("фыв");
    await registerFormNew._firstNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name is invalid");

    await expect
      .soft(registerFormNew._firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Name _numbers ", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._firstNameInput.focus();
    await registerFormNew._firstNameInput.fill("1234");
    await registerFormNew._firstNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name is invalid");

    await expect
      .soft(registerFormNew._firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("Too long Name ", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._firstNameInput.focus();
    await registerFormNew._firstNameInput.fill("qwertyuiopasdfghjkklzxcvbnm");
    await registerFormNew._firstNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name has to be from 2 to 20 characters long");

    await expect
      .soft(registerFormNew._firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("Empty Last name field", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._lastNameInput.focus();
    await registerFormNew._lastNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Last name required");

    await expect
      .soft(registerFormNew._lastNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Last name field ", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._lastNameInput.focus();
    await registerFormNew._lastNameInput.fill("фыв");
    await registerFormNew._lastNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Last name is invalid");

    await expect
      .soft(registerFormNew._lastNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Last name _numbers ", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._lastNameInput.focus();
    await registerFormNew._lastNameInput.fill("1234");
    await registerFormNew._lastNameInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Last name is invalid");

    await expect
      .soft(registerFormNew._lastNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("Passwords do not match", async ({ page }) => {
    const registerForm = new RegisterForm(page);
    const registerFormNew = await registerForm.registFormOpen();

    await registerFormNew._passwordInput.focus();
    await registerFormNew._passwordInput.fill("Qw1234567890");
    await registerFormNew._passwordInput.blur();

    await registerFormNew._repeatPasswordInput.focus();
    await registerFormNew._repeatPasswordInput.fill("Qw12345678901");
    await registerFormNew._repeatPasswordInput.blur();

    await expect
      .soft(registerFormNew._errorMsg, 'Error "Name required" is shown')
      .toHaveText("Passwords do not match");

    await expect
      .soft(registerFormNew._repeatPasswordInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });
});
