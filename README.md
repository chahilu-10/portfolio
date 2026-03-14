# Ryan Chahilu Portfolio

A professional portfolio website for Ryan Chahilu, Health Information Management professional specializing in medical coding, digital health systems, and clinical documentation support.

## 🏗️ Project Structure

```
portfolio/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Complete stylesheet with design tokens
├── script.js           # JavaScript for animations and interactions
└── README.md           # This file
```

## 🎨 Design System

The portfolio is built on a comprehensive design framework with:

### Color Palette
- **Primary**: Navy base (#04111a) with Teal accent ramp (#1D9E75)
- **Typography**: Cormorant Garamond (display) + DM Sans (body) + DM Mono (code)
- **Spacing**: 4px base unit with 12 defined tokens
- **Components**: 8 reusable UI components

### Layout Architecture
- **8 Sections**: Hero → About → Competencies → Projects → Research → Vision → Contact → Footer
- **Responsive**: Desktop (≥961px) → Tablet/Mobile (≤960px) → Small Mobile (≤600px)
- **Grid System**: Various grid patterns for different sections

## 🚀 Features

### ✨ Interactive Elements
- **Sticky Navigation**: Backdrop blur with scroll effects
- **Hero Animation**: Staggered fade-in with rotating ring visual
- **Scroll Animations**: Intersection Observer for section reveals
- **Hover States**: Micro-interactions on cards and buttons
- **Contact Form**: Client-side validation with user feedback

### 📱 Responsive Design
- **Desktop**: Full 2-column hero, 4-column competencies, 3-column projects
- **Tablet**: Single column layout, hidden hero visual
- **Mobile**: Optimized spacing and typography

### 🎭 Animations
- **Hero**: Staggered text reveal (0.15s delays)
- **Ring**: Continuous rotation (30s infinite)
- **Cards**: Lift on hover with border transitions
- **Sections**: Fade-up on scroll with staggered reveals

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: No dependencies, modern ES6+ features
- **Google Fonts**: Cormorant Garamond, DM Sans, DM Mono

## 📁 File Breakdown

### `index.html`
- Semantic HTML5 structure
- 8 main sections following design framework
- Meta tags for SEO
- Proper accessibility attributes

### `styles.css`
- CSS custom properties for design tokens
- Component-based styling
- Responsive breakpoints
- Animation keyframes
- Scrollbar styling

### `script.js`
- Navigation scroll effects
- Intersection Observer animations
- Form validation and handling
- Smooth scrolling
- Parallax effects (desktop only)
- Keyboard navigation support

## 🎯 Section Details

### 1. Hero
- 2-column layout (text + animated ring)
- Floating competency tags
- Call-to-action buttons
- Staggered fade-in animation

### 2. About
- Professional background text
- 2×2 statistics grid
- Hover effects on stat cards

### 3. Competencies
- 4-column skill cards
- Top border accent
- Hover lift animation

### 4. Projects
- 3-column project cards
- Numbered items
- Left border accent
- Category tags

### 5. Research
- Numbered list layout
- Academic contributions
- Border separators

### 6. Vision
- Full-width teal band
- Pull quote styling
- Italic display font

### 7. Contact
- 2-column layout (info + form)
- Contact details display
- Opportunity tags
- Interactive form with validation

### 8. Footer
- Brand reinforcement
- Copyright information

## 🔧 Customization

### Colors
Edit the CSS custom properties in `:root`:
```css
--navy: #04111a;
--teal-500: #1D9E75;
/* etc. */
```

### Content
Update the HTML content sections:
- Personal information in hero
- About section text
- Project descriptions
- Research items
- Contact details

### Typography
Font weights and sizes are controlled through CSS classes and can be adjusted in the stylesheet.

## 🌐 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 📱 Performance

- **No external dependencies** (except Google Fonts)
- **Optimized animations** using CSS transforms
- **Efficient JavaScript** with debouncing
- **Semantic HTML** for SEO and accessibility
- **Minimal asset loading**

## 🚀 Getting Started

1. **Download/clone** the files to your local directory
2. **Open `index.html`** in your web browser
3. **No build process required** - it's ready to use

For deployment:
- Upload all files to your web server
- Ensure the server supports static file serving
- Update contact form action if needed for production

## 📧 Contact Form

The form includes client-side validation. For production use:
- Add a backend endpoint for form submission
- Implement spam protection
- Add email notification system

## 🔄 Future Enhancements

- **Dark/Light mode toggle**
- **Project filtering system**
- **Blog section integration**
- **CMS integration for content management**
- **Advanced animations** with GSAP
- **Performance monitoring**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About Ryan Chahilu

Health Information Management professional with expertise in:
- Medical coding and documentation
- Digital health systems
- Clinical data management
- Healthcare technology research
- Interdisciplinary healthcare collaboration

---

*Built with attention to detail, accessibility, and modern web standards.*
