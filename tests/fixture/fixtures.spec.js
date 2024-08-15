import { userGaragePage as test } from "../../fixtures/userGaragePage";
import { GaragePage } from "../../src/pages/GaragePage";

test("add a car", async ({ storagePage }) => {
  //await GaragePage.addCar("Porsche", "911", 123456);

  // const addCarBtn = storagePage.getByRole("button", { name: "Add car" });
  // const addCarModal = storagePage.locator("app-add-car-modal");
  // const addCarBrandSelect = addCarModal.locator("#addCarBrand");
  // const addCarModelSelect = addCarModal.locator("#addCarModel");
  // const mileageInput = addCarModal.locator('input[formcontrolname="mileage"]');
  // const addBtn = addCarModal.getByRole("button", { name: "Add" });

  // await storagePage.goto("/");

  // await addCarBtn.click();
  // await addCarBrandSelect.selectOption("Porsche");
  // await addCarModelSelect.selectOption("911");
  // await mileageInput.fill("123456");
  // await addBtn.click();

  const garagePage = new GaragePage(storagePage);
  await garagePage.navigate();
  await garagePage.addCar("Porsche", "911", 123456);

  await storagePage.pause();
});
