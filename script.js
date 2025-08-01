// Portfolio JavaScript - Advanced Interactions and Animations

// Global Variables
let isLoading = true;
let currentTheme = 'light';
let typingInterval;
let chatbotOpen = false;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const chatbotContainer = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// App Initialization
function initializeApp() {
    // Show loading screen for 3 seconds
    setTimeout(() => {
        hideLoadingScreen();
        initializeFirstVisitPopup(); // Add this first
        initializeAnimations();
        initializeTheme();
        initializeNavigation();
        initializeTypingEffect();
        initializeScrollAnimations();
        initializeChatbot();
        initializeContactForm();
        initializeSkillAnimations();
        initializeParticleEffects();
        initializeAudioEffects();
    }, 3000);
}

// Loading Screen
function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        isLoading = false;
        document.body.style.overflow = 'auto';
    }, 1000);
}

// First Visit Popup
function initializeFirstVisitPopup() {
    console.log('=== POPUP INITIALIZATION STARTED ===');
    const firstVisitKey = 'portfolio-first-visit';
    const hasVisited = localStorage.getItem(firstVisitKey);
    
    console.log('Popup check - hasVisited:', hasVisited);
    console.log('localStorage value:', localStorage.getItem(firstVisitKey));
    
    // Force reset for testing - remove this later
    localStorage.removeItem(firstVisitKey);
    console.log('Forced reset localStorage for testing');
    
    // Only show popup if this is the first visit
    if (!localStorage.getItem(firstVisitKey)) {
        const popup = document.getElementById('firstVisitPopup');
        const closeBtn = document.getElementById('popupClose');
        
        console.log('Popup element found:', !!popup);
        console.log('Close button found:', !!closeBtn);
        console.log('Popup element:', popup);
        
        if (popup) {
            console.log('Setting up popup...');
            // Show popup immediately for testing
            popup.style.display = 'block';
            popup.style.opacity = '1';
            popup.style.pointerEvents = 'all';
            popup.style.transform = 'translateX(-50%) translateY(0)';
            
            // Show popup after a short delay
            setTimeout(() => {
                console.log('Showing popup now');
                popup.classList.add('show');
                popup.classList.add('show');
            }, 500);
            
            // Auto-hide popup after 6 seconds for testing
            const autoHideTimer = setTimeout(() => {
                console.log('Auto-hiding popup after 6 seconds');
                hideFirstVisitPopup();
            }, 6500);
            
            // Close button functionality
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    clearTimeout(autoHideTimer);
                    hideFirstVisitPopup();
                });
            }
            
            // Click outside to close
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    clearTimeout(autoHideTimer);
                    hideFirstVisitPopup();
                }
            });
        }
    }
}

function hideFirstVisitPopup() {
    const popup = document.getElementById('firstVisitPopup');
    if (popup && popup.classList.contains('show')) {
        popup.classList.remove('show');
        popup.classList.add('hide');
        
        // Mark as visited only when popup is actually hidden
        const firstVisitKey = 'portfolio-first-visit';
        localStorage.setItem(firstVisitKey, 'true');
        
        setTimeout(() => {
            if (popup) {
                popup.style.display = 'none';
            }
        }, 300);
    }
}

// Debug function to reset first visit (for testing)
function resetFirstVisit() {
    localStorage.removeItem('portfolio-first-visit');
    console.log('First visit status reset - popup will show on next page load');
}

// Make it available globally for testing
window.resetFirstVisit = resetFirstVisit;

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle animation
    if (theme === 'dark') {
        themeToggle.style.background = 'var(--primary-color)';
    } else {
        themeToggle.style.background = 'var(--surface)';
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Add animation effect
    document.body.style.transition = 'all 0.3s ease';
    
    // Create ripple effect
    createRippleEffect(themeToggle);
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
                updateActiveNavLink(link);
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateNavOnScroll);
    
    // Hide/show nav on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navContainer = document.querySelector('.nav-container');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navContainer.style.transform = 'translateY(-100%)';
        } else {
            navContainer.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function smoothScrollTo(element) {
    const headerOffset = 80;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = [
        'Aspiring AI/ML Engineer',
        'Python Developer',
        'Problem Solver',
        'AI Enthusiast',
        'Machine Learning Expert',
        'Data Scientist',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
}

// Scroll Animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item, .certification-card, .experience-block, .timeline-item-chart');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
                
                // Animate skill levels
                if (entry.target.classList.contains('skill-category')) {
                    animateSkills(entry.target);
                }
                
                // Animate stat counters
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                // Animate certification cards
                if (entry.target.classList.contains('certification-card')) {
                    animateCertificationCard(entry.target);
                }
                
                // Animate professional experience blocks
                if (entry.target.classList.contains('experience-block')) {
                    animateExperienceBlock(entry.target);
                }
                
                // Animate timeline chart items
                if (entry.target.classList.contains('timeline-item-chart')) {
                    animateTimelineChart(entry.target);
                }
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Skill Animations
function initializeSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        // Create floating particles for each skill item
        createSkillParticles(item);
        
        // Add hover effect for stars
        item.addEventListener('mouseenter', () => {
            animateSkillStars(item);
        });
    });
}

function createSkillParticles(skillItem) {
    const particlesContainer = skillItem.querySelector('.skill-particles');
    if (!particlesContainer) return;
    
    // Create 6 floating particles
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'skill-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

function animateSkillStars(skillItem) {
    const stars = skillItem.querySelectorAll('.skill-star.active');
    
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.3) rotate(180deg)';
            setTimeout(() => {
                star.style.transform = '';
            }, 300);
        }, index * 100);
    });
}

function animateSkills(skillCategory) {
    const skillItems = skillCategory.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
            
            // Animate stars sequentially
            const stars = item.querySelectorAll('.skill-star.active');
            stars.forEach((star, starIndex) => {
                setTimeout(() => {
                    star.style.opacity = '0';
                    star.style.transform = 'scale(0) rotate(180deg)';
                    
                    setTimeout(() => {
                        star.style.opacity = '1';
                        star.style.transform = 'scale(1) rotate(0deg)';
                    }, 50);
                }, starIndex * 100);
            });
        }, index * 200);
    });
}

// Counter Animation
function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Certification Card Animation
function animateCertificationCard(card) {
    const icon = card.querySelector('.cert-icon');
    const badge = card.querySelector('.cert-badge');
    
    // Animate icon with a delayed pulse
    setTimeout(() => {
        icon.style.animation = 'pulse-cert 1s ease-in-out';
    }, 200);
    
    // Animate badge with a glow effect
    setTimeout(() => {
        badge.style.animation = 'certification-glow 0.8s ease-in-out';
    }, 400);
}

// Professional Experience Block Animation
function animateExperienceBlock(block) {
    const card = block.querySelector('.experience-card-pro');
    const logo = block.querySelector('.company-logo-pro');
    const contributions = block.querySelectorAll('.contributions-list li');
    const techTags = block.querySelectorAll('.tech-tag-pro');
    
    if (card) {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, 100);
    }
    
    if (logo) {
        setTimeout(() => {
            logo.style.animation = 'logo-glow 1.5s ease-in-out';
        }, 300);
    }
    
    contributions.forEach((contribution, index) => {
        setTimeout(() => {
            contribution.style.transform = 'translateX(20px)';
            contribution.style.opacity = '0';
            setTimeout(() => {
                contribution.style.transition = 'all 0.4s ease';
                contribution.style.transform = 'translateX(0)';
                contribution.style.opacity = '1';
            }, 50);
        }, 500 + (index * 150));
    });
    
    techTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = `tag-slide-in 0.5s ease-out ${index * 0.1}s both`;
        }, 800);
    });
}

