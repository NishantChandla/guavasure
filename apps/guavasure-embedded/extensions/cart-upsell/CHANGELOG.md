# Changelog

All notable changes to the Guavasure Pet Insurance Extension will be documented in this file.

## [2.0.0] - 2025-10-26

### 🎉 Complete Rebuild - Pet Insurance Focus

#### Added

- **Full Insurance Flow**: Complete end-to-end insurance purchase experience

  - Multi-step modal with progress tracking
  - Pet details collection form
  - Real-time quote generation
  - Secure payment processing
  - Instant policy issuance

- **Comprehensive Customization**: 18+ customization options via theme editor

  - Banner appearance (colors, spacing, typography)
  - Icon customization
  - Position control
  - Display options

- **Advanced Form Fields**:

  - Pet type selection (Dog, Cat, Other)
  - Breed information
  - Age and weight inputs
  - Vaccination status
  - Health status checkboxes
  - Pre-existing conditions textarea

- **Quote Display Features**:

  - Monthly vs. Annual pricing comparison
  - Savings calculator
  - Coverage details breakdown
  - Quote validity tracking

- **Payment Integration**:

  - Card payment form
  - Order summary
  - Terms acceptance
  - Secure payment badge

- **Policy Management**:

  - Instant policy generation
  - Policy document download
  - Email policy option
  - Coverage date display
  - Transaction tracking

- **Enhanced Admin Panel**:

  - Icon settings section
  - Extended color options
  - Live banner preview
  - Commission tracking

- **Responsive Design**:

  - Mobile-optimized layouts
  - Touch-friendly interactions
  - Adaptive modal sizing
  - Stacked forms on mobile

- **Accessibility Features**:
  - Keyboard navigation
  - Focus indicators
  - Screen reader support
  - High contrast compatibility

#### Changed

- Renamed extension from "Star Rating" to "Pet Insurance Banner"
- Updated extension type from product rating to insurance sales
- Modernized UI with gradient backgrounds and smooth animations
- Improved form validation and error handling
- Enhanced API integration patterns

#### Removed

- Star rating functionality
- Product recommendation features
- Thumbs-up rating system
- Product-specific blocks

### Technical Improvements

- Implemented state management for multi-step flow
- Added loading states between steps
- Improved error handling with user-friendly messages
- Enhanced CSS with modern flexbox/grid layouts
- Added print styles for policy documents
- Implemented ESC key to close modal
- Added click-outside to close modal
- Optimized animations and transitions

### Files Changed

- `blocks/insurance-banner.liquid` (completely rewritten)
- `assets/insurance-modal.js` (new file, 500+ lines)
- `assets/insurance-modal.css` (new file, 600+ lines)
- `locales/en.default.json` (restructured for insurance)

### Files Removed

- `blocks/star_rating.liquid`
- `snippets/stars.liquid`

---

## [1.0.0] - Previous Version

### Initial Release

- Basic star rating system
- Product recommendations
- Simple theme block
- Limited customization

---

## Future Roadmap

### [2.1.0] - Planned

- Multiple pet support in single policy
- Policy comparison tool
- Customer testimonials integration
- Advanced analytics dashboard

### [2.2.0] - Planned

- SMS notifications for policy updates
- Mobile app integration
- Gift insurance feature
- Referral program

### [3.0.0] - Planned

- AI-powered breed detection from photos
- Video consultation booking
- Veterinary network integration
- Claims filing through extension
