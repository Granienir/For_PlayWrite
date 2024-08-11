const { test, expect } = require("@playwright/test");

test("has title", { tag: "@regression" }, async ({ page }) => {
  await page.goto("/");

  const header = page.locator(".header");
  const aboutlink = header.getByRole("button", { name: "Sign In" });
  const modal = page.locator(".modal-content");
  const registerBtn = modal.getByRole("button", { name: "registration" });
  const firstnameInput = modal.locator("#signupName");
  const lastNameinput = modal.locator("#signupLastName");
  const emailInput = modal.locator('input[name="email"]');

  await aboutlink.click();
  await registerBtn.click();
  await firstnameInput.fill("Illia");
  await lastNameinput.pressSequentially("Hnitetskyi", { delay: 100 });
  await emailInput.fill("test.@test.com");

  await emailInput.blur();

  await expect(page.getByText("Email is incorrect")).toBeVisible();

  await page.pause();
});