// Timeline Chart Animation
function animateTimelineChart(item) {
    const dot = item.querySelector('.timeline-dot');
    const content = item.querySelector('.timeline-content-chart');
    
    if (dot) {
        dot.style.transform = 'scale(0)';
        setTimeout(() => {
            dot.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            dot.style.transform = 'scale(1)';
        }, 200);
    }
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => {
            content.style.transition = 'all 0.4s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 400);
    }
}

// Add professional animation keyframes
const professionalAnimationStyles = `
@keyframes logo-glow {
    0%, 100% { 
        transform: scale(1);
        filter: brightness(1);
    }
    50% { 
        transform: scale(1.05);
        filter: brightness(1.2);
    }
}

@keyframes tag-slide-in {
    0% { 
        transform: translateY(20px) scale(0.8);
        opacity: 0;
    }
    60% { 
        transform: translateY(-2px) scale(1.05);
    }
    100% { 
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

@keyframes contribution-highlight {
    0% { border-color: var(--border-color); }
    50% { border-color: var(--primary-color); }
    100% { border-color: var(--border-color); }
}
`;

// Inject professional animation styles
const professionalStyleSheet = document.createElement('style');
professionalStyleSheet.textContent = professionalAnimationStyles;
document.head.appendChild(professionalStyleSheet);

// Particle Effects
function initializeParticleEffects() {
    // Add particle effects to buttons
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createParticleExplosion(e.target, e.clientX, e.clientY);
        });
        
        button.addEventListener('mouseenter', () => {
            createFloatingParticles(button);
        });
    });
}

function createParticleExplosion(element, x, y) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 15;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1000 + 500;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0, 0, 0.2, 1)'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

function createFloatingParticles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + rect.height + 'px';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'var(--primary-color)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            particle.animate([
                {
                    transform: 'translateY(0) scale(1)',
                    opacity: 1
                },
                {
                    transform: 'translateY(-100px) scale(0)',
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                particle.remove();
            });
        }, i * 200);
    }
}

// Ripple Effect
function createRippleEffect(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(99, 102, 241, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    ripple.animate([
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(2)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).addEventListener('finish', () => {
        ripple.remove();
    });
}

// Audio Effects
function initializeAudioEffects() {
    // Create Web Audio Context for sound effects
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
        return;
    }
    
    function playTone(frequency, duration, volume = 0.1) {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Add hover sounds to interactive elements
    document.querySelectorAll('.nav-link, .social-link, .project-card, .skill-item').forEach(element => {
        element.addEventListener('mouseenter', () => {
            playTone(800, 0.1, 0.05);
        });
    });
    
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', () => {
            playTone(1000, 0.2, 0.1);
        });
    });
}

// Chatbot Functionality - Advanced AI Assistant
function initializeChatbot() {
    if (chatbotToggle) chatbotToggle.addEventListener('click', toggleChatbot);
    if (chatbotClose) chatbotClose.addEventListener('click', toggleChatbot);
    if (chatbotSend) chatbotSend.addEventListener('click', sendMessage);
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Comprehensive knowledge base about Zabiha Muskan
    window.zabihaBio = {
        personal: {
            name: "Zabiha Muskan K",
            profession: "AI/ML Engineer & Final-year CSE Student",
            location: "India",
            passion: "Artificial Intelligence, Machine Learning, and problem-solving",
            goal: "Building intelligent AI systems, AI agents, and mastering ML & DSA for real-world tech challenges",
            description: "Final-year CSE student with a passion for Artificial Intelligence and problem-solving. Focused on building intelligent AI systems, AI agents, and practicing ML & DSA to prepare for real-world tech challenges."
        },
        
        experience: [
            {
                role: "AI Intern",
                company: "SIIT Technologies",
                duration: "July 2025 - August 2025",
                type: "ai",
                achievements: [
                    "Built 5+ AI-powered applications using cutting-edge APIs and modern development frameworks",
                    "Mastered advanced prompt engineering techniques for optimal AI model performance",
                    "Designed and implemented intelligent AI agents for automated decision-making systems"
                ],
                technologies: ["AI Development", "API Integration", "Prompt Engineering", "Agent Design"]
            },
            {
                role: "ML & Data Science Intern",
                company: "Zaalima Development",
                duration: "June 2025 - August 2025",
                type: "ml",
                achievements: [
                    "Mastered advanced data manipulation techniques using Pandas and NumPy for large-scale datasets",
                    "Created comprehensive visualizations using Matplotlib and Seaborn for actionable insights",
                    "Developed and deployed a fraud detection model achieving 95% accuracy"
                ],
                technologies: ["Machine Learning", "Data Science", "Python", "Model Deployment"]
            },
            {
                role: "Web Developer Intern",
                company: "Oasis InfoByte",
                duration: "May 2024 - June 2024",
                type: "web",
                achievements: [
                    "Built fully responsive web applications optimized for all device types",
                    "Crafted intuitive user interfaces with focus on user experience and accessibility",
                    "Developed interactive web tools including portfolio websites and utility applications"
                ],
                technologies: ["Frontend Development", "Responsive Design", "UI/UX Design"]
            },
            {
                role: "Content Writer Intern",
                company: "InAmigos Foundation",
                duration: "October 2024 - November 2024",
                type: "content",
                achievements: [
                    "Created 50+ compelling articles on environmental awareness and sustainability",
                    "Boosted social media engagement through strategic content planning and execution",
                    "Promoted sustainability campaigns that reached diverse audiences"
                ],
                technologies: ["Content Writing", "Social Media", "Campaign Strategy"]
            }
        ],
        
        projects: [
            {
                name: "Fraud Detection in Financial Transactions",
                description: "ML-based web app to detect fraudulent transactions based on transaction type, amount, and balance",
                technologies: ["Python", "Jupyter Notebook", "Streamlit"],
                github: "https://github.com/Zabiha11/Fraud-Detection-in-Financial-Transactions.git",
                demo: "https://fraud-detection-in-financial-transactions-zabi.streamlit.app/",
                type: "machine_learning",
                highlights: ["95% accuracy in fraud detection", "Real-time transaction analysis", "Interactive Streamlit interface"]
            },
            {
                name: "Finance Tracker",
                description: "CLI-based Python tool to track income/expenses and visualize spending trends via CSV",
                technologies: ["Python", "Pandas", "Matplotlib"],
                github: "https://github.com/Zabiha11/Finance_Tracker.git",
                type: "data_analysis",
                highlights: ["CSV-based data management", "Visual spending trend analysis", "Command-line interface"]
            },
            {
                name: "Gemini Chatbot",
                description: "Real-time AI chatbot using Google's Gemini API with Streamlit frontend",
                technologies: ["Python", "Streamlit", "Gemini API"],
                github: "https://github.com/Zabiha11/Gemini-Chatbot.git",
                demo: "https://gemini-chatbot-zabi.streamlit.app/",
                type: "ai_application",
                highlights: ["Google Gemini API integration", "Real-time conversations", "Streamlit web interface"]
            },
            {
                name: "JARVIS - AI Assistant",
                description: "Advanced desktop AI assistant with voice response, automation, and command execution",
                technologies: ["Python 3.13.3", "Voice Recognition", "Automation"],
                github: "https://github.com/Zabiha11/Jarvis.git",
                type: "ai_assistant",
                highlights: ["Voice command recognition", "Desktop automation", "Advanced AI capabilities"]
            }
        ],
        
        skills: {
            languages: {
                expert: ["Python", "HTML5"],
                advanced: ["Java", "JavaScript", "CSS3"],
                intermediate: ["SQL"]
            },
            ai_ml: {
                expert: ["Scikit-learn", "Pandas", "NumPy", "Streamlit", "Google Colab", "Jupyter"],
                advanced: ["XGBoost", "Matplotlib", "AI Agents"]
            },
            tools_deployment: {
                expert: ["Streamlit", "Google Colab", "Jupyter"],
                advanced: ["Git", "GitHub"],
                intermediate: ["MongoDB"]
            },
            frontend_backend: {
                advanced: ["React.js", "Tailwind CSS"],
                intermediate: ["Node.js", "MySQL", "MongoDB", "Authentication"]
            }
        },
        
        certifications: [
            {
                title: "Fundamentals of Machine Learning and AI",
                issuer: "Amazon Web Services (AWS)",
                description: "Credential earned for understanding core ML and AI concepts using AWS tools and services"
            },
            {
                title: "Generative AI for Educators",
                issuer: "Google for Education",
                description: "Completed foundational training on generative AI tools and techniques for education and productivity"
            },
            {
                title: "A Quick Introduction to Machine Learning",
                issuer: "IBM Cognitive Class",
                description: "Certificate for learning the basics of ML models, supervised vs unsupervised learning, and model evaluation"
            },
            {
                title: "Python (Basic) Certification",
                issuer: "HackerRank",
                description: "Verified Python proficiency through coding assessments focused on logic, syntax, and programming fundamentals"
            },
            {
                title: "Introduction to Artificial Intelligence",
                issuer: "Infosys Springboard",
                description: "Completed training on AI foundations, including intelligent systems, real-world applications, and ethical aspects"
            }
        ],
        
        stats: {
            projects: 10,
            technologies: 15,
            problems_solved: 50,
            coding_hours_daily: 4
        },
        
        contact: {
            github: "https://github.com/Zabiha11",
            linkedin: "https://www.linkedin.com/in/zabiha-muskan",
            email: "zabiha@example.com"
        }
    };
}

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    if (chatbotContainer) {
        chatbotContainer.classList.toggle('open');
        
        if (chatbotOpen) {
            if (chatbotInput) chatbotInput.focus();
            if (chatbotToggle) createRippleEffect(chatbotToggle);
            
            // Send welcome message if no messages exist
            if (chatbotMessages && chatbotMessages.children.length <= 1) {
                setTimeout(() => {
                    addMessage("👋 Hi! I'm Zabiha's AI assistant. I can answer any questions about her projects, skills, experience, or background. What would you like to know?", 'bot');
                }, 500);
            }
        }
    }
}

