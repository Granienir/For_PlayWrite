import { request, expect } from "@playwright/test";
import { userGaragePage as test } from "../../fixtures/userGaragePage";
import { GaragePage } from "../../src/pages/GaragePage";

const USER = process.env.APP_USER_EMAIL;
const PASS = process.env.APP_USER_PASS;

test.describe("Login test", () => {
  test.beforeEach(async ({ storagePage }) => {
    // storagePage.on("request", (request) =>
    //   console.log(">>", request.method(), request.url())
    // );
    // storagePage.on("response", (response) =>
    //   console.log("<<", response.status(), response.url())
    // );

    const garagePage = new GaragePage(storagePage);
    await garagePage.navigate();
    //await storagePage.pause();
  });

  test("test with User Profile Mocc", async ({ storagePage }) => {
    const profileTestData = {
      "status": "ok",
      "data": {
        "userId": 129566,
        "photoFilename": "default-user.png",
        "name": "Stanislav",
        "lastName": "Taran",
      },
    };

    // const carsTestData = {
    //   "status": "ok",
    //   "data": [
    //     {
    //       "id": 187108,
    //       "carBrandId": 4,
    //       "carModelId": 16,
    //       "initialMileage": 123456,
    //       "updatedMileageAt": "2024-08-18T20:30:16.000Z",
    //       "carCreatedAt": "2024-08-18T20:30:16.000Z",
    //       "mileage": 123456,
    //       "brand": "Porsche",
    //       "model": "911",
    //       "logo": "porsche.png",
    //     },
    //     {
    //       "id": 185924,
    //       "carBrandId": 4,
    //       "carModelId": 16,
    //       "initialMileage": 123456,
    //       "updatedMileageAt": "2024-08-15T22:48:44.000Z",
    //       "carCreatedAt": "2024-08-15T22:48:44.000Z",
    //       "mileage": 123456,
    //       "brand": "Porsche",
    //       "model": "911",
    //       "logo": "porsche.png",
    //     },
    //     {
    //       "id": 185925,
    //       "carBrandId": 4,
    //       "carModelId": 16,
    //       "initialMileage": 123456,
    //       "updatedMileageAt": "2024-08-15T22:48:44.000Z",
    //       "carCreatedAt": "2024-08-15T22:48:44.000Z",
    //       "mileage": 123456,
    //       "brand": "Porsche",
    //       "model": "911",
    //       "logo": "porsche.png",
    //     },
    //     {
    //       "id": 185923,
    //       "carBrandId": 4,
    //       "carModelId": 16,
    //       "initialMileage": 123456,
    //       "updatedMileageAt": "2024-08-15T22:47:37.000Z",
    //       "carCreatedAt": "2024-08-15T22:47:37.000Z",
    //       "mileage": 123456,
    //       "brand": "Porsche",
    //       "model": "911",
    //       "logo": "porsche.png",
    //     },
    //     {
    //       "id": 185922,
    //       "carBrandId": 4,
    //       "carModelId": 16,
    //       "initialMileage": 123456,
    //       "updatedMileageAt": "2024-08-15T22:45:30.000Z",
    //       "carCreatedAt": "2024-08-15T22:45:30.000Z",
    //       "mileage": 123456,
    //       "brand": "Porsche",
    //       "model": "911",
    //       "logo": "porsche.png",
    //     },
    //   ],
    // };
    // await storagePage.route("**/api/cars", (route) =>
    //   route.fulfill({
    //     status: 200,
    //     body: JSON.stringify(carsTestData),
    //   })
    // );
    await storagePage.route("**/users/profile", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(profileTestData),
      })
    );
    const garagePage = new GaragePage(storagePage);
    await garagePage.navigate();
    //await storagePage.pause();

    const profileBtn = storagePage.getByRole("link", { name: "profile" });
    const profileDisplay = storagePage.locator(
      "xpath=//app-profile/div/div[2]/div/p"
    );
    await profileBtn.click();

    //await storagePage.pause();

    await expect(profileDisplay).toHaveText("Stanislav Taran");

    //await storagePage.pause();
  });
});

test.describe("apiTests", () => {
  test.beforeEach("user login", async ({ request }) => {
    const authRequest = await request.post("/api/auth/signin", {
      data: {
        "email": USER,
        "password": PASS,
        "remember": false,
      },
    });
    // const response = await authRequest.json();
    // console.log(response);
  });

  test("Post a new car item", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 122,
      },
    });
    const body = await response.json();
    //console.log(body);
    expect(body.data.brand).toEqual("Audi");
  });

  test("Post request negative-1", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": "sdf",
      },
    });
    const body = await response.json();
    //console.log(body);
    expect(body.message).toEqual("Invalid mileage type");
  });

  test("Post request negative-2", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        "carBrandId": 20,
        "carModelId": 1,
        "mileage": "1231",
      },
    });
    const body = await response.json();
    //console.log(body);
    expect(body.message).toEqual("Brand not found");
  });

  test.afterAll("Delete all user cars", async ({ request }) => {
    const response = await request.get("/api/cars");
    const cars = await response.json();
    const carsData = cars.data;
    //console.log(carsData);
    const carsId = carsData.map((id) => id.id);
    //console.log(carsId);
    for (const carId of carsId) {
      const res = await request.delete(`/api/cars/${carId}`);
    }
  });
});
