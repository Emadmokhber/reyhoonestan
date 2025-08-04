// Enhanced Persian Poetry Garden - Fixed Navigation Issues
class AdvancedPoetryGarden {
    constructor() {
        this.currentPoet = null;
        this.isReducedMotion = false;
        this.particles = [];
        this.ripples = [];
        this.mousePosition = { x: 0, y: 0 };
        this.cursorFollower = null;
        
        this.poetryData = {
            "hafez": {
                "name": "حافظ شیرازی",
                "nameEn": "Hafez Shirazi",
                "bio": "لسان الغیب، استاد غزل فارسی",
                "theme": "rose-petals",
                "poems": [
                    {
                        "title": "غزل عشق و آزادی",
                        "persian": "فاش میگویم و از گفته خود دلشادم\nبنده عشقم و از هر دو جهان آزادم\n\nچون گل ریحانه در باغ وجود می‌پیچم\nعاشقم و در این عشق، از همه شادم\n\nدر این ریحونستان که نامش گذارده\nهر نفس عطر محبت، دل را شادم",
                        "english": "Openly I speak, and of my words I am heart-glad\nI am love's servant, and of both worlds I am free\n\nLike sweet basil in the garden of existence I grow\nI am a lover, and in this love, I am joyful\n\nIn this Rayhanestan that she has named\nEvery breath of love's fragrance brings joy to the heart"
                    }
                ]
            },
            "rumi": {
                "name": "مولانا جلال‌الدین رومی",
                "nameEn": "Rumi", 
                "bio": "عارف بزرگ و شاعر عشق الهی",
                "theme": "whirling-dervish",
                "poems": [
                    {
                        "title": "عشق همه چیز است",
                        "persian": "عشق همه چیز است، ما فقط تکه‌هایی هستیم\nهر کجا هستی و هر چه می‌کنی، عاشق باش\n\nای ریحانه، تو عطر این ریحونستانی\nدر هر نفس تو، خدا را می‌یابم",
                        "english": "Love is the whole thing, we are only pieces\nWherever you are, whatever you do, be in love\n\nO Rayhaneh, you are the fragrance of this Rayhanestan\nIn every breath of yours, I find God"
                    }
                ]
            },
            "saadi": {
                "name": "سعدی شیرازی",
                "nameEn": "Saadi Shirazi",
                "bio": "شیخ اجل سعدی، صاحب گلستان و بوستان",
                "theme": "spring-blossoms",
                "poems": [
                    {
                        "title": "غزل بهاری",
                        "persian": "بگذار تا بگریم چون ابر در بهاران\nک از سنگ گریه خیزد روز وداع یاران\n\nای ریحانه، تو بهار جاودان ریحونستان\nدر باغ قلب من، همیشه نوبهاران",
                        "english": "Let me weep like spring clouds\nEven stones cry on the day friends depart\n\nO Rayhaneh, you are the eternal spring of Rayhanestan\nIn my heart's garden, always new spring"
                    }
                ]
            },
            "sepehri": {
                "name": "سهراب سپهری",
                "nameEn": "Sohrab Sepehri",
                "bio": "شاعر طبیعت و نقاش آسمان",
                "theme": "flowing-water",
                "poems": [
                    {
                        "title": "زندگی زیباست",
                        "persian": "زندگی زیباست\nزندگی یک چشمه است و یک پنجره\nباید شست قلب را، باید شست قلب را\n\nای ریحانه، تو زیبایی خود زندگی در ریحونستان\nدر چشمان تو، جهان تازه می‌شود",
                        "english": "Life is beautiful\nLife is a spring and a window\nOne must wash the heart, wash the heart\n\nO Rayhaneh, you are the beauty of life itself in Rayhanestan\nIn your eyes, the world becomes new"
                    }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.setupCursor();
        this.setupParticleSystem();
        this.bindEvents();
        this.startAnimations();
        this.setupAccessibility();
        this.initializeWelcomeSequence();
    }

    setupCursor() {
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            
            if (this.cursorFollower && !this.isReducedMotion) {
                requestAnimationFrame(() => {
                    this.cursorFollower.style.left = `${e.clientX - 10}px`;
                    this.cursorFollower.style.top = `${e.clientY - 10}px`;
                });
            }
        });

        document.addEventListener('mouseenter', () => {
            if (this.cursorFollower) this.cursorFollower.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            if (this.cursorFollower) this.cursorFollower.style.opacity = '0';
        });
    }

    setupParticleSystem() {
        this.particleContainer = document.querySelector('.floating-particles');
        this.rippleContainer = document.querySelector('.ripple-container');
        
        // Create initial particles
        for (let i = 0; i < 30; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        if (this.isReducedMotion) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            animation-duration: ${4 + Math.random() * 8}s;
            pointer-events: none;
            z-index: -10;
        `;
        
        this.particleContainer.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation to prevent memory leaks
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 12000);
    }

    createRipple(x, y) {
        if (this.isReducedMotion) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            pointer-events: none;
            z-index: -5;
        `;
        
        this.rippleContainer.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    createParticleExplosion(x, y) {
        if (this.isReducedMotion) return;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const size = 2 + Math.random() * 4;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: var(--color-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px var(--color-primary);
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }

    bindEvents() {
        // Wait for DOM to be fully loaded before binding events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEventHandlers());
        } else {
            this.bindEventHandlers();
        }
    }

    bindEventHandlers() {
        console.log('Binding event handlers...');
        
        // Poet card interactions - ensure they are clickable
        const poetCards = document.querySelectorAll('.poet-card');
        console.log(`Found ${poetCards.length} poet cards`);
        
        poetCards.forEach((card, index) => {
            const poetId = card.getAttribute('data-poet');
            console.log(`Setting up card ${index}: ${poetId}`);
            
            // Ensure card is above all background elements
            card.style.zIndex = '100';
            card.style.position = 'relative';
            card.style.cursor = 'pointer';
            
            // Remove any existing event listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            this.addTouchEffects(newCard);
            this.addHoverEffects(newCard);
            
            // Primary click handler
            newCard.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const clickedPoetId = newCard.getAttribute('data-poet');
                console.log(`Poet card clicked: ${clickedPoetId}`);
                
                if (!clickedPoetId || !this.poetryData[clickedPoetId]) {
                    console.error(`Invalid poet ID: ${clickedPoetId}`);
                    return;
                }
                
                this.createRipple(e.clientX, e.clientY);
                this.createParticleExplosion(e.clientX, e.clientY);
                
                // Add visual feedback
                newCard.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    newCard.style.transform = '';
                }, 150);
                
                // Navigate to poetry page
                setTimeout(() => {
                    console.log(`Navigating to ${clickedPoetId} poetry page`);
                    this.showPoetry(clickedPoetId);
                }, 300);
            });

            // Add keyboard support
            newCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    newCard.click();
                }
            });

            // Add tabindex for keyboard navigation
            newCard.setAttribute('tabindex', '0');
        });

        // Glass card effects
        const glassCards = document.querySelectorAll('.interactive-glass');
        glassCards.forEach(card => {
            this.addLiquidGlassEffects(card);
        });

        // Back button - ensure it's properly set up
        setTimeout(() => {
            this.setupBackButton();
        }, 100);

        // Magnetic elements
        const magneticElements = document.querySelectorAll('.magnetic-element');
        magneticElements.forEach(element => {
            this.addMagneticEffect(element);
        });

        // Pixel art elements - ensure they don't block interaction
        const pixelElements = document.querySelectorAll('.animated-pixels');
        pixelElements.forEach(element => {
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';
            this.enhancePixelArt(element);
        });

        // Motion controls
        const reduceMotionBtn = document.getElementById('reduce-motion');
        if (reduceMotionBtn) {
            reduceMotionBtn.addEventListener('click', () => {
                this.toggleReducedMotion();
            });
        }

        console.log('Event handlers bound successfully');
    }

    setupBackButton() {
        const backButton = document.querySelector('.back-button');
        console.log('Setting up back button:', backButton);
        
        if (backButton) {
            backButton.style.zIndex = '200';
            backButton.style.cursor = 'pointer';
            
            // Remove existing listeners and create fresh button
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            
            this.addTouchEffects(newBackButton);
            
            newBackButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Back button clicked');
                
                this.createRipple(e.clientX, e.clientY);
                
                // Add visual feedback
                newBackButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    newBackButton.style.transform = '';
                }, 150);
                
                setTimeout(() => {
                    console.log('Returning to garden');
                    this.showGarden();
                }, 200);
            });

            // Keyboard support for back button
            newBackButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    newBackButton.click();
                }
            });

            newBackButton.setAttribute('tabindex', '0');
            console.log('Back button setup complete');
        }
    }

    addTouchEffects(element) {
        element.addEventListener('touchstart', this.handleTouchStart.bind(this));
        element.addEventListener('mousedown', this.handleTouchStart.bind(this));
        element.addEventListener('touchend', this.handleTouchEnd.bind(this));
        element.addEventListener('mouseup', this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        if (this.isReducedMotion) return;
        
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        
        // Create ripple effect
        this.createElementRipple(element, x, y);
        
        // Add shake effect
        element.style.animation = 'glassShake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    handleTouchEnd(e) {
        const element = e.currentTarget;
        // Add bounce back effect
        if (!this.isReducedMotion) {
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        }
    }

    createElementRipple(element, x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: -1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        const animation = ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '100px', height: '100px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        };
    }

    addHoverEffects(element) {
        element.addEventListener('mouseenter', (e) => {
            if (this.isReducedMotion) return;
            
            // Ensure element stays on top during hover
            element.style.zIndex = '200';
            
            // Enhanced glass effect
            element.style.background = 'rgba(255, 255, 255, 0.25)';
            element.style.backdropFilter = 'blur(25px)';
            
            // Glow effect
            element.style.boxShadow = `
                0 20px 60px rgba(0, 0, 0, 0.25),
                0 0 30px rgba(33, 128, 141, 0.3)
            `;
            
            // Scale and float
            const randomRotation = (Math.random() - 0.5) * 6;
            element.style.transform = `
                translateY(-15px) 
                scale(1.05) 
                rotateY(${randomRotation}deg)
                rotateX(2deg)
            `;
        });

        element.addEventListener('mouseleave', (e) => {
            element.style.zIndex = '100';
            element.style.background = '';
            element.style.backdropFilter = '';
            element.style.boxShadow = '';
            element.style.transform = '';
        });
    }

    addLiquidGlassEffects(element) {
        element.addEventListener('mousemove', (e) => {
            if (this.isReducedMotion) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create liquid deformation
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            const radius1 = 10 + (xPercent / 10);
            const radius2 = 15 + (yPercent / 10);
            const radius3 = 20 + ((100 - xPercent) / 10);
            const radius4 = 12 + ((100 - yPercent) / 10);
            
            element.style.borderRadius = `${radius1}px ${radius2}px ${radius3}px ${radius4}px`;
            
            // Surface tension effect
            const tension = Math.sin(Date.now() / 1000) * 2;
            element.style.transform = `
                scale(${1 + tension / 100}) 
                rotate(${tension / 4}deg)
            `;
        });

        element.addEventListener('mouseleave', () => {
            element.style.borderRadius = '';
            element.style.transform = '';
        });
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            if (this.isReducedMotion) return;
            
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const moveX = deltaX * force * 0.3;
                const moveY = deltaY * force * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
            }
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }

    enhancePixelArt(element) {
        element.addEventListener('mouseenter', () => {
            if (this.isReducedMotion) return;
            
            // Vibrant animation
            element.style.filter = 'brightness(1.5) saturate(1.5) hue-rotate(10deg)';
            element.style.transform = 'scale(1.8) rotate(15deg)';
            
            // Add sparkle effect
            this.addSparkleEffect(element);
        });

        element.addEventListener('mouseleave', () => {
            element.style.filter = '';
            element.style.transform = '';
        });
    }

    addSparkleEffect(element) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 6px white;
            `;
            
            element.appendChild(sparkle);
            
            const animation = sparkle.animate([
                { opacity: 0, transform: 'scale(0)' },
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 1000,
                easing: 'ease-in-out'
            });
            
            animation.onfinish = () => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            };
        }
    }

    showPoetry(poetId) {
        const poet = this.poetryData[poetId];
        if (!poet) {
            console.error(`Poet data not found for: ${poetId}`);
            return;
        }

        console.log(`Showing poetry for: ${poetId}`);
        this.currentPoet = poetId;
        
        // Morphing transition
        this.morphToPoetryView(() => {
            // Update content
            const poetNameEl = document.getElementById('poet-name');
            const poetBioEl = document.getElementById('poet-bio');
            
            if (poetNameEl) poetNameEl.textContent = poet.name;
            if (poetBioEl) poetBioEl.textContent = poet.bio;
            
            this.loadPoems(poet.poems);
            
            // Theme-based background change
            this.changeTheme(poet.theme);
            
            // Setup back button after content is loaded
            setTimeout(() => {
                this.setupBackButton();
            }, 100);
        });
    }

    morphToPoetryView(callback) {
        const mainSections = [
            '.dedication-section',
            '.hero-section', 
            '.poets-section'
        ];
        
        // Liquid morphing out
        mainSections.forEach((selector, index) => {
            const section = document.querySelector(selector);
            if (section && !this.isReducedMotion) {
                section.style.transform = `scale(0.8) rotate(${index * 5}deg)`;
                section.style.opacity = '0';
                section.style.filter = 'blur(10px)';
            }
        });
        
        setTimeout(() => {
            mainSections.forEach(selector => {
                const section = document.querySelector(selector);
                if (section) section.style.display = 'none';
            });
            
            // Show poetry section with liquid morphing in
            const poetrySection = document.getElementById('poetry-display');
            if (poetrySection) {
                poetrySection.classList.remove('hidden');
                poetrySection.style.zIndex = '50';
                
                if (!this.isReducedMotion) {
                    poetrySection.style.transform = 'scale(0.8)';
                    poetrySection.style.opacity = '0';
                    
                    requestAnimationFrame(() => {
                        poetrySection.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        poetrySection.style.transform = 'scale(1)';
                        poetrySection.style.opacity = '1';
                    });
                }
                
                callback();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 500);
    }

    showGarden() {
        console.log('Showing garden view');
        
        // Reverse morphing transition
        const poetrySection = document.getElementById('poetry-display');
        
        if (poetrySection && !this.isReducedMotion) {
            poetrySection.style.transform = 'scale(0.8) rotate(5deg)';
            poetrySection.style.opacity = '0';
        }
        
        setTimeout(() => {
            if (poetrySection) poetrySection.classList.add('hidden');
            
            const mainSections = [
                '.dedication-section',
                '.hero-section',
                '.poets-section'
            ];
            
            mainSections.forEach((selector, index) => {
                const section = document.querySelector(selector);
                if (section) {
                    section.style.display = 'block';
                    
                    if (!this.isReducedMotion) {
                        setTimeout(() => {
                            section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            section.style.transform = 'scale(1) rotate(0deg)';
                            section.style.opacity = '1';
                            section.style.filter = 'blur(0)';
                        }, index * 100);
                    }
                }
            });
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
        
        this.currentPoet = null;
    }

    loadPoems(poems) {
        const container = document.getElementById('poems-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        poems.forEach((poem, index) => {
            const poemElement = document.createElement('div');
            poemElement.className = 'poem';
            
            poemElement.innerHTML = `
                <h4>${poem.title}</h4>
                <div class="poem-persian">${poem.persian.replace(/\n/g, '<br>')}</div>
                <div class="poem-english">${poem.english.replace(/\n/g, '<br>')}</div>
            `;
            
            container.appendChild(poemElement);
            
            // Add interactive effects to poems
            this.addTouchEffects(poemElement);
            this.addPoemSpecialEffects(poemElement);
            
            // Staggered entrance animation
            if (!this.isReducedMotion) {
                poemElement.style.opacity = '0';
                poemElement.style.transform = 'translateY(50px) rotateX(45deg)';
                
                setTimeout(() => {
                    poemElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    poemElement.style.opacity = '1';
                    poemElement.style.transform = 'translateY(0) rotateX(0)';
                }, index * 200);
            }
        });
    }

    addPoemSpecialEffects(poemElement) {
        const persianText = poemElement.querySelector('.poem-persian');
        if (!persianText) return;
        
        persianText.addEventListener('mouseenter', () => {
            if (this.isReducedMotion) return;
            
            // Glowing text effect
            persianText.style.textShadow = `
                0 0 20px rgba(33, 128, 141, 0.6),
                0 0 40px rgba(33, 128, 141, 0.4),
                0 0 60px rgba(33, 128, 141, 0.2)
            `;
        });

        persianText.addEventListener('mouseleave', () => {
            persianText.style.textShadow = '';
        });
    }

    changeTheme(theme) {
        if (this.isReducedMotion) return;
        
        const pixelLayers = document.querySelectorAll('.pixel-layer');
        
        switch (theme) {
            case 'rose-petals':
                this.animatePixelTheme(pixelLayers, ['#FFB6C1', '#FF69B4', '#DC143C']);
                break;
            case 'whirling-dervish':
                this.animatePixelTheme(pixelLayers, ['#9333EA', '#A855F7', '#C084FC']);
                break;
            case 'spring-blossoms':
                this.animatePixelTheme(pixelLayers, ['#22C55E', '#16A34A', '#15803D']);
                break;
            case 'flowing-water':
                this.animatePixelTheme(pixelLayers, ['#3B82F6', '#1D4ED8', '#1E40AF']);
                break;
        }
    }

    animatePixelTheme(layers, colors) {
        layers.forEach((layer, index) => {
            layer.style.filter = `hue-rotate(${index * 60}deg) saturate(1.5)`;
            layer.style.opacity = '0.6';
        });
    }

    startAnimations() {
        // Continuous particle generation
        setInterval(() => {
            if (this.particles.length < 30 && !this.isReducedMotion) {
                this.createParticle();
            }
        }, 2000);
        
        // Parallax scrolling
        this.setupParallax();
    }

    setupParallax() {
        let ticking = false;
        
        const updateParallax = () => {
            if (this.isReducedMotion) return;
            
            const scrolled = window.pageYOffset;
            const layers = document.querySelectorAll('.pixel-layer');
            
            layers.forEach((layer, index) => {
                const speed = 0.2 + (index * 0.1);
                layer.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    setupAccessibility() {
        // Check for prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.toggleReducedMotion();
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPoet) {
                this.showGarden();
            }
        });
    }

    toggleReducedMotion() {
        this.isReducedMotion = !this.isReducedMotion;
        document.body.classList.toggle('reduce-motion', this.isReducedMotion);
        
        const btn = document.getElementById('reduce-motion');
        if (btn) {
            btn.textContent = this.isReducedMotion ? 'فعال کردن حرکت' : 'کاهش حرکت';
        }
        
        if (this.isReducedMotion) {
            // Clear all particles
            this.particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            this.particles = [];
        }
    }

    initializeWelcomeSequence() {
        // Smooth page load
        document.body.style.opacity = '0';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 1s ease-in';
                document.body.style.opacity = '1';
                
                if (!this.isReducedMotion) {
                    this.playWelcomeAnimation();
                }
            }, 100);
        });
    }

    playWelcomeAnimation() {
        // Cascading entrance for all elements
        const elements = [
            '.dedication-card',
            '.hero-card',
            ...Array.from(document.querySelectorAll('.poet-card'))
        ];
        
        elements.forEach((element, index) => {
            const el = typeof element === 'string' ? document.querySelector(element) : element;
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(100px) rotateX(45deg)';
                
                setTimeout(() => {
                    el.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) rotateX(0)';
                }, index * 200);
            }
        });
    }
}

// Initialize the enhanced poetry garden
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Poetry Garden');
    const garden = new AdvancedPoetryGarden();
    
    // Add additional CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatLetter {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        .explosion-particle {
            animation: explode 1s ease-out forwards;
        }
        
        @keyframes explode {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        /* Performance optimizations */
        .pixel-layer,
        .particle,
        .glass-card,
        .magnetic-element {
            will-change: transform;
            transform: translateZ(0);
        }
        
        /* Intersection observer for performance */
        .lazy-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .lazy-animate.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization with Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.lazy-animate').forEach(el => {
        observer.observe(el);
    });
    
    // Debug: Test poet card clicks
    console.log('Poetry Garden initialized. All poet cards should be fully functional now.');
    
    // Global click handler for debugging
    window.debugPoetryGarden = garden;
});