function sendMessage() {
    const message = chatbotInput?.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    if (chatbotInput) chatbotInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate response after a delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateIntelligentResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function addMessage(message, sender) {
    if (!chatbotMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${message}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

function showTypingIndicator() {
    if (!chatbotMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    typingDiv.id = 'typing-indicator';
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function generateIntelligentResponse(message) {
    const lowerMessage = message.toLowerCase();
    const bio = window.zabihaBio;
    
    // Greeting responses
    if (lowerMessage.match(/\b(hello|hi|hey|greetings|good\s+(morning|afternoon|evening)|start|begin)\b/)) {
        const greetings = [
            "Hello! I'm here to help you learn about Zabiha Muskan K, an AI/ML engineer. What would you like to know?",
            "Hi there! I can tell you about Zabiha's projects, skills, experience, or anything else you'd like to know about her work.",
            "Welcome! I'm Zabiha's AI assistant. Feel free to ask about her AI/ML projects, internships, skills, or career journey.",
            "Hey! I'm Zabiha's portfolio assistant. I can explain her projects, experience, skills, or answer any questions about her background!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Who are you / chatbot identity
    if (lowerMessage.match(/\b(who are you|what are you|introduce yourself|your name|about you)\b/)) {
        return "I'm Zabiha's AI-powered portfolio assistant! 🤖 I'm here to help you explore her work, projects, skills, and professional journey. I can answer detailed questions about her AI/ML expertise, internship experiences, technical skills, and much more. Think of me as your personal guide to understanding Zabiha's capabilities and achievements. What would you like to discover?";
    }
    
    // Website/portfolio explanation
    if (lowerMessage.match(/\b(website|portfolio|this site|explain.*website|about.*website|tell me about.*site)\b/)) {
        return "This is Zabiha Muskan K's professional portfolio website! 🌟 It showcases her journey as an AI/ML engineer with:\n\n" +
               "🤖 **AI/ML Projects** - From fraud detection systems to AI assistants\n" +
               "💼 **Professional Experience** - 4 diverse internships across tech domains\n" +
               "🛠️ **Technical Skills** - Expert in Python, ML, AI, and web technologies\n" +
               "🏆 **Certifications** - AWS, Google, IBM, and HackerRank credentials\n" +
               "✨ **Interactive Features** - 3D experience orbs, AI chatbot (that's me!), and modern design\n\n" +
               "The website demonstrates her full-stack capabilities and passion for cutting-edge technology!";
    }
    
    // Simple project explanations
    if (lowerMessage.match(/\b(explain.*project|tell.*project|what.*project|describe.*project|show.*project)\b/) || 
        lowerMessage.match(/\b(her projects|the projects|projects she)\b/)) {
        return "Zabiha has built some incredible projects! Here are her standout creations:\n\n" +
               "🔍 **Fraud Detection System** - ML-powered web app with 95% accuracy for detecting fraudulent financial transactions\n" +
               "💰 **Finance Tracker** - Python CLI tool for expense tracking with data visualization\n" +
               "🤖 **Gemini Chatbot** - Real-time AI chatbot using Google's Gemini API\n" +
               "🎯 **JARVIS AI Assistant** - Advanced desktop AI with voice recognition and automation\n\n" +
               "Each project showcases different aspects of her expertise - from machine learning and data science to AI integration and web development. Would you like detailed information about any specific project?";
    }
    
    // Personal information and background
    if (lowerMessage.match(/\b(who|about|background|introduction|tell me about)\b.*\b(zabiha|her)\b/) || 
        lowerMessage.match(/\b(who is|about) zabiha\b/) ||
        lowerMessage.match(/\b(explain.*zabiha|describe.*zabiha|zabiha.*person)\b/)) {
        return `**Zabiha Muskan K** is a passionate ${bio.personal.profession} 🚀\n\n` +
               `${bio.personal.description}\n\n` +
               `💡 **Her Mission**: ${bio.personal.goal}\n` +
               `🎯 **Passion**: ${bio.personal.passion}\n` +
               `📍 **Location**: ${bio.personal.location}\n\n` +
               `She's currently mastering the intersection of AI, machine learning, and real-world problem solving!`;
    }
    
    // What can you tell me / general information
    if (lowerMessage.match(/\b(what can you tell|tell me everything|give me info|information about|details about)\b/) ||
        lowerMessage.match(/\b(summary|overview|brief|rundown)\b/)) {
        return "I can tell you SO much about Zabiha! 🌟 Here's what I know:\n\n" +
               "👨‍💻 **Professional Identity**: AI/ML Engineer & Final-year CSE student\n" +
               "🏢 **Experience**: 4 internships across AI, ML, web dev, and content creation\n" +
               "🚀 **Projects**: 10+ including fraud detection, AI assistants, and web apps\n" +
               "💪 **Skills**: Expert in Python, ML libraries, AI development, and more\n" +
               "🏆 **Certifications**: AWS, Google, IBM, HackerRank credentials\n" +
               "🎯 **Goals**: Building intelligent AI systems and mastering cutting-edge tech\n\n" +
               "Want to dive deeper into any of these areas? Just ask!";
    }
    
    // Explain this / what is this
    if (lowerMessage.match(/\b(explain this|what is this|what am I looking at|describe this)\b/)) {
        return "You're exploring Zabiha's interactive AI/ML portfolio! 🎨✨\n\n" +
               "This isn't just a regular portfolio - it's a showcase of cutting-edge web technology featuring:\n" +
               "🌌 **3D Holographic Experience Section** - Interactive orbs representing her internships\n" +
               "🤖 **AI Chatbot** - That's me! Powered by intelligent response systems\n" +
               "🎭 **Multiple Themes** - Pink, dark, neon, and more visual experiences\n" +
               "⚡ **Modern Tech Stack** - HTML5, CSS3, JavaScript with advanced animations\n" +
               "📱 **Responsive Design** - Optimized for all devices\n\n" +
               "It demonstrates her full-stack development skills while showcasing her AI/ML expertise!";
    }
    
    // Skills and abilities
    if (lowerMessage.match(/\b(what.*she.*do|what.*zabiha.*do|her abilities|capabilities|what.*good at)\b/) ||
        lowerMessage.match(/\b(expertise|specialization|domain|field)\b/)) {
        return "Zabiha is incredibly versatile! Here's what she excels at:\n\n" +
               "🤖 **AI Development**: Building intelligent systems, AI agents, and automation tools\n" +
               "📊 **Machine Learning**: Creating models with 95% accuracy, data analysis, and predictive systems\n" +
               "🐍 **Python Mastery**: Expert-level programming for AI/ML applications\n" +
               "🌐 **Web Development**: Full-stack development with modern frameworks\n" +
               "☁️ **Deployment**: Streamlit, cloud platforms, and production-ready applications\n" +
               "🔧 **Tools**: Git, GitHub, Jupyter, Google Colab, and development workflows\n" +
               "✍️ **Communication**: Technical writing and content creation\n\n" +
               "She's essentially a one-person tech powerhouse! 💪";
    }
    
    // Experience and internships with more patterns
    if (lowerMessage.match(/\b(experience|internship|work|job|career|employment|worked|intern)\b/) ||
        lowerMessage.match(/\b(where.*worked|companies|employers|professional)\b/)) {
        const experiences = bio.experience.map(exp => 
            `• **${exp.role}** at ${exp.company} (${exp.duration})`
        ).join('\n');
        return `Zabiha has gained incredible experience through 4 diverse internships! 🚀\n\n${experiences}\n\n` +
               "Each role taught her different aspects of technology - from AI development to web creation. " +
               "Want to know more about any specific internship? Just ask!";
    }
    
    // Technical questions with expanded patterns
    if (lowerMessage.match(/\b(technical|programming|coding|development|tech stack|technologies)\b/) ||
        lowerMessage.match(/\b(tools|frameworks|libraries|languages|software)\b/)) {
        return "Zabiha's technical arsenal is impressive! 🛠️\n\n" +
               "**Programming Languages**: Python (Expert), Java, JavaScript, HTML5, CSS3, SQL\n" +
               "**AI/ML Stack**: Scikit-learn, XGBoost, Pandas, NumPy, Matplotlib\n" +
               "**Development Tools**: Streamlit, Git, GitHub, Jupyter, Google Colab\n" +
               "**Web Technologies**: React.js, Node.js, Tailwind CSS, MongoDB, MySQL\n" +
               "**Specializations**: AI Agents, Machine Learning Models, Web Applications\n\n" +
               "She's constantly learning and expanding her technical expertise!";
    }
    
    // Learning and education
    if (lowerMessage.match(/\b(education|study|student|learning|university|college|cse|computer science)\b/)) {
        return "Zabiha is a dedicated learner! 📚\n\n" +
               "🎓 **Current Status**: Final-year Computer Science Engineering (CSE) student\n" +
               "💡 **Learning Focus**: AI, Machine Learning, Data Structures & Algorithms\n" +
               "🏆 **Certifications**: AWS ML, Google AI, IBM ML, HackerRank Python\n" +
               "⏰ **Daily Practice**: 4+ hours of coding and skill development\n" +
               "🎯 **Academic Integration**: Combining theoretical knowledge with practical projects\n\n" +
               "She's preparing for real-world tech challenges through continuous learning!";
    }
    
    // Future and goals
    if (lowerMessage.match(/\b(future|goals|plans|aspirations|next|career.*goals|ambition)\b/)) {
        return `Zabiha's future is incredibly exciting! 🌟\n\n` +
               `🎯 **Primary Goal**: ${bio.personal.goal}\n\n` +
               `🚀 **Vision**: Creating intelligent AI systems that solve complex real-world problems\n` +
               `💼 **Career Path**: Becoming a leading AI/ML engineer in the tech industry\n` +
               `🔬 **Innovation Focus**: Pushing boundaries in artificial intelligence and automation\n` +
               `🌍 **Impact**: Building technology that makes a positive difference in people's lives\n\n` +
               `She's well-positioned for success with her strong foundation and continuous learning mindset!`;
    }
    
    // Achievements and accomplishments
    if (lowerMessage.match(/\b(achievement|accomplishment|success|award|recognition|proud)\b/)) {
        return "Zabiha has some amazing achievements! 🏆\n\n" +
               "**Project Highlights**:\n" +
               "• 95% accuracy fraud detection system\n" +
               "• Advanced JARVIS AI assistant with voice recognition\n" +
               "• Real-time Gemini chatbot integration\n\n" +
               "**Professional Milestones**:\n" +
               "• 4 successful internship completions\n" +
               "• 5+ AI applications built at SIIT Technologies\n" +
               "• 50+ technical articles written\n\n" +
               "**Technical Recognition**:\n" +
               "• Multiple industry certifications\n" +
               "• HackerRank Python certification\n" +
               "• 10+ completed projects in portfolio\n\n" +
               "She's building an impressive track record of technical excellence!";
    }
    
    // AI internship specific
    if (lowerMessage.match(/\b(ai|artificial intelligence)\b.*\b(internship|experience|work|siit)\b/) ||
        lowerMessage.match(/\bsiit\b/)) {
        const aiExp = bio.experience.find(exp => exp.type === 'ai');
        return `At SIIT Technologies (${aiExp.duration}), Zabiha worked as an AI Intern where she:\n\n` +
               aiExp.achievements.map(achievement => `• ${achievement}`).join('\n') +
               `\n\nTechnologies used: ${aiExp.technologies.join(', ')}`;
    }
    
    // ML/Data Science internship
    if (lowerMessage.match(/\b(ml|machine learning|data science)\b.*\b(internship|experience|work|zaalima)\b/) ||
        lowerMessage.match(/\bzaalima\b/)) {
        const mlExp = bio.experience.find(exp => exp.type === 'ml');
        return `At Zaalima Development (${mlExp.duration}), she worked as an ML & Data Science Intern:\n\n` +
               mlExp.achievements.map(achievement => `• ${achievement}`).join('\n') +
               `\n\nKey achievement: 95% accuracy fraud detection model!\nTechnologies: ${mlExp.technologies.join(', ')}`;
    }
    
    // Web development internship
    if (lowerMessage.match(/\b(web|frontend|development)\b.*\b(internship|experience|work|oasis)\b/) ||
        lowerMessage.match(/\boasis\b/)) {
        const webExp = bio.experience.find(exp => exp.type === 'web');
        return `At Oasis InfoByte (${webExp.duration}), she worked as a Web Developer Intern:\n\n` +
               webExp.achievements.map(achievement => `• ${achievement}`).join('\n') +
               `\n\nTechnologies: ${webExp.technologies.join(', ')}`;
    }
    
    // Projects with more natural language patterns
    if (lowerMessage.match(/\b(project|portfolio|work|built|created|developed|made|app|application)\b/) ||
        lowerMessage.match(/\b(show me|tell me about|explain|describe).*\b(project|work)\b/)) {
        const projectsList = bio.projects.map(project => 
            `• **${project.name}**: ${project.description}`
        ).join('\n\n');
        return `Zabiha has built some incredible projects! 🚀\n\n${projectsList}\n\n` +
               "Each project demonstrates different aspects of her expertise. Want detailed information about any specific project? " +
               "Try asking about 'fraud detection', 'JARVIS', 'Gemini chatbot', or 'finance tracker'!";
    }
    
    // Simple questions with natural responses
    if (lowerMessage.match(/\b(yes|yeah|ok|okay|sure|tell me more|continue|go on)\b/) && lowerMessage.length < 15) {
        return "Great! What would you like to know more about? 😊\n\n" +
               "I can dive deeper into:\n" +
               "🤖 Her AI/ML projects and technical achievements\n" +
               "💼 Specific internship experiences and learning\n" +
               "🛠️ Technical skills and programming expertise\n" +
               "🎯 Career goals and future aspirations\n" +
               "📞 How to connect with her for opportunities\n\n" +
               "Just ask me anything specific you're curious about!";
    }
    
    // No/negative responses
    if (lowerMessage.match(/\b(no|nope|nothing|stop|quit|exit|bye|goodbye)\b/) && lowerMessage.length < 15) {
        return "No problem at all! 👋 If you change your mind and want to learn more about Zabiha's amazing work in AI/ML, just let me know. I'm always here to help explore her projects, skills, and experience. Have a great day! 😊";
    }
    
    // Question about the chatbot itself
    if (lowerMessage.match(/\b(how.*work|how.*made|how.*built|chatbot.*work|ai.*work)\b/)) {
        return "Great question! I'm an intelligent chatbot built specifically for Zabiha's portfolio! 🤖\n\n" +
               "**How I work**:\n" +
               "• Advanced pattern matching to understand your questions\n" +
               "• Comprehensive knowledge base about Zabiha's work and background\n" +
               "• Natural language processing for conversational responses\n" +
               "• Real-time response generation with contextual understanding\n\n" +
               "**My Purpose**: Help visitors like you discover Zabiha's amazing work, skills, and achievements!\n\n" +
               "I'm constantly learning and can answer questions about her projects, experience, skills, and much more!";
    }
    
    // Recommendations and suggestions
    if (lowerMessage.match(/\b(recommend|suggest|should I|advice|opinion)\b/)) {
        return "I'd definitely recommend exploring Zabiha's work! Here's why: 🌟\n\n" +
               "**For Recruiters**: Her proven track record with 95% accuracy ML models and diverse internship experience\n\n" +
               "**For Collaborators**: Her unique blend of AI/ML expertise and practical web development skills\n\n" +
               "**For Students**: Her learning journey shows how to effectively combine academics with real-world projects\n\n" +
               "**For Tech Enthusiasts**: Her cutting-edge projects like JARVIS AI and fraud detection systems\n\n" +
               "**Start with**: Check out her fraud detection project - it's a perfect example of her ML expertise in action!\n\n" +
               "Want me to explain any specific aspect of her work?";
    }
    
    // Fraud detection project
    if (lowerMessage.match(/\b(fraud|detection|financial|transaction)\b/)) {
        const fraudProject = bio.projects.find(p => p.name.includes('Fraud Detection'));
        return `**${fraudProject.name}** is one of her standout projects! ${fraudProject.description}\n\n` +
               `🎯 Key highlights:\n${fraudProject.highlights.map(h => `• ${h}`).join('\n')}\n\n` +
               `🔗 Live Demo: ${fraudProject.demo}\n📱 Technologies: ${fraudProject.technologies.join(', ')}`;
    }
    
    // JARVIS project
    if (lowerMessage.match(/\b(jarvis|ai assistant|voice|automation)\b/)) {
        const jarvisProject = bio.projects.find(p => p.name.includes('JARVIS'));
        return `**${jarvisProject.name}** is her most advanced project! ${jarvisProject.description}\n\n` +
               `🚀 Features:\n${jarvisProject.highlights.map(h => `• ${h}`).join('\n')}\n\n` +
               `🔧 Built with: ${jarvisProject.technologies.join(', ')}\n💡 This showcases her expertise in AI system development!`;
    }
    
    // Gemini chatbot
    if (lowerMessage.match(/\b(gemini|chatbot|google)\b/)) {
        const geminiProject = bio.projects.find(p => p.name.includes('Gemini'));
        return `**${geminiProject.name}** demonstrates her API integration skills! ${geminiProject.description}\n\n` +
               `✨ Features:\n${geminiProject.highlights.map(h => `• ${h}`).join('\n')}\n\n` +
               `🔗 Try it: ${geminiProject.demo}\n🛠️ Tech stack: ${geminiProject.technologies.join(', ')}`;
    }
    
    // Skills
    if (lowerMessage.match(/\b(skill|technology|programming|language|expertise|know|proficient)\b/)) {
        const skills = bio.skills;
        return `Zabiha has expertise across multiple domains:\n\n` +
               `💻 **Programming Languages**: ${[...skills.languages.expert, ...skills.languages.advanced].join(', ')}\n\n` +
               `🤖 **AI/ML Technologies**: ${[...skills.ai_ml.expert, ...skills.ai_ml.advanced].join(', ')}\n\n` +
               `🚀 **Tools & Deployment**: ${[...skills.tools_deployment.expert, ...skills.tools_deployment.advanced].join(', ')}\n\n` +
               `🌐 **Frontend/Backend**: ${[...skills.frontend_backend.advanced, ...skills.frontend_backend.intermediate].join(', ')}`;
    }
    
    // Python specific
    if (lowerMessage.match(/\bpython\b/)) {
        return `Python is Zabiha's strongest programming language! She has **expert-level** proficiency and uses it extensively for:\n\n` +
               `• AI/ML development with Scikit-learn, Pandas, NumPy\n` +
               `• Web applications with Streamlit\n` +
               `• Data analysis and visualization\n` +
               `• Automation and AI assistants like JARVIS\n\n` +
               `She even has a HackerRank Python certification! 🏆`;
    }
    
    // Certifications
    if (lowerMessage.match(/\b(certification|certificate|credential|qualification|course)\b/)) {
        const certs = bio.certifications.map(cert => 
            `• **${cert.title}** (${cert.issuer})\n  ${cert.description}`
        ).join('\n\n');
        return `Zabiha has earned several industry certifications:\n\n${certs}`;
    }
    
    // Contact information
    if (lowerMessage.match(/\b(contact|reach|email|linkedin|github|connect|hire)\b/)) {
        return `You can connect with Zabiha through:\n\n` +
               `📧 Email: ${bio.contact.email}\n` +
               `💼 LinkedIn: ${bio.contact.linkedin}\n` +
               `🐙 GitHub: ${bio.contact.github}\n\n` +
               `She's always open to discussing AI/ML projects, collaboration opportunities, or tech conversations!`;
    }
    
    // Stats/achievements
    if (lowerMessage.match(/\b(stat|number|achievement|accomplish|count)\b/)) {
        return `Here are some impressive numbers about Zabiha:\n\n` +
               `📊 **${bio.stats.projects}** Projects Completed\n` +
               `🛠️ **${bio.stats.technologies}** Technologies Mastered\n` +
               `🧩 **${bio.stats.problems_solved}** Problems Solved\n` +
               `⏰ **${bio.stats.coding_hours_daily}** Hours of Coding Daily\n\n` +
               `Her dedication to continuous learning is evident in these numbers!`;
    }
    
    // Education/student
    if (lowerMessage.match(/\b(education|student|study|university|college|degree|cse)\b/)) {
        return `Zabiha is currently a final-year Computer Science Engineering (CSE) student. Her academic journey has been complemented by practical experience through multiple internships and hands-on projects. She's focused on preparing for real-world tech challenges through ML & DSA practice.`;
    }
    
    // Future goals/aspirations
    if (lowerMessage.match(/\b(future|goal|plan|aspiration|career|next)\b/)) {
        return `Zabiha is focused on ${bio.personal.goal}. She's passionate about pushing the boundaries of what's possible with artificial intelligence and aims to create intelligent systems that solve real-world problems. Her diverse experience across AI, ML, and web development positions her well for a successful tech career.`;
    }
    
    // Generic helpful responses
    if (lowerMessage.match(/\b(help|assist|what can you)\b/)) {
        return `I can help you learn about:\n\n` +
               `🤖 Zabiha's AI/ML projects and experience\n` +
               `💼 Her internships and work experience\n` +
               `🛠️ Technical skills and technologies\n` +
               `🏆 Certifications and achievements\n` +
               `📞 How to contact her\n` +
               `📊 Statistics and accomplishments\n\n` +
               `Just ask me anything you'd like to know!`;
    }
    
    // Thank you responses
    if (lowerMessage.match(/\b(thank|thanks|appreciate)\b/)) {
        return `You're welcome! I'm happy to help you learn about Zabiha's work. Feel free to ask if you have any other questions about her projects, skills, or experience! 😊`;
    }
    
    // Why should I hire / work with her
    if (lowerMessage.match(/\b(why.*hire|why.*work|why.*choose|what makes.*special|standout|unique)\b/)) {
        return "Great question! Here's why Zabiha stands out: 🌟\n\n" +
               "🚀 **Proven Results**: Built systems with 95% accuracy and 5+ production AI apps\n" +
               "🧠 **Diverse Expertise**: Unique combination of AI/ML, web dev, and communication skills\n" +
               "⚡ **Fast Learner**: Mastered multiple technologies across 4 different internships\n" +
               "🔄 **Problem Solver**: Creates intelligent solutions for real-world challenges\n" +
               "💪 **Self-Motivated**: 4+ hours daily coding practice and continuous skill development\n" +
               "🤝 **Team Player**: Experience in collaborative environments and project delivery\n" +
               "📈 **Growth Mindset**: Constantly learning and adapting to new technologies\n\n" +
               "She brings both technical excellence and a passion for innovation!";
    }
    
    // How to get in touch / contact
    if (lowerMessage.match(/\b(contact|reach|email|linkedin|github|connect|hire|get in touch|talk to)\b/)) {
        return `Ready to connect with Zabiha? Here's how! 📞\n\n` +
               `📧 **Email**: ${bio.contact.email}\n` +
               `💼 **LinkedIn**: ${bio.contact.linkedin}\n` +
               `🐙 **GitHub**: ${bio.contact.github}\n\n` +
               `🌟 **Best for**: Project collaborations, job opportunities, tech discussions, mentorship\n` +
               `⚡ **Response Time**: Usually responds within 24 hours\n` +
               `💡 **Tip**: Mention specific projects or technologies you're interested in!\n\n` +
               `She's always excited to discuss AI/ML projects and new opportunities!`;
    }
    
    // What programming languages / specific tech questions
    if (lowerMessage.match(/\b(python|java|javascript|html|css|sql|react|node)\b/)) {
        if (lowerMessage.includes('python')) {
            return `Python is Zabiha's **strongest language**! 🐍💪\n\n` +
                   `**Expertise Level**: Expert (5/5 stars)\n` +
                   `**Use Cases**: AI/ML development, data analysis, web apps, automation\n` +
                   `**Libraries Mastered**: Scikit-learn, Pandas, NumPy, Streamlit, Matplotlib\n` +
                   `**Projects**: JARVIS AI, Fraud Detection, Finance Tracker, Gemini Chatbot\n` +
                   `**Certification**: HackerRank Python (Basic) certified\n\n` +
                   `She uses Python for everything from machine learning models to AI assistants!`;
        }
        return "Zabiha is proficient in multiple programming languages! Let me know which specific language or technology you'd like to know about, and I'll give you detailed information about her expertise level and projects using that technology.";
    }
    
    // Comparisons and competitive questions
    if (lowerMessage.match(/\b(compare|better|best|versus|vs|different|special|advantage)\b/)) {
        return "What makes Zabiha unique in the AI/ML space? 🎯\n\n" +
               "**Unique Combination**: Unlike many developers who specialize in just one area, Zabiha bridges AI/ML with practical web development\n\n" +
               "**Real-World Focus**: Her projects solve actual problems (fraud detection, personal finance, automation)\n\n" +
               "**Rapid Learning**: 4 internships in different domains show incredible adaptability\n\n" +
               "**Technical Depth**: Expert-level Python with 95% model accuracy achievements\n\n" +
               "**Communication Skills**: Can explain complex AI concepts clearly (content writing background)\n\n" +
               "**Modern Stack**: Stays current with latest AI APIs, frameworks, and deployment tools\n\n" +
               "She's not just technically skilled - she's a well-rounded technologist!";
    }
    
    // Time and availability
    if (lowerMessage.match(/\b(available|time|when|schedule|free|busy)\b/)) {
        return "Zabiha maintains an active development schedule! ⏰\n\n" +
               "🔥 **Daily Coding**: 4+ hours of programming and skill development\n" +
               "📚 **Current Status**: Final-year CSE student with flexible schedule\n" +
               "💼 **Availability**: Open to internships, projects, and collaboration opportunities\n" +
               "🚀 **Project Capacity**: Actively building and deploying new applications\n" +
               "📞 **Response Time**: Typically responds to inquiries within 24 hours\n\n" +
               "She's always excited to discuss new opportunities and technical challenges!";
    }
    
    // Default response for unmatched queries - much more helpful
    const helpfulDefaults = [
        "That's an interesting question! 🤔 I can help you learn about:\n\n" +
        "🤖 Zabiha's AI/ML projects and technical expertise\n" +
        "💼 Her professional experience and internships\n" +
        "🛠️ Technical skills, certifications, and achievements\n" +
        "📞 How to connect with her for opportunities\n" +
        "🎯 Her goals, background, and what makes her unique\n\n" +
        "Try asking something like 'Tell me about her projects' or 'What are her skills?'",
        
        "I'd love to help you discover more about Zabiha! 🌟 Here are some things you might want to know:\n\n" +
        "💡 'What projects has she built?' - Learn about her AI/ML applications\n" +
        "🚀 'Tell me about her experience' - Explore her internship journey\n" +
        "🔧 'What technologies does she use?' - Discover her technical stack\n" +
        "🎓 'What are her achievements?' - See her accomplishments and certifications\n" +
        "📱 'How can I contact her?' - Get connection information\n\n" +
        "Feel free to ask anything about her background, skills, or work!",
        
        "I'm here to help you explore Zabiha's amazing work! 🚀 You could ask me:\n\n" +
        "📊 About her fraud detection system with 95% accuracy\n" +
        "🤖 Details on her JARVIS AI assistant project\n" +
        "💼 Her experience at SIIT Technologies, Zaalima Development, and other companies\n" +
        "🐍 Her Python expertise and programming skills\n" +
        "🏆 Her certifications from AWS, Google, IBM, and HackerRank\n\n" +
        "What aspect of her portfolio interests you most?"
    ];
    
    return helpfulDefaults[Math.floor(Math.random() * helpfulDefaults.length)];
}

// Contact Form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', handleResumeDownload);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.btn-primary');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = '<span>Message Sent!</span>';
        contactForm.reset();
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
        
        // Show success notification
        showNotification('Message sent successfully! Zabiha will get back to you soon.', 'success');
    }, 2000);
}

function handleResumeDownload() {
    // Simulate resume download
    showNotification('Resume download will be available soon!', 'info');
    createRippleEffect(downloadResumeBtn);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--surface);
        color: var(--text-primary);
        padding: 1rem 2rem;
        border-radius: 10px;
        border: 2px solid var(--primary-color);
        box-shadow: 0 10px 30px var(--shadow);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--accent-color)';
    } else if (type === 'error') {
        notification.style.borderColor = '#ef4444';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
        <span style="margin-left: 0.5rem;">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Advanced Animations
function initializeAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-container, .floating-particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Mouse follower effect
    const mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    mouseFollower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(mouseFollower);
    
    document.addEventListener('mousemove', (e) => {
        mouseFollower.style.left = e.clientX - 10 + 'px';
        mouseFollower.style.top = e.clientY - 10 + 'px';
        mouseFollower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        mouseFollower.style.opacity = '0';
    });
    
    // Enhanced hover effects for interactive elements
    document.querySelectorAll('.project-card, .skill-item, .social-link').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            mouseFollower.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            mouseFollower.style.transform = 'scale(1)';
        });
    });
}

