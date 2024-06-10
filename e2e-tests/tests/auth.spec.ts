import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // Get the sign in button and click it
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Fill out the form
  await page.locator("[name=email]").fill("1@gmail.com");
  await page.locator("[name=password]").fill("111111");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmailRandom = `test_${
    Math.floor(Math.random() * 90000) + 10000
  }@gmail.com`;

  await page.goto(UI_URL);

  // Get the register button and click it
  await page.getByRole("link", { name: "Register" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  // Fill out the form
  await page.locator("[name=email]").fill(testEmailRandom);
  await page.locator("[name=password]").fill("111111");
  await page.locator("[name=confirmPassword]").fill("111111");
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registered successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
