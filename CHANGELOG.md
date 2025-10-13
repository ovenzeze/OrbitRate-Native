# Changelog

All notable changes to OrbitRate Native will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Android platform support
- Exchange rate API integration
- Historical rate charts
- Rate alerts and notifications
- Currency search functionality
- Export conversion history
- Widget support

## [1.0.0] - 2025-10-13

### 🎉 Initial Release

The first public release of OrbitRate Native - an elegant currency exchange rate converter built with NativeScript and Vue.js.

### ✨ Added

#### Core Features
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

#### UI/UX Features
- **Modern Design**:
  - Dark-first theme with elegant color scheme
  - Smooth animations and transitions
  - Native iOS look and feel
  - Custom tap animations for better user feedback
- **Bottom Navigation**: Easy navigation between Convert, History, Favorites, and Settings
- **Country Flags**: Visual currency indicators with flag icons
- **Responsive Layout**: Optimized for various iOS screen sizes

#### Technical Features
- **NativeScript 8.9**: Latest NativeScript framework
- **Vue.js 2.6**: Reactive UI framework
- **TypeScript 5.4**: Type-safe development
- **SCSS Styling**: Organized and maintainable styles
- **Local Storage**: ApplicationSettings for user preferences
- **Touch Animations**: Global tap animations for enhanced UX

### 📱 Platform Support
- iOS 14.0+
- iPhone and iPad compatible
- Optimized for iPhone 13/14/15 series

### 🎨 Design System
- **Primary Color**: `#6366f1` (Indigo)
- **Dark Background**: `#13151f`
- **Card Background**: `#1a1d29`
- **Typography**: Crimson Text font family
- **Icons**: Font Awesome 6.0

### 📦 Bundle Information
- **Bundle ID**: `org.nativescript.OrbitRateNative`
- **Team ID**: ZWR64GCC4R
- **Version**: 1.0.0
- **Build**: 1

### 🔧 Development
- **Build System**: Webpack 5
- **Package Manager**: npm/pnpm
- **Code Style**: ESLint + Prettier
- **Commit Format**: Structured commit messages

### 📚 Documentation
- Comprehensive README with setup instructions
- iOS release checklist
- Settings page improvement plans
- Build and installation guides

### 🐛 Known Limitations
- iOS only (Android support planned)
- Static exchange rates (API integration planned)
- No offline rate updates (requires manual refresh)
- Limited to pre-configured currency pairs

### 🔒 Security
- No user data collection
- All data stored locally on device
- No external network calls (except future rate API)
- Open source for community audit

---

## Version History

### Legend
- 🎉 Major Release
- ✨ New Feature
- 🐛 Bug Fix
- 📱 Platform Update
- 🎨 UI/UX Improvement
- 🔧 Technical Change
- 📚 Documentation
- 🔒 Security
- ⚡ Performance
- 🗑️ Deprecated

---

[Unreleased]: https://github.com/OrbitRate/OrbitRate-Native/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/OrbitRate/OrbitRate-Native/releases/tag/v1.0.0

