# SauceDemo E2E Automation Framework

This repository contains an End-to-End (E2E) testing framework for the [SauceDemo](https://www.saucedemo.com/) web application.

## Tech Stack

- **Engine:** [Playwright Test](https://playwright.dev/)
- **Language:** TypeScript
- **Architecture:** Page Object Model (POM) + Playwright Fixtures
- **CI/CD:** GitHub Actions

## Architecture

The framework utilizes Playwright Fixtures alongside the Page Object Model. Instead of manual page object instantiation and handling setup in `beforeEach` hooks, it uses Dependency Injection (e.g., `standardUserPage`) to prepare the application state before test execution.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install --with-deps

   ```

### Environment Variables

Create a `.env` file in the root directory and add the following credentials:

```text
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
GITHUB_TOKEN=your_github_token_here
```

## Running Tests

Run all tests in headless mode:

```bash
npx playwright test
```

Run tests with UI mode:

```bash
npx playwright test --ui
```

View HTML Report:

```bash
npx playwright show-report
```

## Future Plans (Backlog)

Planned features for framework extension:

- [ ] **Global Setup & Storage State:** Caching authentication state to bypass the login UI for subsequent tests.
- [ ] **Visual Regression Testing:** Implementing `toHaveScreenshot()` assertions for layout verification.
- [ ] **Code Quality Tools:** Integrating ESLint, Prettier, and Husky (Git Hooks).
- [ ] **CI/CD Enhancements:** Test sharding across multiple VMs and HTML report deployment to GitHub Pages.
