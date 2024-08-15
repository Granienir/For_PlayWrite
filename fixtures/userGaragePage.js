import { test as base } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { SignInModal } from "../src/components/SignInModal";
import { GaragePage } from "../src/pages/GaragePage";

// const USER = process.env.APP_USER_EMAIL;
// const PASS = process.env.APP_USER_PASS;

export const userGaragePage = base.extend({
  storagePage: async ({ browser }, use) => {
    const pageFromStorage = await browser.newPage({
      storageState: "session-storage.json",
    });
    await use(pageFromStorage);
  },

  // userGaragePage: async ({ page }, use) => {
  //   const homePage = new HomePage(page);
  //   await homePage.navigate();
  //   await homePage.loginAsUser(USER, PASS);
  //   await page.getByRole("button", { name: "Add car" }).waitFor();
  //   await use(page);
  // },
});
