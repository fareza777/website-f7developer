import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage presents real products and loads all artwork without overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "F7Developer.",
  );
  for (const section of [
    "Featured Games",
    "Apps & Tools",
    "Web Projects",
    "Latest Updates",
  ])
    await expect(
      page.getByRole("heading", { name: section, exact: true }),
    ).toBeVisible();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll(
          (images) =>
            images.filter(
              (image) =>
                !(image as HTMLImageElement).complete ||
                (image as HTMLImageElement).naturalWidth === 0,
            ).length,
        ),
    )
    .toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `artifacts/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `artifacts/preview-${testInfo.project.name}.png`,
  });
});

test("catalogue filters combine with search, support empty states, and use official links", async ({
  page,
}) => {
  await page.goto("/games/");
  await expect(page.locator(".game-card")).toHaveCount(5);
  await page
    .getByRole("button", { name: "Roguelike RPG", exact: true })
    .click();
  await expect(page.locator(".game-card")).toHaveCount(2);
  await page.getByRole("searchbox", { name: "Search games" }).fill("AEON");
  await expect(page.locator(".game-card")).toHaveCount(1);
  await page.getByRole("searchbox").fill("not-a-real-title");
  await expect(
    page.getByRole("heading", { name: "No matches this time." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".game-card")).toHaveCount(5);
  await page
    .getByRole("link", { name: "Discover Shardfall", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Shardfall.",
  );
  await expect(
    page.getByRole("link", { name: "Get on Google Play", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.shardfall.shardfall",
  );
  await page
    .getByRole("button", {
      name: "Enlarge Shardfall screenshot 1",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Next screenshot" }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("img", { name: "Shardfall screenshot 2", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("product category deep links and release filters work", async ({
  page,
}) => {
  await page.goto("/products/?category=Apps");
  await expect(page.locator(".app-card")).toHaveCount(8);
  await expect(page.locator(".game-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.locator(".web-card")).toHaveCount(2);
  await page.reload();
  await expect(page.locator(".web-card")).toHaveCount(2);
  await page
    .getByRole("navigation", { name: "Footer navigation" })
    .getByRole("link", { name: "Products", exact: true })
    .click();
  await expect(page.locator(".game-card")).toHaveCount(5);
  await expect(page.locator(".app-card")).toHaveCount(8);
  await page.goto("/updates/");
  await page.getByRole("button", { name: "App updates", exact: true }).click();
  await expect(page.locator(".update-card")).toHaveCount(1);
  await expect(page.locator(".update-card")).toContainText("AI Work Studio");
});

test("primary pages are accessible and mobile navigation supports the keyboard", async ({
  page,
}, testInfo) => {
  for (const route of [
    "/",
    "/games/",
    "/products/?category=Apps",
    "/studio/",
    "/updates/",
    "/contact/",
    "/games/shardfall/",
  ]) {
    await page.goto(route);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `Overflow on ${route}`,
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      `Accessibility on ${route}`,
    ).toEqual([]);
  }
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: /Games/ })
      .click();
    await expect(page).toHaveURL(/\/games\/$/);
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeVisible();
  }
});

test("contact prepares a truthful, correctly addressed email draft", async ({
  page,
}) => {
  await page.goto("/contact/");
  await page.getByLabel("Your name", { exact: true }).fill("Alex & Morgan");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page
    .getByLabel("Your message", { exact: true })
    .fill("I need help with Shardfall & my saved game.");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(
    page.getByText("Your draft is ready.", { exact: true }),
  ).toBeVisible();
  const draft = await page
    .getByRole("link", { name: "open the draft", exact: true })
    .getAttribute("href");
  expect(draft).toContain("mailto:fajar.mreza@gmail.com?");
  expect(decodeURIComponent(draft!)).toContain("Alex & Morgan");
  await expect(page.locator(".draft-status")).not.toContainText(
    "sent successfully",
  );
});

test("small phones and tablets keep primary layouts within the viewport", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Additional viewport checks run once.",
  );
  for (const width of [320, 360, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/games/",
      "/products/?category=Apps",
      "/contact/",
      "/games/shadow-depths/",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("product catalogues are available before JavaScript loads", async ({
  browser,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Static HTML check runs once.",
  );
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: testInfo.project.use.baseURL,
  });
  const page = await context.newPage();
  await page.goto("/games/");
  await expect(page.locator(".game-card")).toHaveCount(5);
  await page.goto("/products/");
  await expect(page.locator(".app-card")).toHaveCount(8);
  await expect(page.locator(".web-card")).toHaveCount(2);
  await context.close();
});
