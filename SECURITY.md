# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of OrbitRate Native seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do the following:

**Do NOT:**
- Open a public GitHub issue
- Disclose the vulnerability publicly before it has been addressed

**Do:**
- Email your findings to [INSERT SECURITY EMAIL]
- Provide detailed information about the vulnerability:
  - Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
  - Full paths of source file(s) related to the manifestation of the issue
  - The location of the affected source code (tag/branch/commit or direct URL)
  - Any special configuration required to reproduce the issue
  - Step-by-step instructions to reproduce the issue
  - Proof-of-concept or exploit code (if possible)
  - Impact of the issue, including how an attacker might exploit the issue

### What to expect:

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Communication**: We will send you regular updates about our progress
- **Timeline**: We aim to patch critical vulnerabilities within 7 days, and other vulnerabilities within 30 days
- **Credit**: If you wish, we will publicly thank you for your responsible disclosure once the issue is resolved

## Security Best Practices for Users

When using OrbitRate Native:

1. **Keep Updated**: Always use the latest version of the app
2. **Device Security**: Ensure your mobile device has the latest OS security patches
3. **App Permissions**: Review and understand the permissions requested by the app
4. **Network Security**: Be cautious when using the app on public Wi-Fi networks
5. **Data Privacy**: The app stores conversion history locally on your device

## Security Features

OrbitRate Native implements the following security measures:

- **Local Storage**: All data is stored locally on your device
- **No Server**: The app does not send your personal data to external servers (except for fetching exchange rates from public APIs)
- **Minimal Permissions**: The app requests only necessary permissions for its functionality
- **Open Source**: The codebase is open for security audits

## Third-Party Dependencies

We regularly monitor and update our dependencies to address known security vulnerabilities. You can check our dependencies in:
- `package.json` for npm packages
- Platform-specific dependency files

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible
5. Announce the vulnerability in the CHANGELOG and release notes

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue.

---

**Last Updated**: 2025-10-13

