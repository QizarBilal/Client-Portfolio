// Enhanced Portfolio Features

// Advanced Theme System
class ThemeManager {
    constructor() {
        this.themes = {
            pink: {
                primary: '#ec4899',
                secondary: '#f472b6',
                accent: '#a855f7',
                background: '#fdf2f8',
                surface: '#fce7f3',
                textPrimary: '#831843',
                textSecondary: '#be185d',
                borderColor: '#f9a8d4'
            },
            light: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                accent: '#10b981',
                background: '#ffffff',
                surface: '#f8fafc',
                textPrimary: '#1e293b',
                textSecondary: '#64748b',
                borderColor: '#e2e8f0'
            },
            dark: {
                primary: '#7c3aed',
                secondary: '#c084fc',
                accent: '#06d6a0',
                background: '#0d1117',
                surface: '#161b22',
                textPrimary: '#f0f6fc',
                textSecondary: '#8b949e',
                borderColor: '#30363d'
            },
            neon: {
                primary: '#00ffff',
                secondary: '#ff00ff',
                accent: '#00ff41',
                background: '#000000',
                surface: '#0a0a0a',
                textPrimary: '#ffffff',
                textSecondary: '#b3b3b3',
                borderColor: '#1a1a1a'
            },
            sunset: {
                primary: '#ff6b35',
                secondary: '#f7931e',
                accent: '#ffcc02',
                background: '#fef7f0',
                surface: '#fff4e6',
                textPrimary: '#8b4513',
                textSecondary: '#d2691e',
                borderColor: '#ffd4a3'
            }
        };
        this.currentTheme = 'pink';
        this.init();
    }

    init() {
        // Ensure body has proper data-theme attribute
        document.body.setAttribute('data-theme', 'pink');
        this.createThemeSelector();
        this.loadSavedTheme();
    }

    createThemeSelector() {
        const themeSelector = document.createElement('div');
        themeSelector.className = 'theme-selector';
        themeSelector.innerHTML = `
            <div class="theme-options">
                <div class="theme-option" data-theme="pink">
                    <div class="theme-preview pink-preview"></div>
                    <span>Pink</span>
                </div>
                <div class="theme-option" data-theme="light">
                    <div class="theme-preview light-preview"></div>
                    <span>Light</span>
                </div>
                <div class="theme-option" data-theme="dark">
                    <div class="theme-preview dark-preview"></div>
                    <span>Dark</span>
                </div>
                <div class="theme-option" data-theme="neon">
                    <div class="theme-preview neon-preview"></div>
                    <span>Neon</span>
                </div>
                <div class="theme-option" data-theme="sunset">
                    <div class="theme-preview sunset-preview"></div>
                    <span>Sunset</span>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-selector {
                position: fixed;
                top: 80px;
                right: -300px;
                background: var(--surface);
                border-radius: 15px;
                padding: 1rem;
                border: 2px solid var(--border-color);
                box-shadow: 0 10px 30px var(--shadow);
                z-index: 1001;
                transition: right 0.3s ease;
                backdrop-filter: blur(10px);
                width: 250px;
                opacity: 0;
                visibility: hidden;
            }
            .theme-selector.open {
                right: 20px;
                opacity: 1;
                visibility: visible;
            }
            .theme-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
            }
            .theme-option {
                padding: 0.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                border: 2px solid transparent;
                color: var(--text-primary);
                font-size: 0.8rem;
                font-weight: 500;
            }
            .theme-option:hover {
                background: var(--primary-color);
                color: white;
                transform: scale(1.05);
            }
            .theme-option.active {
                border-color: var(--primary-color);
                background: rgba(var(--primary-color), 0.1);
            }
            .theme-preview {
                width: 30px;
                height: 20px;
                border-radius: 4px;
                margin: 0 auto 0.25rem;
                border: 1px solid var(--border-color);
            }
            .pink-preview { background: linear-gradient(45deg, #ec4899, #f472b6); }
            .light-preview { background: linear-gradient(45deg, #6366f1, #8b5cf6); }
            .dark-preview { background: linear-gradient(45deg, #7c3aed, #c084fc); }
            .neon-preview { background: linear-gradient(45deg, #00ffff, #ff00ff); }
            .sunset-preview { background: linear-gradient(45deg, #ff6b35, #f7931e); }
        `;
        document.head.appendChild(style);
        document.body.appendChild(themeSelector);

        // Add click handlers
        themeSelector.addEventListener('click', (e) => {
            const option = e.target.closest('.theme-option');
            if (option) {
                const theme = option.dataset.theme;
                this.setTheme(theme);
            }
        });

        // Add toggle to existing theme toggle button
        const existingToggle = document.querySelector('.theme-toggle');
        if (existingToggle) {
            existingToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                themeSelector.classList.toggle('open');
            });
        }

        this.themeSelector = themeSelector;
    }

    setTheme(themeName) {
        if (!this.themes[themeName]) return;

        this.currentTheme = themeName;
        
        // Set data-theme attribute on body for CSS theme switching
        document.body.setAttribute('data-theme', themeName);
        
        // Update active theme option
        if (this.themeSelector) {
            this.themeSelector.querySelectorAll('.theme-option').forEach(option => {
                option.classList.toggle('active', option.dataset.theme === themeName);
            });
        }

        localStorage.setItem('portfolio-theme', themeName);
        if (this.themeSelector) {
            this.themeSelector.classList.remove('open');
        }
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('portfolio-theme') || 'pink';
        this.setTheme(saved);
        
        // Update active state in theme selector
        if (this.themeSelector) {
            this.themeSelector.querySelectorAll('.theme-option').forEach(option => {
                option.classList.toggle('active', option.dataset.theme === saved);
            });
        }
    }
}

