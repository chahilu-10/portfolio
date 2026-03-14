// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScrolling();
});

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(4,17,26,0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(4,17,26,0.95)';
            nav.style.boxShadow = 'none';
            nav.style.backdropFilter = 'blur(16px)';
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--teal-300)';
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // For staggered animations
                if (entry.target.classList.contains('competency-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.competency-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
                
                if (entry.target.classList.contains('project-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('research-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.research-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
                
                if (entry.target.classList.contains('stat-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.stat-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-content,
        .about-stats,
        .competency-card,
        .project-card,
        .research-item,
        .contact-info,
        .contact-form,
        .vision-quote,
        .stat-card
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Add rate limiting and security
        let lastSubmitTime = 0;
        const submitCooldown = 60000; // 60 seconds
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Rate limiting check
            const currentTime = Date.now();
            if (currentTime - lastSubmitTime < submitCooldown) {
                showFormMessage('Please wait before submitting another message.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent.substring(0, 200) // Limit UA length
            };
            
            // Enhanced validation
            if (!validateForm(data)) {
                return;
            }
            
            // Update last submit time
            lastSubmitTime = currentTime;
            
            // Disable submit button during processing
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Check if EmailJS is properly configured
            const config = window.emailjsConfig;
            if (!config || config.publicKey === "YOUR_PUBLIC_KEY" || !config.serviceId || !config.templateId) {
                // Fallback: Open email client with pre-filled data
                const mailtoLink = `mailto:ryanchahilu432@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
                window.location.href = mailtoLink;
                showFormMessage('Opening your email client...', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                return;
            }
            
            // Dynamically load EmailJS
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = function() {
                emailjs.init(config.publicKey);
                
                // Send email using EmailJS
                emailjs.send(config.serviceId, config.templateId, {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                    reply_to: "ryanchahilu432@gmail.com"
                })
                .then(function(response) {
                    if (response.status === 200) {
                        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                        form.reset();
                        console.log('Email sent successfully:', response);
                    } else {
                        showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                        console.error('EmailJS error:', response);
                    }
                })
                .catch(function(error) {
                    console.error('EmailJS failed:', error);
                    showFormMessage('Network error. Please check your connection and try again.', 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
            };
            script.onerror = function() {
                console.error('Failed to load EmailJS script');
                showFormMessage('Service unavailable. Please try again later.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            };
            document.head.appendChild(script);
        });
        
        // Add input focus effects and security
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            // Add input sanitization on paste
            input.addEventListener('paste', function(e) {
                setTimeout(() => {
                    const value = input.value;
                    // Basic XSS prevention
                    input.value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*<\/script>)/gi, '');
                }, 10);
            });
            
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter your full name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Please enter a subject');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.innerHTML = message;
    
    // Style the message
    messageEl.style.cssText = `
        padding: 1rem 1.5rem;
        margin-top: 1rem;
        border-radius: var(--r-md);
        font-size: 0.85rem;
        line-height: 1.5;
        ${type === 'success' 
            ? `background: rgba(29,158,117,0.1); 
               border: 0.5px solid var(--teal-500); 
               color: var(--teal-300);`
            : `background: rgba(212,169,106,0.1); 
               border: 0.5px solid var(--gold-500); 
               color: var(--gold-300);`
        }
        animation: fadeUp 0.3s ease;
    `;
    
    // Add to form
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'fadeUp 0.3s ease reverse';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add parallax effect to hero visual (desktop only)
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && window.innerWidth > 960) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroVisual.style.transform = `translateY(${parallax}px)`;
        }, 10));
    }
}

// Initialize parallax on load
window.addEventListener('load', initParallax);

// Add resize handler for responsive features
window.addEventListener('resize', debounce(function() {
    // Reinitialize features that depend on screen size
    initParallax();
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any open modals or reset focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class when using mouse
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add loading complete class
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any post-load animations
    setTimeout(() => {
        document.body.classList.add('animations-ready');
    }, 100);
});
