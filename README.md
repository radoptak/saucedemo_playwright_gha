# SauceDemo UI Test Automation Framework

[![Playwright Tests](https://github.com/radoptak/saucedemo_playwright_gha/actions/workflows/playwright.yml/badge.svg)](https://github.com/radoptak/saucedemo_playwright_gha/actions/workflows/playwright.yml)

A portfolio-focused end-to-end UI test automation framework for the [SauceDemo](https://www.saucedemo.com/) web application, built with Playwright and TypeScript.

The project demonstrates reliable browser-based testing using the Page Object Model, custom Playwright fixtures, cross-browser execution, TypeScript validation and continuous integration with GitHub Actions.

## Test Coverage

| Area                | Scenario                                                                            | Validation                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Authentication      | Login with invalid credentials.                                                     | Verifies that the expected error message is displayed.                                      |
| Checkout validation | Attempt checkout with empty customer information.                                   | Verifies that checkout is blocked and the required-field validation message is shown.       |
| Purchase flow       | Complete a purchase from an authenticated inventory state to the confirmation page. | Verifies cart state, selected product on the overview page and successful order completion. |

## Tech Stack

- **Test framework:** Playwright Test.
- **Language:** TypeScript.
- **Architecture:** Page Object Model with custom Playwright fixtures.
- **Test data management:** Centralized test data files.
- **CI/CD:** GitHub Actions.
- **Browsers:** Chromium, Firefox and WebKit.

## Project Structure

```text
.
├── .github/workflows/       # GitHub Actions workflow
├── pages/                   # Page Object Model classes
├── test-data/               # Reusable test input and expected UI data
├── tests/ui/                # End-to-end UI test specifications
├── fixtures.ts              # Custom Playwright fixtures and authenticated setup
├── playwright.config.ts     # Browser projects, reporting and shared configuration
└── tsconfig.json            # TypeScript compiler configuration
```

## Architecture Notes

### Page Object Model

UI selectors and page-level actions are encapsulated in page objects. Test specifications focus on user behaviour and assertions instead of repeating implementation details.

### Custom Fixtures

The framework extends Playwright fixtures with reusable page objects and an authenticated `standardUserPage` fixture. This fixture prepares a logged-in inventory state for tests that do not need to verify the login flow itself.

### Reliable Assertions

Assertions are awaited and placed at meaningful business checkpoints, such as validating the selected product before completing a purchase. This helps reduce the risk of false-positive test results.

### Cross-Browser Execution

Each test runs against three browser engines configured in Playwright:

- Chromium.
- Firefox.
- WebKit.

## Getting Started

### Prerequisites

- Node.js LTS.
- npm.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/radoptak/saucedemo_playwright_gha.git
   cd saucedemo_playwright_gha
   ```

2. Install project dependencies from the lockfile:

   ```bash
   npm ci
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install --with-deps
   ```

4. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

5. Provide valid SauceDemo test credentials in `.env`:

   ```text
   SAUCE_USERNAME=standard_user
   SAUCE_PASSWORD=secret_sauce
   ```

## Running Tests

Run the full cross-browser test suite:

```bash
npm test
```

Run TypeScript validation:

```bash
npm run typecheck
```

Run tests in Playwright UI mode:

```bash
npx playwright test --ui
```

Open the latest HTML report:

```bash
npx playwright show-report
```

## Continuous Integration

GitHub Actions runs the validation pipeline on pushes and pull requests targeting `main` or `master`.

The pipeline:

1. Installs dependencies using `npm ci`.
2. Runs TypeScript validation with `npm run typecheck`.
3. Restores or installs Playwright browser dependencies.
4. Executes the Playwright test suite.
5. Uploads the HTML report as a workflow artifact.

## Planned Improvements

- Add ESLint and Prettier for automated code quality and formatting checks.
- Add visual regression coverage for selected UI states.
- Introduce stored authentication state for tests that do not exercise authentication behaviour, while retaining dedicated login coverage.