// Advanced Portfolio Analytics
class PortfolioAnalytics {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            pageViews: 0,
            interactions: 0,
            sectionsViewed: new Set(),
            projectsViewed: new Set(),
            timeSpent: {}
        };
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackScrollBehavior();
        this.trackInteractions();
        this.trackSectionViewing();
        this.setupPeriodicSave();
    }

    trackPageView() {
        this.sessionData.pageViews++;
        this.logEvent('page_view', { timestamp: Date.now() });
    }

    trackScrollBehavior() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                this.logEvent('scroll', { 
                    scrollPercent: Math.round(scrollPercent),
                    timestamp: Date.now()
                });
            }, 150);
        });
    }

    trackInteractions() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, .project-card, .skill-item');
            if (target) {
                this.sessionData.interactions++;
                const elementType = target.tagName.toLowerCase();
                const elementClass = target.className;
                
                this.logEvent('interaction', {
                    type: elementType,
                    class: elementClass,
                    timestamp: Date.now()
                });

                // Track specific project views
                if (target.classList.contains('project-card')) {
                    const projectTitle = target.querySelector('.project-title')?.textContent;
                    if (projectTitle) {
                        this.sessionData.projectsViewed.add(projectTitle);
                    }
                }
            }
        });
    }

    trackSectionViewing() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.sessionData.sectionsViewed.add(sectionId);
                    
                    if (!this.sessionData.timeSpent[sectionId]) {
                        this.sessionData.timeSpent[sectionId] = Date.now();
                    }
                    
                    this.logEvent('section_view', {
                        section: sectionId,
                        timestamp: Date.now()
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    setupPeriodicSave() {
        setInterval(() => {
            this.saveSession();
        }, 30000); // Save every 30 seconds

        window.addEventListener('beforeunload', () => {
            this.saveSession();
        });
    }

    logEvent(eventType, data) {
        const event = {
            type: eventType,
            data: data,
            sessionId: this.getSessionId()
        };
        
        // Store in sessionStorage for this session
        const events = JSON.parse(sessionStorage.getItem('portfolio-events') || '[]');
        events.push(event);
        sessionStorage.setItem('portfolio-events', JSON.stringify(events));
    }

    saveSession() {
        const sessionSummary = {
            ...this.sessionData,
            endTime: Date.now(),
            duration: Date.now() - this.sessionData.startTime,
            sectionsViewed: Array.from(this.sessionData.sectionsViewed),
            projectsViewed: Array.from(this.sessionData.projectsViewed)
        };

        localStorage.setItem('portfolio-session', JSON.stringify(sessionSummary));
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('portfolio-session-id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('portfolio-session-id', sessionId);
        }
        return sessionId;
    }

    getAnalytics() {
        return {
            session: this.sessionData,
            events: JSON.parse(sessionStorage.getItem('portfolio-events') || '[]'),
            previousSessions: JSON.parse(localStorage.getItem('portfolio-session') || '{}')
        };
    }
}

// Enhanced 3D Card Effects
class Card3DEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectCards();
        this.setupSkillCards();
    }

    setupProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => this.addCardEffect(card));
    }

    setupSkillCards() {
        const cards = document.querySelectorAll('.skill-category');
        cards.forEach(card => this.addCardEffect(card, 0.5));
    }

    addCardEffect(card, intensity = 1) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10 * intensity;
            const rotateY = (x - centerX) / centerX * 10 * intensity;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Add glow effect
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(99, 102, 241, 0.1), transparent 50%), var(--surface)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.background = '';
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            interactionLatency: [],
            memoryUsage: 0
        };
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.measureRenderTime();
        this.monitorInteractionLatency();
        this.monitorMemoryUsage();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.metrics.loadTime = perfData.loadEventEnd - perfData.fetchStart;
            console.log(`Portfolio loaded in ${this.metrics.loadTime}ms`);
        });
    }

    measureRenderTime() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'paint') {
                    this.metrics.renderTime = entry.startTime;
                }
            }
        });
        observer.observe({ entryTypes: ['paint'] });
    }

    monitorInteractionLatency() {
        document.addEventListener('click', (e) => {
            const startTime = performance.now();
            
            requestAnimationFrame(() => {
                const endTime = performance.now();
                const latency = endTime - startTime;
                this.metrics.interactionLatency.push(latency);
                
                // Keep only last 10 measurements
                if (this.metrics.interactionLatency.length > 10) {
                    this.metrics.interactionLatency.shift();
                }
            });
        });
    }

    monitorMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize;
            }, 5000);
        }
    }

    getMetrics() {
        return {
            ...this.metrics,
            averageInteractionLatency: this.metrics.interactionLatency.reduce((a, b) => a + b, 0) / this.metrics.interactionLatency.length || 0
        };
    }
}

