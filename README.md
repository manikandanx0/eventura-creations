# Eventura Creations

A modern, accessible website for Eventura Creations - a full-service event management agency specializing in corporate events, product launches, weddings, brand activations, and conferences.

## Project Overview

Eventura Creations is built with a focus on clarity, coordination, and intent. This website showcases the agency's services, featured projects, and provides an easy way for potential clients to get in touch.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Accessible Navigation**: WCAG-compliant navigation with keyboard support and ARIA attributes
- **Mobile Menu**: Touch-friendly hamburger menu for mobile devices with smooth animations
- **Service Showcase**: Detailed service cards highlighting five core offerings
- **Project Portfolio**: Featured case studies with metrics and detailed breakdowns
- **Contact Form**: Simple contact form with validation and success messaging
- **Modern CSS Architecture**: Modular CSS structure with variables, components, and utilities

## Project Structure

```
eventura/
├── assets/
│   ├── images/          # Service and project images
│   └── logo/            # Brand logos (SVG and PNG formats)
│       ├── svg/
│       └── png/
├── css/
│   ├── reset.css        # CSS reset for consistent styling
│   ├── variables.css    # Design tokens (colors, spacing, typography)
│   ├── typography.css   # Font styles and text utilities
│   ├── layout.css       # Grid systems and layout utilities
│   ├── components.css   # Reusable component styles
│   └── pages.css        # Page-specific styles
├── js/
│   ├── main.js          # Navigation and smooth scrolling
│   └── form.js          # Contact form handling
├── index.html           # Homepage
├── services.html        # Services page
├── projects.html        # Projects portfolio
├── about.html           # About page
├── contact.html         # Contact page
├── case-study-novatech.html    # NovaTech case study
└── case-study-lumen.html       # Lumen case study
```

## Pages

### Home (index.html)
- Hero section with tagline and intro text
- Services snapshot with 5 service cards
- Metrics section showcasing achievements
- Featured projects preview
- Call-to-action section

### Services (services.html)
- Detailed service cards with capabilities
- Five core services:
  - Corporate Events & Offsites
  - Product Launches
  - Weddings & Private Celebrations
  - Brand Activations & Experiential Marketing
  - Conferences & Trade Shows

### Projects (projects.html)
- Portfolio of completed projects
- Project cards with metrics and details
- Links to detailed case studies

### About (about.html)
- Company story and philosophy
- Timeline of key milestones
- Differentiators section

### Contact (contact.html)
- Contact form with validation
- Success message handling

### Case Studies
- Detailed project breakdowns
- Challenge, approach, execution, and results
- Measurable outcomes and key takeaways

## Design System

### Colors
- **Primary Background**: #150A35 (Deep purple)
- **Accent**: #DAA3FF (Lavender)
- **Text**: #F5F7FC (Ghost white)
- **Card Background**: rgba(245, 247, 252, 0.05)
- **Border**: rgba(245, 247, 252, 0.1)

### Typography
- **Headings**: Bacasime Antique (serif)
- **Body**: Archivo (sans-serif)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px
- **Extra Small**: 320px - 374px

## Accessibility Features

- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- Sufficient color contrast
- Touch target sizes (minimum 44x44px)
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a web browser
3. No build process required - pure HTML, CSS, and JavaScript

## Development

The project uses vanilla HTML, CSS, and JavaScript with no dependencies or build tools required.

### CSS Architecture

The CSS is organized into modular files:
- **reset.css**: Normalizes browser defaults
- **variables.css**: Centralized design tokens
- **typography.css**: Text styles and font definitions
- **layout.css**: Grid systems and spacing utilities
- **components.css**: Reusable UI components
- **pages.css**: Page-specific styles

### JavaScript Features

- Mobile navigation toggle with accessibility support
- Smooth scrolling for anchor links
- Contact form validation and submission handling
- Click-outside and ESC key menu closing

## Customization

### Updating Colors
Edit `css/variables.css` to change the color scheme:
```css
--color-background: #150A35;
--color-accent: #DAA3FF;
--color-text: #F5F7FC;
```

### Adding New Pages
1. Copy an existing HTML file as a template
2. Update the navigation active state
3. Add page-specific styles to `css/pages.css` if needed

### Modifying Logo
Replace logo files in `assets/logo/svg/` or `assets/logo/png/`
- Current logo variants: cetaceanblue, ghostwhite, lavenderpink

## Performance

- Minimal CSS and JavaScript
- Optimized for fast loading
- No external dependencies
- SVG logos for crisp display at any size

## License

© 2025 Eventura Creations. All rights reserved.

## Contact

For inquiries about Eventura Creations' services, please use the contact form on the website.
