import test from "@playwright/test";
// import { HomePage } from "../../src/pages/HomePage";
import { GaragePage } from "../../src/pages/GaragePage";

// const USER = process.env.APP_USER_EMAIL;
// const PASS = process.env.APP_USER_PASS;

test.describe("Check storage", async () => {
  let garagePage;

  // test.beforeEach(async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   await homePage.navigate();
  //   await homePage.loginAsUser(USER, PASS);
  // });

  test("user can add a car", async ({ page }) => {
    const garagePage = new GaragePage(page);
    await garagePage.navigate();
    await garagePage.addCar("Porsche", "911", 123456);
    //await page.pause();

    // await garagePage.addCarBtn.click();
    // await garagePage.selectBrand("Porsche");
    // await garagePage.addCarModelSelect.selectOption("911");
    // await garagePage.mileageInput.fill("123456");
    // await garagePage.addBtn.click();
  });
});
