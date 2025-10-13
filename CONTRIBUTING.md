# Contributing to OrbitRate Native

First off, thank you for considering contributing to OrbitRate Native! It's people like you that make OrbitRate Native such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [INSERT CONTACT EMAIL].

## Getting Started

- Make sure you have a [GitHub account](https://github.com/signup/free)
- Submit an issue for your problem if one does not already exist
  - Clearly describe the issue including steps to reproduce when it is a bug
  - Make sure you fill in the earliest version that you know has the issue
- Fork the repository on GitHub

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots or animated GIFs** if possible
* **Include your environment details**:
  - OS version (iOS version)
  - App version
  - Device model

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior** and **explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**
* **List some other apps where this enhancement exists** (if applicable)

### Your First Code Contribution

Unsure where to begin? You can start by looking through these `good-first-issue` and `help-wanted` issues:

* **Good first issues** - issues which should only require a few lines of code
* **Help wanted issues** - issues which should be a bit more involved than beginner issues

## Development Setup

### Prerequisites

- Node.js 14+
- NativeScript CLI 8.9+
- macOS with Xcode 14+ (for iOS development)
- Apple Developer Account (Team ID: ZWR64GCC4R)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/OrbitRate-Native.git
cd OrbitRate-Native

# Install dependencies
npm install

# Run the app
ns run ios
```

### Project Structure

```
app/
├── components/       # Reusable UI components
├── views/           # Page views
├── services/        # API and utility services
├── store/           # State management (Vuex)
├── styles/          # Global styles
└── app.ts           # Application entry point
```

## Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [Style Guidelines](#style-guidelines)

3. **Test your changes**:
   ```bash
   # Run the app on iOS
   ns run ios
   
   # Test on a physical device if possible
   ```

4. **Commit your changes** following our [Commit Message Guidelines](#commit-message-guidelines)

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** with a clear title and description

7. **Update the CHANGELOG.md** with details of changes

8. **Ensure all checks pass** (if CI/CD is configured)

### Pull Request Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added to complex code sections
- [ ] Documentation updated (if applicable)
- [ ] No new warnings generated
- [ ] Tested on iOS device/simulator
- [ ] CHANGELOG.md updated

## Style Guidelines

### Naming Conventions

- **Components**: PascalCase (e.g., `CurrencyCard.vue`)
- **Folders**: kebab-case (e.g., `currency-picker/`)
- **Variables/Functions**: camelCase (e.g., `convertCurrency`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_CURRENCY`)
- **Database Fields**: snake_case (e.g., `created_at`, `updated_at`)

### TypeScript Guidelines

```typescript
// ✅ Good
interface ExchangeRate {
  from_currency: string;
  to_currency: string;
  rate: number;
  updated_at: Date;
}

// ❌ Bad
interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  updatedAt: Date;
}
```

### Vue Component Structure

```vue
<template>
  <!-- Template content -->
</template>

<script lang="ts">
import Vue from 'nativescript-vue';

export default Vue.extend({
  name: 'ComponentName',
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
});
</script>

<style scoped lang="scss">
/* Component styles */
</style>
```

### SCSS Guidelines

- Use variables from `styles/variables.scss`
- Follow mobile-first approach
- Use meaningful class names
- Avoid deep nesting (max 3 levels)

## Commit Message Guidelines

We follow a structured commit message format:

```
<type>: <short description>

🚀 Main Updates:
- Specific change 1
- Specific change 2

📁 New Files:
- file/path - file description

🔨 Updated Components:
- ComponentName - update description

✅ Verification Completed:
- Verification item 1
- Verification item 2
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Example

```
feat: add currency search functionality

🚀 Main Updates:
- Implemented search bar in currency picker
- Added fuzzy search algorithm
- Highlighted matching results

📁 New Files:
- app/components/CurrencySearch.vue - Search component

🔨 Updated Components:
- CurrencyPicker.vue - Integrated search functionality
- Convert.vue - Added search trigger button

✅ Verification Completed:
- Tested on iPhone 13 simulator
- Verified search performance with 150+ currencies
- Confirmed accessibility features work correctly
```

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

### What Reviewers Look For

- Code quality and clarity
- Adherence to style guidelines
- Test coverage
- Performance implications
- Security considerations
- Documentation completeness

## Questions?

Feel free to open an issue with the `question` label, or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to OrbitRate Native! 🎉**

