# Project Information

This document contains metadata and essential information about the OrbitRate Native project for contributors and maintainers.

## 📋 Basic Information

| Property | Value |
|----------|-------|
| **Project Name** | OrbitRate Native |
| **Repository** | https://github.com/OrbitRate/OrbitRate-Native |
| **Version** | 1.0.0 |
| **License** | MIT |
| **Primary Language** | TypeScript |
| **Framework** | NativeScript 8.9+ |
| **UI Framework** | Vue.js 2.6 |
| **Platform** | iOS 14.0+ (Android planned) |
| **Status** | Active Development |

## 🎯 Project Vision

OrbitRate Native aims to provide the most elegant and user-friendly currency conversion experience on mobile devices, combining native performance with modern design principles.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Vue.js 2.6 with TypeScript
- **Mobile Framework**: NativeScript 8.9
- **State Management**: Vuex
- **Styling**: SCSS with CSS Variables
- **Build Tool**: Webpack 5
- **Package Manager**: npm/pnpm

### Project Structure
```
OrbitRate-Native/
├── app/                    # Application source code
│   ├── components/         # Reusable UI components
│   ├── views/             # Page views
│   ├── services/          # Business logic & API
│   ├── store/             # State management
│   ├── styles/            # Global styles
│   └── app.ts             # Entry point
├── App_Resources/         # Platform-specific resources
│   ├── iOS/               # iOS assets
│   └── Android/           # Android assets (future)
├── docs/                  # Documentation
├── .github/               # GitHub configuration
└── platforms/             # Native platform code (generated)
```

## 👥 Team & Roles

### Maintainers
- **Core Team**: OrbitRate Team
- **Lead Developer**: [To be assigned]
- **iOS Specialist**: [To be assigned]
- **Android Specialist**: [To be assigned - future]

### Responsibilities
- **Code Review**: All PRs require at least one approval
- **Release Management**: Core team handles versioning and releases
- **Issue Triage**: Maintainers triage issues within 48 hours
- **Security**: Core team handles security reports

## 📊 Project Metrics

### Target Metrics (2025)
- GitHub Stars: 100+
- Contributors: 10+
- Issues Resolved: 90%+
- Test Coverage: 80%+
- App Store Rating: 4.5+

### Current Status (v1.0.0)
- Initial Release
- iOS Only
- Core features implemented
- Community building phase

## 🔄 Release Cycle

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features (backward compatible)
- **Patch** (0.0.X): Bug fixes

### Release Schedule
- **Patch releases**: As needed (critical bugs)
- **Minor releases**: Monthly or bi-monthly
- **Major releases**: Quarterly or when significant changes accumulate

### Release Process
1. Update CHANGELOG.md
2. Bump version in package.json
3. Create release branch
4. Run full test suite
5. Build and test on devices
6. Create GitHub release
7. Tag with version number
8. Announce release

## 🐛 Bug Management

### Priority Levels
- **P0 - Critical**: App crashes, data loss, security issues
- **P1 - High**: Major features broken, performance issues
- **P2 - Medium**: Minor features broken, UI issues
- **P3 - Low**: Cosmetic issues, nice-to-haves

### Bug Lifecycle
1. **New**: Bug reported
2. **Triaged**: Assigned priority and milestone
3. **In Progress**: Developer working on fix
4. **Review**: PR submitted, under review
5. **Testing**: Fix merged, pending verification
6. **Closed**: Fix verified and released

## 🚀 Feature Development

### Feature Request Process
1. Submit feature request via GitHub Issues
2. Community discussion and feedback
3. Core team reviews and approves
4. Milestone assignment
5. Implementation
6. Testing and review
7. Release

### Feature Prioritization
Features are prioritized based on:
- User impact and demand
- Technical complexity
- Resource availability
- Strategic alignment
- Security and privacy considerations

## 🔐 Security

### Security Policy
- See [SECURITY.md](../SECURITY.md) for full policy
- Security reports are handled privately
- Patches released ASAP for critical issues
- CVE assigned for significant vulnerabilities

### Supported Versions
- Latest major version receives full support
- Previous major version receives security patches for 6 months

## 📚 Documentation Standards

### Documentation Types
1. **README.md**: Project overview and quick start
2. **CONTRIBUTING.md**: Contribution guidelines
3. **CHANGELOG.md**: Version history
4. **API Documentation**: Code documentation (JSDoc)
5. **User Guide**: End-user documentation (future)

### Documentation Requirements
- All public APIs must be documented
- Complex logic requires inline comments
- Breaking changes must be documented in CHANGELOG
- New features require README updates

## 🧪 Testing Standards

### Testing Requirements
- Unit tests for business logic
- Component tests for UI components
- Integration tests for critical flows
- Manual testing on real devices before release

### Test Coverage Goals
- Overall: 80%+
- Critical paths: 95%+
- New features: 90%+

## 🎨 Design System

### Brand Identity
- **Primary Color**: #6366f1 (Indigo)
- **Dark Theme**: Default and optimized
- **Typography**: Crimson Text (display), System fonts (UI)
- **Icons**: Font Awesome 6.0

### Design Principles
1. **Simplicity**: Clean, uncluttered interface
2. **Consistency**: Uniform patterns and behaviors
3. **Performance**: Smooth, responsive interactions
4. **Accessibility**: Inclusive design for all users
5. **Native Feel**: Platform-appropriate UI patterns

## 📱 Platform Strategy

### Current: iOS
- **Minimum Version**: iOS 14.0
- **Target Devices**: iPhone 8 and newer
- **Testing Devices**: iPhone 13 Pro, iPhone SE (2020)

### Future: Android
- **Target Date**: Q1 2026
- **Minimum Version**: Android 7.0 (API 24)
- **Target Devices**: Popular Android phones

## 🌍 Internationalization (Future)

### Planned Languages (v1.2.0+)
- English (en) - Default
- 中文 (zh-CN, zh-TW)
- 日本語 (ja)
- Español (es)
- Français (fr)

## 📊 Analytics & Privacy

### Data Collection
- **Current**: No analytics or tracking
- **Future**: Optional, privacy-respecting analytics
- **Principle**: User privacy is paramount

### Privacy Commitments
- No personal data collection
- No third-party tracking
- Local-only data storage
- Open source transparency

## 🔗 Useful Links

### Development
- [NativeScript Docs](https://docs.nativescript.org/)
- [Vue.js Guide](https://vuejs.org/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community
- [GitHub Issues](https://github.com/OrbitRate/OrbitRate-Native/issues)
- [GitHub Discussions](https://github.com/OrbitRate/OrbitRate-Native/discussions)
- [Twitter](https://twitter.com/OrbitRate)

### Resources
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design) (for future Android)

## 📅 Important Dates

| Date | Event |
|------|-------|
| 2025-10-13 | Project launch (v1.0.0) |
| 2025-Q4 | v1.1.0 - API integration |
| 2026-Q1 | v1.2.0 - Android support |
| 2026-Q2 | v2.0.0 - Major features |

## 🤝 Partnerships & Acknowledgments

### Data Providers
- ExchangeRate-API (planned)

### Open Source Credits
- NativeScript Team
- Vue.js Team
- TypeScript Team
- All open source contributors

---

**Last Updated**: 2025-10-13
**Document Version**: 1.0.0

