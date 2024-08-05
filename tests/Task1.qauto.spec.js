import { test, expect } from "@playwright/test";

test.describe("Registration modal validation", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const header = page.locator(".header");
    const signInBtn = header.getByRole("button", { name: "Sign in" });

    const modal = page.locator(".modal-content");
    const registerBtn = modal
      .getByRole("button", { name: "registration" })
      .or(modal.getByRole("button", { name: "реєстрація" }));

    await signInBtn.click();
    await registerBtn.click();
  });

  test("All fields fill in correctly", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const firstNameInput = modal.locator("#signupName");
    const lastNameInput = modal.locator("#signupLastName");
    const emailInput = modal.locator("#signupEmail");
    const passwordInput = modal.locator("#signupPassword");
    const repeatPasswordInput = modal.locator("#signupRepeatPassword");

    await firstNameInput.focus();
    await firstNameInput.fill("Sanya");
    await firstNameInput.blur();
    await expect(firstNameInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
    await lastNameInput.focus();
    await lastNameInput.fill("Yestarday");
    await lastNameInput.blur();
    await expect(lastNameInput).toHaveCSS("border-color", "rgb(206, 212, 218)");

    //await page.pause();
    await emailInput.focus();
    await emailInput.fill("test@test.com");
    await emailInput.blur();
    await expect(emailInput).toHaveCSS("border-color", "rgb(206, 212, 218)");

    //await page.pause();
    await passwordInput.focus();
    await passwordInput.fill("Qw1234567890");
    await passwordInput.blur();
    await expect(passwordInput).toHaveCSS("border-color", "rgb(206, 212, 218)");

    //await page.pause();
    await repeatPasswordInput.focus();
    await repeatPasswordInput.fill("Qw1234567890");
    await repeatPasswordInput.blur();
    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );

    //await page.pause();
  });

  test("Empty Name field", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const firstNameInput = modal.locator("#signupName");
    const errorMsg = modal.locator(".invalid-feedback");

    await firstNameInput.focus();
    await firstNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name required");

    await expect
      .soft(firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Name ", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const firstNameInput = modal.locator("#signupName");
    const errorMsg = modal.locator(".invalid-feedback");

    await firstNameInput.focus();
    await firstNameInput.fill("фыв");
    await firstNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name is invalid");

    await expect
      .soft(firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Name _numbers ", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const firstNameInput = modal.locator("#signupName");
    const errorMsg = modal.locator(".invalid-feedback");

    await firstNameInput.focus();
    await firstNameInput.fill("1234");
    await firstNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name is invalid");

    await expect
      .soft(firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("Too long Name ", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const firstNameInput = modal.locator("#signupName");
    const errorMsg = modal.locator(".invalid-feedback");

    await firstNameInput.focus();
    await firstNameInput.fill("qwertyuiopasdfghjkklzxcvbnm");
    await firstNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name has to be from 2 to 20 characters long");

    await expect
      .soft(firstNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("Empty Last name field", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const lastNameInput = modal.locator("#signupLastName");
    const errorMsg = modal.locator(".invalid-feedback");

    await lastNameInput.focus();
    await lastNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Last name required");

    await expect
      .soft(lastNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Last name field ", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const lastNameInput = modal.locator("#signupLastName");
    const errorMsg = modal.locator(".invalid-feedback");

    await lastNameInput.focus();
    await lastNameInput.fill("фыв");
    await lastNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Last name is invalid");

    await expect
      .soft(lastNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("incorect Last name _numbers ", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const lastNameInput = modal.locator("#signupLastName");
    const errorMsg = modal.locator(".invalid-feedback");

    await lastNameInput.focus();
    await lastNameInput.fill("1234");
    await lastNameInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Last name is invalid");

    await expect
      .soft(lastNameInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });

  test("Passwords do not match", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const passwordInput = modal.locator("#signupPassword");
    const repeatPasswordInput = modal.locator("#signupRepeatPassword");
    const errorMsg = modal.locator(".invalid-feedback");

    await passwordInput.focus();
    await passwordInput.fill("Qw1234567890");
    await passwordInput.blur();

    await repeatPasswordInput.focus();
    await repeatPasswordInput.fill("Qw12345678901");
    await repeatPasswordInput.blur();

    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Passwords do not match");

    await expect
      .soft(repeatPasswordInput, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");

    // await page.pause();
  });
});