// Advanced Accessibility Features
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addScreenReaderSupport();
        this.addFocusManagement();
        this.addHighContrastMode();
        this.addReducedMotionSupport();
    }

    addKeyboardNavigation() {
        let currentFocus = -1;
        const focusableElements = this.getFocusableElements();

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Custom tab navigation
                e.preventDefault();
                
                if (e.shiftKey) {
                    currentFocus = currentFocus <= 0 ? focusableElements.length - 1 : currentFocus - 1;
                } else {
                    currentFocus = currentFocus >= focusableElements.length - 1 ? 0 : currentFocus + 1;
                }
                
                if (focusableElements[currentFocus]) {
                    focusableElements[currentFocus].focus();
                    this.addFocusIndicator(focusableElements[currentFocus]);
                }
            }
        });
    }

    getFocusableElements() {
        return Array.from(document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.disabled && !el.hidden);
    }

    addFocusIndicator(element) {
        // Remove existing indicators
        document.querySelectorAll('.focus-indicator').forEach(el => el.remove());
        
        const indicator = document.createElement('div');
        indicator.className = 'focus-indicator';
        indicator.style.cssText = `
            position: absolute;
            pointer-events: none;
            border: 3px solid var(--primary-color);
            border-radius: 8px;
            z-index: 10000;
            animation: focus-pulse 0.3s ease;
        `;
        
        const rect = element.getBoundingClientRect();
        indicator.style.left = (rect.left - 3) + 'px';
        indicator.style.top = (rect.top - 3) + 'px';
        indicator.style.width = (rect.width + 6) + 'px';
        indicator.style.height = (rect.height + 6) + 'px';
        
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 2000);
    }

    addScreenReaderSupport() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Project ${index + 1}`);
        });

        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.setAttribute('role', 'listitem');
            const skillName = item.querySelector('span').textContent;
            item.setAttribute('aria-label', `Skill: ${skillName}`);
        });

        // Add live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(liveRegion);
        
        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
        };
    }

    addFocusManagement() {
        // Focus trap for modal-like elements
        const chatbot = document.getElementById('chatbot');
        
        chatbot.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                chatbot.classList.remove('open');
                document.querySelector('.chatbot-toggle').focus();
            }
        });
    }

    addHighContrastMode() {
        // Create modern accessibility panel container
        const accessibilityPanel = document.createElement('div');
        accessibilityPanel.className = 'accessibility-panel';
        accessibilityPanel.innerHTML = `
            <div class="accessibility-toggle" title="Accessibility Options">
                <i class="fas fa-universal-access"></i>
            </div>
            <div class="accessibility-controls">
                <button class="contrast-toggle" data-active="false">
                    <div class="toggle-icon">
                        <i class="fas fa-adjust"></i>
                    </div>
                    <span class="toggle-label">High Contrast</span>
                    <div class="toggle-switch">
                        <div class="toggle-slider"></div>
                    </div>
                </button>
                <button class="motion-toggle" data-active="false">
                    <div class="toggle-icon">
                        <i class="fas fa-running"></i>
                    </div>
                    <span class="toggle-label">Animations</span>
                    <div class="toggle-switch">
                        <div class="toggle-slider"></div>
                    </div>
                </button>
            </div>
        `;

        // Add CSS styles
        const styles = document.createElement('style');
        styles.textContent = `
            .accessibility-panel {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 1003;
                font-family: 'Orbitron', sans-serif;
            }

            .accessibility-toggle {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                transition: all 0.3s var(--smooth);
                position: relative;
                overflow: hidden;
            }

            .accessibility-toggle::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                animation: accessibility-shimmer 3s ease-in-out infinite;
            }

            @keyframes accessibility-shimmer {
                0%, 100% { transform: translateX(-100%) rotate(45deg); }
                50% { transform: translateX(100%) rotate(45deg); }
            }

            .accessibility-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
            }

            .accessibility-toggle i {
                color: white;
                font-size: 1.2rem;
                z-index: 1;
            }

            .accessibility-controls {
                position: absolute;
                top: 60px;
                right: 0;
                background: var(--surface);
                border: 2px solid var(--border-color);
                border-radius: 12px;
                padding: 1rem;
                min-width: 200px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s var(--smooth);
                backdrop-filter: blur(20px);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            }

            /* Responsive positioning */
            @media (max-width: 768px) {
                .accessibility-panel {
                    top: 70px;
                    right: 10px;
                }
                
                .accessibility-controls {
                    min-width: 180px;
                    right: -10px;
                }
            }

            @media (max-width: 480px) {
                .accessibility-panel {
                    top: 65px;
                    right: 5px;
                }
                
                .accessibility-toggle {
                    width: 45px;
                    height: 45px;
                }
                
                .accessibility-controls {
                    min-width: 160px;
                    right: -20px;
                }
            }

            .accessibility-panel:hover .accessibility-controls {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .contrast-toggle,
            .motion-toggle {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                background: transparent;
                border: none;
                padding: 0.75rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s var(--smooth);
                margin-bottom: 0.5rem;
            }

            .contrast-toggle:hover,
            .motion-toggle:hover {
                background: var(--primary-color);
                transform: translateX(5px);
            }

            .toggle-icon {
                width: 30px;
                height: 30px;
                background: var(--gradient-1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .toggle-icon i {
                color: white;
                font-size: 0.9rem;
            }

            .toggle-label {
                flex: 1;
                text-align: left;
                font-weight: 600;
                color: var(--text-primary);
                font-size: 0.9rem;
            }

            .toggle-switch {
                width: 40px;
                height: 20px;
                background: var(--border-color);
                border-radius: 10px;
                position: relative;
                transition: all 0.3s var(--smooth);
                flex-shrink: 0;
            }

            .toggle-slider {
                width: 16px;
                height: 16px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 2px;
                left: 2px;
                transition: all 0.3s var(--smooth);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            }

            .contrast-toggle[data-active="true"] .toggle-switch,
            .motion-toggle[data-active="true"] .toggle-switch {
                background: var(--accent-color);
            }

            .contrast-toggle[data-active="true"] .toggle-slider,
            .motion-toggle[data-active="true"] .toggle-slider {
                transform: translateX(20px);
                background: white;
            }

            /* Neon theme effects */
            [data-theme="neon"] .accessibility-toggle {
                box-shadow: 0 0 20px var(--primary-color);
            }

            [data-theme="neon"] .accessibility-controls {
                border-color: var(--primary-color);
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            }

            [data-theme="neon"] .toggle-switch {
                box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.3);
            }

            /* High contrast mode styles */
            .high-contrast .accessibility-panel {
                filter: none !important;
            }

            .high-contrast .accessibility-toggle {
                background: #000000 !important;
                border: 3px solid #ffffff !important;
            }

            .high-contrast .accessibility-controls {
                background: #000000 !important;
                border: 3px solid #ffffff !important;
                color: #ffffff !important;
            }

            .high-contrast .toggle-label {
                color: #ffffff !important;
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(accessibilityPanel);

        // Add event listeners
        const contrastToggle = accessibilityPanel.querySelector('.contrast-toggle');
        const motionToggle = accessibilityPanel.querySelector('.motion-toggle');

        contrastToggle.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            contrastToggle.setAttribute('data-active', isHighContrast);
            localStorage.setItem('high-contrast', isHighContrast);
        });

        motionToggle.addEventListener('click', () => {
            document.body.classList.toggle('reduced-motion');
            const isReduced = document.body.classList.contains('reduced-motion');
            motionToggle.setAttribute('data-active', isReduced);
            motionToggle.querySelector('.toggle-label').textContent = isReduced ? 'Motion Off' : 'Animations';
            motionToggle.querySelector('i').className = isReduced ? 'fas fa-pause' : 'fas fa-running';
            localStorage.setItem('reduced-motion', isReduced);
        });

        // Load saved preferences
        if (localStorage.getItem('high-contrast') === 'true') {
            document.body.classList.add('high-contrast');
            contrastToggle.setAttribute('data-active', 'true');
        }

        if (localStorage.getItem('reduced-motion') === 'true') {
            document.body.classList.add('reduced-motion');
            motionToggle.setAttribute('data-active', 'true');
            motionToggle.querySelector('.toggle-label').textContent = 'Motion Off';
            motionToggle.querySelector('i').className = 'fas fa-pause';
        }
    }

    addReducedMotionSupport() {
        // This is now handled by the accessibility panel above
        // Add CSS for reduced motion
        const motionStyles = document.createElement('style');
        motionStyles.textContent = `
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }

            .reduced-motion .floating-particles,
            .reduced-motion .neural-network,
            .reduced-motion .stars {
                display: none !important;
            }

            .reduced-motion .skill-particles {
                display: none !important;
            }

            .reduced-motion .loading-screen {
                display: none !important;
            }
        `;
        document.head.appendChild(motionStyles);
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the main app to initialize
    setTimeout(() => {
        new ThemeManager();
        new PortfolioAnalytics();
        new Card3DEffects();
        new PerformanceMonitor();
        new AccessibilityEnhancer();
        
        console.log('Enhanced portfolio features loaded!');
    }, 1000);
});

// Add CSS for enhanced features
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes focus-pulse {
        0% { opacity: 0; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .high-contrast {
        filter: contrast(150%) brightness(120%);
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .focus-indicator {
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
    }
`;
document.head.appendChild(enhancedStyles);
