# Changelog

All notable changes to OrbitRate Native will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Android platform support (planned)
- Exchange rate API integration (planned)
- Historical rate charts (planned)
- Rate alerts and notifications (planned)
- Currency search functionality (planned)
- Export conversion history (planned)
- Widget support (planned)

## [1.0.0] - 2025-10-13

### Added
- **Currency Converter**: Real-time currency conversion with elegant UI
- **Quick Pairs**: Pre-configured common currency pairs for quick access
  - USD ⇄ CNY, EUR ⇄ USD, GBP ⇄ USD
  - JPY ⇄ CNY, HKD ⇄ CNY, AUD ⇄ USD
- **Swap Functionality**: Quick swap between source and target currencies with smooth animation
- **History Tracking**: View and manage conversion history
- **Favorites System**: 
  - Save favorite currency pairs
  - Save specific conversion results
  - Quick load saved pairs
- **Settings Page**:
  - Dark mode toggle (Dark mode enabled by default)
  - Data source information display
  - App information and version
  - Links to Terms of Service and Privacy Policy
- **Modern Design**:
  - Dark-first theme with elegant color scheme
  - Smooth animations and transitions
  - Native iOS look and feel
  - Custom tap animations for better user feedback
- **Bottom Navigation**: Easy navigation between Convert, History, Favorites, and Settings
- **Country Flags**: Visual currency indicators with flag icons
- **Responsive Layout**: Optimized for various iOS screen sizes
- **Technical Stack**:
  - NativeScript 8.9 framework
  - Vue.js 2.6 reactive UI framework
  - TypeScript 5.4 type-safe development
  - SCSS styling for organized and maintainable styles
  - Local storage using ApplicationSettings for user preferences
  - Touch animations for enhanced UX

### Changed
- Initial release with complete iOS application

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- No user data collection
- All data stored locally on device
- No external network calls (except future rate API)
- Open source for community audit

---

[Unreleased]: https://github.com/OrbitRate/OrbitRate-Native/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/OrbitRate/OrbitRate-Native/releases/tag/v1.0.0