// Performance Optimization
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll optimizations here
}, 16));

// Easter Eggs
function initializeEasterEggs() {
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
}

function activateEasterEgg() {
    // Create Matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10000';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 35);
    
    setTimeout(() => {
        clearInterval(matrixInterval);
        canvas.remove();
        showNotification('🎉 You found the secret! Welcome to the Matrix, Neo!', 'success');
    }, 5000);
}

// Revolutionary Experience Section - 3D Holographic Interactions
class ExperienceUniverse {
    constructor() {
        this.activeExperience = 'ai';
        this.experienceData = {
            ai: {
                title: 'AI Innovation Journey',
                company: 'SIIT Technologies • July 2025 - August 2025',
                icon: 'fas fa-robot',
                color: '#ec4899',
                achievements: [
                    {
                        icon: 'fas fa-cogs',
                        title: 'AI Application Development',
                        description: 'Built 5+ AI-powered applications using cutting-edge APIs and modern development frameworks'
                    },
                    {
                        icon: 'fas fa-brain',
                        title: 'Prompt Engineering',
                        description: 'Mastered advanced prompt engineering techniques for optimal AI model performance'
                    },
                    {
                        icon: 'fas fa-robot',
                        title: 'AI Agent Design',
                        description: 'Designed and implemented intelligent AI agents for automated decision-making systems'
                    }
                ],
                technologies: ['AI Development', 'API Integration', 'Prompt Engineering', 'Agent Design']
            },
            ml: {
                title: 'ML Mastery Quest',
                company: 'Zaalima Development • June 2025 - August 2025',
                icon: 'fas fa-chart-line',
                color: '#10b981',
                achievements: [
                    {
                        icon: 'fas fa-database',
                        title: 'Data Manipulation',
                        description: 'Mastered advanced data manipulation techniques using Pandas and NumPy for large-scale datasets'
                    },
                    {
                        icon: 'fas fa-chart-bar',
                        title: 'Data Visualization',
                        description: 'Created comprehensive visualizations using Matplotlib and Seaborn for actionable insights'
                    },
                    {
                        icon: 'fas fa-shield-alt',
                        title: 'ML Model Deployment',
                        description: 'Developed and deployed a fraud detection model achieving 95% accuracy'
                    }
                ],
                technologies: ['Machine Learning', 'Data Science', 'Python', 'Model Deployment']
            },
            web: {
                title: 'Web Crafting Adventure',
                company: 'Oasis InfoByte • May 2024 - June 2024',
                icon: 'fas fa-code',
                color: '#6366f1',
                achievements: [
                    {
                        icon: 'fas fa-mobile-alt',
                        title: 'Responsive Development',
                        description: 'Built fully responsive web applications optimized for all device types'
                    },
                    {
                        icon: 'fas fa-palette',
                        title: 'UI/UX Design',
                        description: 'Crafted intuitive user interfaces with focus on user experience and accessibility'
                    },
                    {
                        icon: 'fas fa-tools',
                        title: 'Interactive Tools',
                        description: 'Developed interactive web tools including portfolio websites and utility applications'
                    }
                ],
                technologies: ['Frontend Development', 'Responsive Design', 'UI/UX Design']
            },
            content: {
                title: 'Content Artistry Saga',
                company: 'InAmigos Foundation • October 2024 - November 2024',
                icon: 'fas fa-pen-fancy',
                color: '#ff6b35',
                achievements: [
                    {
                        icon: 'fas fa-leaf',
                        title: 'Environmental Content',
                        description: 'Created 50+ compelling articles on environmental awareness and sustainability'
                    },
                    {
                        icon: 'fas fa-share-alt',
                        title: 'Social Media Strategy',
                        description: 'Boosted social media engagement through strategic content planning and execution'
                    },
                    {
                        icon: 'fas fa-globe',
                        title: 'Campaign Development',
                        description: 'Promoted sustainability campaigns that reached diverse audiences'
                    }
                ],
                technologies: ['Content Writing', 'Social Media', 'Campaign Strategy']
            }
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeOrbs();
        this.initializeNavigator();
    }

    bindEvents() {
        // Orb click events
        document.querySelectorAll('.experience-orb').forEach(orb => {
            orb.addEventListener('click', (e) => {
                const experienceType = orb.dataset.experience;
                this.showExperiencePanel(experienceType);
                this.createOrbRipple(e, orb);
            });

            // Orb hover effects
            orb.addEventListener('mouseenter', () => {
                this.activateOrb(orb);
            });

            orb.addEventListener('mouseleave', () => {
                this.deactivateOrb(orb);
            });
        });

        // Navigator events
        document.querySelectorAll('.nav-indicator').forEach(indicator => {
            indicator.addEventListener('click', () => {
                const target = indicator.dataset.target;
                this.focusOnExperience(target);
            });
        });

        // Panel close event
        const panelClose = document.querySelector('.panel-close');
        if (panelClose) {
            panelClose.addEventListener('click', () => {
                this.hideExperiencePanel();
            });
        }

        // Click outside panel to close
        document.addEventListener('click', (e) => {
            const panel = document.querySelector('.experience-detail-panel');
            if (panel && panel.classList.contains('active') && !panel.contains(e.target) && !e.target.closest('.experience-orb')) {
                this.hideExperiencePanel();
            }
        });
    }

    initializeOrbs() {
        // Add floating animation to orbs
        document.querySelectorAll('.experience-orb').forEach((orb, index) => {
            orb.style.animationDelay = `${index * 0.2}s`;
            orb.classList.add('orb-floating');
        });

        // Create dynamic CSS for floating animation
        if (!document.querySelector('#orb-animations')) {
            const style = document.createElement('style');
            style.id = 'orb-animations';
            style.textContent = `
                .orb-floating {
                    animation: orbFloat 6s ease-in-out infinite;
                }
                @keyframes orbFloat {
                    0%, 100% { transform: translateY(0px) rotateY(0deg); }
                    50% { transform: translateY(-15px) rotateY(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeNavigator() {
        // Set initial active state
        this.updateNavigator(this.activeExperience);
    }

    activateOrb(orb) {
        orb.style.transform = 'translateY(-10px) scale(1.05)';
        orb.style.filter = 'brightness(1.2)';
        
        // Add pulsing glow effect
        const glow = orb.querySelector('.orb-glow');
        if (glow) {
            glow.style.animation = 'glow-pulse 1s ease-in-out infinite';
        }
    }

    deactivateOrb(orb) {
        orb.style.transform = '';
        orb.style.filter = '';
        
        // Reset glow effect
        const glow = orb.querySelector('.orb-glow');
        if (glow) {
            glow.style.animation = 'glow-pulse 3s ease-in-out infinite';
        }
    }

    createOrbRipple(event, orb) {
        const ripple = document.createElement('div');
        const rect = orb.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: rippleExpand 0.6s ease-out forwards;
            z-index: 100;
        `;

        orb.style.position = 'relative';
        orb.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    showExperiencePanel(experienceType) {
        const panel = document.querySelector('.experience-detail-panel');
        const data = this.experienceData[experienceType];
        
        if (!panel || !data) return;

        // Update panel content
        this.updatePanelContent(panel, data);
        
        // Show panel with animation
        panel.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update active experience
        this.activeExperience = experienceType;
        this.updateNavigator(experienceType);
        
        // Add panel entrance animation
        this.animatePanelEntrance(panel);
    }

    hideExperiencePanel() {
        const panel = document.querySelector('.experience-detail-panel');
        if (!panel) return;

        panel.classList.remove('active');
        document.body.style.overflow = '';
    }

    updatePanelContent(panel, data) {
        // Update header
        const icon = panel.querySelector('.panel-icon i');
        const title = panel.querySelector('.panel-title');
        const company = panel.querySelector('.panel-company');
        
        if (icon) icon.className = data.icon;
        if (title) title.textContent = data.title;
        if (company) company.textContent = data.company;

        // Update header color
        const header = panel.querySelector('.panel-header');
        if (header) {
            header.style.background = `linear-gradient(135deg, ${data.color}, ${this.adjustColorBrightness(data.color, -20)})`;
        }

        // Update achievements
        const showcase = panel.querySelector('.achievement-showcase');
        if (showcase) {
            showcase.innerHTML = data.achievements.map(achievement => `
                <div class="showcase-item">
                    <div class="showcase-icon">
                        <i class="${achievement.icon}"></i>
                    </div>
                    <div class="showcase-content">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // Update technologies
        const techStars = panel.querySelector('.tech-stars');
        if (techStars) {
            techStars.innerHTML = data.technologies.map(tech => 
                `<span class="tech-star" style="background: ${data.color}">${tech}</span>`
            ).join('');
        }
    }

    animatePanelEntrance(panel) {
        const items = panel.querySelectorAll('.showcase-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });

        const techStars = panel.querySelectorAll('.tech-star');
        techStars.forEach((star, index) => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0)';
            
            setTimeout(() => {
                star.style.transition = 'all 0.3s ease';
                star.style.opacity = '1';
                star.style.transform = 'scale(1)';
            }, 300 + index * 50);
        });
    }

    focusOnExperience(experienceType) {
        const orb = document.querySelector(`[data-experience="${experienceType}"]`);
        if (orb) {
            orb.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight the focused orb
            setTimeout(() => {
                this.highlightOrb(orb);
            }, 500);
        }
        
        this.updateNavigator(experienceType);
    }

    highlightOrb(orb) {
        // Create highlight effect
        orb.style.transform = 'scale(1.1)';
        orb.style.filter = 'brightness(1.3) drop-shadow(0 0 20px var(--primary-color))';
        
        setTimeout(() => {
            orb.style.transform = '';
            orb.style.filter = '';
        }, 1000);
    }

    updateNavigator(activeType) {
        document.querySelectorAll('.nav-indicator').forEach(indicator => {
            indicator.classList.toggle('active', indicator.dataset.target === activeType);
        });
    }

    adjustColorBrightness(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}

// Initialize Experience Universe when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other initializations
    setTimeout(() => {
        new ExperienceUniverse();
    }, 100);
});

// Add CSS for ripple animation
if (!document.querySelector('#ripple-animations')) {
    const style = document.createElement('style');
    style.id = 'ripple-animations';
    style.textContent = `
        @keyframes rippleExpand {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize easter eggs
initializeEasterEggs();

// Export functions for global access
window.portfolioApp = {
    toggleTheme,
    toggleChatbot,
    showNotification,
    createRippleEffect
};
