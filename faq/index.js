const faqData = [
    {
      title: "Event Sourcing & Preparation",
      id: 1,
      items: [
        {
          question: "What is Karma?",
          answer: "Karma is a non-financial digital token whose only purpose is to acknowledge charitable acts. It is never marketed as an investment or used for speculationd-think of it as a permanent, blockchain-based “thank-you note.”"
        },
        {
          question: "Why base minting on donations?",
          answer: "Real-world donations are transparent, measurable, and verifiable. Tying every token to a documented act of giving anchors the project in genuine goodwill and removes any “pay-to-mint” dynamic."
        },
        {
          question: "How are donation events sourced?",
          answer: "Karma.Today identifies donation events worldwide, and community members can also nominate events. Once an event is added to the candidate list, Karma.Today researches the appropriate proof methods to fully verify it.",
          button: 'Click to see',
          diagram: "diag1.png"
        },
      ]
    },
    {
      title: "Witness & Minting",
      id: 2,
      items: [
        {
            question: "How is Karma minted?",
            answer: "1. A donor sends money (on-chain or off-chain) directly to the beneficiary.<br> 2. The Karma team or an approved oracle verifies the amount in USD. <br> 3. Karma tokens are minted as proof of the donation and distributed to the donor, beneficiary, organizer, and ecosystem wallets. At no point does the Karma protocol touch the donated funds.",
            button: 'Click to see',
            diagram: "diag2.png"
        },
        {
            question: "Total supply and mint curve?",
            answer: "Supply is permanently capped at 1 billion tokens. Minting happens in 11 batches; each new batch doubles the USD cost per Karma (from $0.08 in Batch 1 up to $81.92 in Batch 11). Early donors therefore receive more tokens per dollar, while later inflation is kept in check."
          },
          {
            question: "How are large donations handled?",
            answer: "If one donation exceeds the remaining space in the current batch, the overflow is priced in the next batch. Every token thus reflects the correct batch rate, and no donor jumps the queue."
          },
      ]
    },
    {
      title: "Allocation",
      id: 3,
      items: [
        {
            question: "How are newly minted tokens split?",
            answer: " &#9679; 30 % to donors-rewarding the people who gave. <br> &#9679; 10 % to beneficiariesd-letting recipients hold a transparent record of support. <br> &#9679; 5 % to organizersd-covering the work of platforms or charities that coordinated the drive. <br> &#9679; 25 % to the core teamd-funding development, audits, operations, and outreach. <br> &#9679; 5 % to ecosystem developersd-grants and bounties for builders expanding Karma tooling. <br> &#9679; 15 % to the Charity Fundd-a community-governed treasury for future good-cause projects. <br> &#9679; 10 % to liquidity managementd-used later to create healthy on-chain markets.",
            button: 'Click to see',
            diagram: "diag3.png"
        },
        {
          question: "Why isn't Karma a security?",
          answer: "You can't buy tokens directly; they appear only after a donation. There is no pre-mine, no dividend, and no expectation of profitd-only recognition and governance privileges."
        },
        {
          question: "What is the Charity Fund?",
          answer: "A dedicated on-chain treasury that holds only Karma. Any other asset it receives is instantly swapped for Karma to keep accounting simple. Each week, guardians propose a single grant; the community decides whether to approve it."
        },
        {
          question: "How does NFT governance work?",
          answer: "Charity Guardian NFTs act as voting badges. One NFT equals one irrevocable vote. A proposal passes only if it wins the tally and more than one-third of all NFTs participate, preventing low-turnout capture."
        },
        {
          question: "Are voters rewarded?",
          answer: "Casting a vote counts as a good deed. Guardians may receive surprise Karma airdrops or reputation boosts, but because timing and size are unpredictable, there's no incentive to farm the system."
        },
        {
          question: "What is the reputation system?",
          answer: "A forthcoming on-chain score that tracks lifetime Karma earned, governance participation, and verified volunteer workd-providing a non-financial “social credit” signal for individuals and organizations"
        },
        {
          question: "What is the Karma Wallet?",
          answer: "A self-custody app that lets users store Karma, chat with other participants, convert crypto to fiat after KYC, and spend via virtual or physical debit cardsd-all while displaying donation proofs and reputation updates."
        },
        {
            question: "How can I get involved?",
            answer: "&#9679; Developers can apply for grants from the ecosystem pool to build tools, analytics, or integrations. <br> &#9679; Non-profits can request Charity Fund grants by submitting proposals for the weekly vote. <br> &#9679; Volunteers can earn Karma by auditing smart contracts, moderating communities, or helping with events"
        },
        {
            question: "How do I track progress?",
            answer: "Every mint, fund movement, and governance vote is recorded on-chain for anyone to audit. The team also publishes concise public summaries after each verified donation event, so supporters can follow impact in real time."
        },
        
      ]
    }
  ];
  function renderFAQSections() {
    return faqData.map(section => {
        const visibleItems = section.items.slice(0, 5);
        const hiddenItems = section.items.slice(5);
        
        const visibleItemsHTML = visibleItems.map((item, index) => `
            <div class="faq-box_content">
                <div class="question no-select" role="button" tabindex="0" aria-expanded="false" aria-controls="answer-${section.id}-${index}">
                    ${item.question}
                    <div class="accordion">
                        <div class="show-answer">
                            <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 16L27 0.411537L27 31.5885L0 16Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="answer" id="answer-${section.id}-${index}" data-has-diagram="${item.diagram ? 'true' : 'false'}" data-diagram-path="${item.diagram || ''}">
                    ${item.diagram ? 
                      `<div class="answer-text">${item.answer}</div>
                       <div class="diagram-container" style="display: none;">
                         <img src="../image/faq/${item.diagram}" alt="${item.question} diagram" class="diagram-image">
                       </div>
                       <button class="diagram-button">${item.button}</button>` 
                      : item.answer}
                </div>
            </div>
        `).join('');
        
        const hiddenItemsHTML = hiddenItems.length > 0 ? `
            <div class="hidden-content" id="hidden-content-${section.id}">
                ${hiddenItems.map((item, index) => `
                    <div class="faq-box_content">
                        <div class="question no-select" role="button" tabindex="0" aria-expanded="false" aria-controls="answer-${section.id}-${index + 5}">
                            ${item.question}
                            <div class="accordion">
                                <div class="show-answer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="27" viewBox="0 0 32 27" fill="none">
                                        <path d="M16 27L0.41154 8.78301e-07L31.5885 3.60387e-06L16 27Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="answer" id="answer-${section.id}-${index + 5}" data-has-diagram="${item.diagram ? 'true' : 'false'}" data-diagram-path="${item.diagram || ''}">
                            ${item.diagram ? 
                              `<div class="answer-text">${item.answer}</div>
                               <div class="diagram-container" style="display: none;">
                                 <img src="../image/faq/${item.diagram}" alt="${item.question} diagram" class="diagram-image">
                               </div>
                               <button class="diagram-button">${item.button}</button>` 
                              : item.answer}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : '';
        
        const showMoreButton = hiddenItems.length > 0 ? `
            <div class="show-more-btn" data-target="hidden-content-${section.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
                    <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                </svg>
            </div>
        ` : '';
        
        const isActive = section.id === 1 ? 'active' : '';
        return `
            <div class="faq-box box${section.id} ${isActive}">
                <div class="faq-box_title no-select">
                    <h2>${section.title}</h2>
                </div>
                ${visibleItemsHTML}
                ${hiddenItemsHTML}
                ${showMoreButton}
            </div>
        `;
    }).join('');
}

function setupToggles() {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answerDiv = this.nextElementSibling;
            const arrow = this.querySelector('.show-answer svg');
            const isActive = answerDiv.classList.contains('active');
            
            // If there's an expanded fullscreen diagram, close it first
            const expandedDiagram = document.querySelector('.fullscreen-diagram');
            if (expandedDiagram) {
                closeDiagramFullscreen();
            }
            
            const allAnswers = document.querySelectorAll('.answer.active');
            allAnswers.forEach(answer => {
                if (answer !== answerDiv) {
                    answer.classList.remove('active');
                    answer.style.display = 'none';
                    answer.style.height = '';
                    answer.style.visibility = 'hidden';
                    
                    const parentQuestion = answer.previousElementSibling;
                    if (parentQuestion && parentQuestion.querySelector('.show-answer svg')) {
                        gsap.to(parentQuestion.querySelector('.show-answer svg'), {
                            rotation: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                        parentQuestion.classList.remove('active');
                        parentQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            if (isActive) {
                gsap.to(answerDiv, {
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: function() {
                        answerDiv.classList.remove('active');
                        answerDiv.style.display = 'none';
                        answerDiv.style.height = '';
                        answerDiv.style.paddingTop = '';
                        answerDiv.style.paddingBottom = '';
                        answerDiv.style.visibility = 'hidden';
                    }
                });
            } else {
                answerDiv.classList.add('active');
                answerDiv.style.display = 'block';
                answerDiv.style.visibility = 'visible';
                answerDiv.style.height = 'auto';
                
                const height = answerDiv.offsetHeight;
                
                answerDiv.style.height = '0';
                answerDiv.style.paddingTop = '0';
                answerDiv.style.paddingBottom = '0';
                
                gsap.to(answerDiv, {
                    height: height,
                    paddingTop: 15,
                    paddingBottom: 15,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: function() {
                        answerDiv.style.height = 'auto';
                        
                        const parentHiddenContent = answerDiv.closest('.hidden-content');
                        if (parentHiddenContent && parentHiddenContent.classList.contains('visible')) {
                            parentHiddenContent.style.height = 'auto';
                            
                            setTimeout(() => {
                                parentHiddenContent.style.height = 'auto';
                            }, 50);
                        }
                    }
                });
            }
            
            gsap.to(arrow, {
                rotation: isActive ? 0 : -90,
                duration: 0.1,
                ease: "power2.out"
            });
            
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
        });

        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    const showMoreButtons = document.querySelectorAll('.show-more-btn');
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const isExpanded = this.classList.contains('expanded');
            
            if (isExpanded) {
                gsap.to(targetContent, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: function() {
                        targetContent.classList.remove('visible');
                        targetContent.style.height = "0";
                        targetContent.style.overflow = "hidden";
                    }
                });
                
                gsap.to(this.querySelector('svg'), {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                targetContent.classList.add('visible');
                
                gsap.set(targetContent, {
                    opacity: 1,
                    height: "auto",
                    overflow: "visible"
                });
        
                const height = targetContent.scrollHeight;
                
                gsap.fromTo(targetContent, 
                    { height: 0, overflow: "hidden" },
                    { 
                        height: height,
                        duration: 0.5,
                        ease: "power2.out",
                        onComplete: function() {
                            targetContent.style.height = "auto";
                            targetContent.style.overflow = "visible"; 
                        }
                    }
                );
                
                gsap.to(this.querySelector('svg'), {
                    rotation: 180,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            this.classList.toggle('expanded');
        });
    });

    // Set up diagram button listeners
    setupDiagramButtons();
}

function setupDiagramButtons() {
    const diagramButtons = document.querySelectorAll('.diagram-button');
    
    diagramButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerDiv = this.closest('.answer');
            const questionDiv = answerDiv.previousElementSibling;
            const diagramContainer = answerDiv.querySelector('.diagram-container');
            
            // Hide the FAQ container content
            const faqContainer = document.querySelector('#container');
            if (faqContainer) {
                faqContainer.style.display = 'none'; // Ẩn #container
            }
            
            // Store original position and state
            const originalContainer = document.querySelector('.faq-container_content');
            const originalPosition = originalContainer ? originalContainer.getBoundingClientRect() : null;
            
            // Get header height
            const header = document.querySelector('#header');
            const headerHeight = header ? header.offsetHeight : 80;
            
            // Create fullscreen overlay if it doesn't exist
            if (!document.querySelector('.fullscreen-diagram')) {
                const fullscreenDiv = document.createElement('div');
                fullscreenDiv.className = 'fullscreen-diagram';
                fullscreenDiv.innerHTML = `
                    <div class="fullscreen-content">
                        <div class="question-display">${questionDiv.textContent.trim()}</div>
                        <div class="diagram-display">
                            <img src="${diagramContainer.querySelector('img').src}" alt="Diagram" class="fullscreen-image">
                            <button class="close-fullscreen-btn">Close</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(fullscreenDiv);
                
                // Set up close button
                const closeButton = fullscreenDiv.querySelector('.close-fullscreen-btn');
                closeButton.addEventListener('click', closeDiagramFullscreen);
                
                // Get the original width of the FAQ container to maintain it
                const originalWidth = originalContainer ? originalContainer.offsetWidth : 'auto';
                
                // Apply fixed positioning styles
                const fullscreenContent = fullscreenDiv.querySelector('.fullscreen-content');
                fullscreenContent.style.position = 'fixed';
                fullscreenContent.style.top = headerHeight + 'px';
                fullscreenContent.style.bottom = '32px';
                fullscreenContent.style.left = '0';
                fullscreenContent.style.right = '0';
                fullscreenContent.style.margin = '0 auto';
                fullscreenContent.style.maxWidth = '60%';
                fullscreenContent.style.zIndex = '999999';
                fullscreenContent.style.backgroundColor = 'rgba(58, 58, 58, 0.10)';
                
                // Update fullscreen-diagram styles
                fullscreenDiv.style.top = headerHeight + 'px';
                fullscreenDiv.style.height = `calc(100% - ${headerHeight}px)`;
                
                // Animation sequence
                gsap.fromTo(fullscreenDiv, 
                    { opacity: 0 },
                    { opacity: 1, duration: .5, ease: "power2.out" }
                );
                
                gsap.fromTo(fullscreenContent, 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
                
                // Delay the image display for the slide-in effect
                const diagramImage = fullscreenDiv.querySelector('.fullscreen-image');
                gsap.fromTo(diagramImage, 
                    { y: -300, opacity: 0, scale: 1 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", delay: 0.3 }
                );
                
                // Disable scrolling on the body
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

function closeDiagramFullscreen() {
    const fullscreenDiv = document.querySelector('.fullscreen-diagram');
    if (fullscreenDiv) {
        // First animate the content sliding out
        const fullscreenContent = fullscreenDiv.querySelector('.fullscreen-content');
        const diagramImage = fullscreenDiv.querySelector('.fullscreen-image');
        
        // First animate the image fading out
        gsap.to(diagramImage, {
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Then animate the content sliding down
        gsap.to(fullscreenContent, {
            y: 50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.1
        });
        
        // Finally fade out the overlay and remove it
        gsap.to(fullscreenDiv, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            delay: 0.1,
            onComplete: function() {
                fullscreenDiv.remove();
                // Re-enable scrolling
                document.body.style.overflow = '';
                // Show the FAQ container content again
                const faqContainer = document.querySelector('#container');
                if (faqContainer) {
                    faqContainer.style.display = ''; 
                }
            }
        });
    }
}

function reInitShowMoreButtons() {
    const showMoreButtons = document.querySelectorAll('.show-more-btn');
    
    showMoreButtons.forEach(button => {
        const targetId = button.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        const isContentVisible = targetContent && 
                               targetContent.classList.contains('visible') && 
                               targetContent.offsetHeight > 0;
        
        if (isContentVisible) {
            button.classList.add('expanded');
            gsap.set(button.querySelector('svg'), {
                rotation: 180
            });
        } else {
            button.classList.remove('expanded');
            gsap.set(button.querySelector('svg'), {
                rotation: 0
            });
        }
    });
}

function switchBox(boxId) {
    const allBoxes = document.querySelectorAll('.faq-box');
    allBoxes.forEach(box => {
        box.classList.remove('active');
    });
    
    const selectedBox = document.querySelector(`.box${boxId}`);
    if (selectedBox) {
        selectedBox.classList.add('active');
    }
    
    reInitShowMoreButtons();
}

function setupCategoryNav() {
    const navLinks = document.querySelectorAll('.category-nav a');
    const categoryItems = document.querySelectorAll('.category-nav div');
    
    if (!navLinks.length || !categoryItems.length) {
        console.error('Category navigation links or items not found');
        return;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetClass = this.getAttribute('data-target');

            console.log(`Nav clicked: targetClass=${targetClass}`); // Debug

            const fullscreenDiv = document.querySelector('.fullscreen-diagram');
            if (fullscreenDiv) {
                console.log('Closing fullscreen diagram');
                closeDiagramFullscreen();
            }

            document.querySelectorAll('.show-more-btn').forEach(button => {
                button.classList.remove('expanded');
                gsap.to(button.querySelector('svg'), {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            document.querySelectorAll('.hidden-content').forEach(content => {
                content.classList.remove('visible');
                gsap.to(content, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: function() {
                        content.style.height = "0";
                        content.style.overflow = "hidden";
                    }
                });
            });

            document.querySelectorAll('.faq-box').forEach(box => {
                box.classList.remove('active');
            });
            const targetBox = document.querySelector(`.faq-box.${targetClass}`);
            if (targetBox) {
                console.log(`Activating box: .faq-box.${targetClass}`);
                targetBox.classList.add('active');
                
                if (window.innerWidth > 641) {
                    const headerHeight = document.querySelector('#header').offsetHeight || 0;
                    console.log(`Scrolling to box, headerHeight=${headerHeight}`);
                    window.scrollTo({
                        top: targetBox.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                        behavior: 'smooth'
                    });
                } else {
                    console.log('Mobile detected, skipping scroll');
                }
            } else {
                console.error(`Target box not found: .faq-box.${targetClass}`);
            }
            
            categoryItems.forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            const categoryNav = document.getElementById('category-nav');
            if (categoryNav) {
                console.log('Closing category nav');
                categoryNav.classList.remove('visible');
            }
            
            console.log('Reinitializing show more buttons');
            reInitShowMoreButtons();
        });
    });
}

function setupMenuToggle() {
    const navMenu = document.getElementById('nav-menu');
    const navFaq = document.getElementById('nav-faq');
    const categoryNav = document.getElementById('category-nav');
    const langSubmenu = document.getElementById('lang-submenu'); 

    if (!categoryNav) {
        console.error('Category navigation not found');
        return;
    }

    if (navMenu) {
        navMenu.addEventListener('click', function() {
            if (langSubmenu && !langSubmenu.classList.contains('hidden')) {
                langSubmenu.classList.add('hidden');
            }

            categoryNav.classList.toggle('visible');
            const isExpanded = categoryNav.classList.contains('visible');
            this.setAttribute('aria-expanded', isExpanded);
        });

        navMenu.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    }

    if (navFaq) {
        navFaq.addEventListener('click', function(event) {
            event.preventDefault();
            if (langSubmenu && !langSubmenu.classList.contains('hidden')) {
                langSubmenu.classList.add('hidden');
            }
            categoryNav.classList.toggle('visible');
        });
    }

    document.addEventListener('click', function(event) {
        if (navMenu && !navMenu.contains(event.target) && 
            navFaq && !navFaq.contains(event.target) && 
            !categoryNav.contains(event.target)) {
            categoryNav.classList.remove('visible');
            if (navMenu) {
                navMenu.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langSubmenu = document.getElementById('lang-submenu');
    const categoryNav = document.getElementById('category-nav');

    if (!langToggle || !langSubmenu) {
        console.error('Language toggle or submenu not found');
        return;
    }

    langToggle.addEventListener('click', function() {
        if (categoryNav && categoryNav.classList.contains('visible')) {
            categoryNav.classList.remove('visible');
        }

        langSubmenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!langToggle.contains(event.target) && !langSubmenu.contains(event.target)) {
            langSubmenu.classList.add('hidden');
        }
    });

    const langItems = document.querySelectorAll('.lang');
    langItems.forEach(lang => {
        lang.addEventListener('click', function() {
            langItems.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            langSubmenu.classList.add('hidden');
        });

        lang.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
}

function setupCloseButton() {
    const closeButton = document.querySelector('.close-btn_nav');
    const categoryNav = document.getElementById('category-nav');
    
    if (closeButton && categoryNav) {
        closeButton.addEventListener('click', function() {
            categoryNav.classList.remove('visible');
        });
        
        closeButton.setAttribute('tabindex', '0');
        closeButton.setAttribute('role', 'button');
        closeButton.setAttribute('aria-label', 'Close navigation menu');
        
        closeButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                categoryNav.classList.remove('visible');
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.faq-container_content');
    if (container) {
        container.innerHTML = renderFAQSections();
        setupToggles();
        setupCategoryNav();
        setupMenuToggle();
        setupLanguageToggle();
        setupCloseButton();
    } else {
        console.error('FAQ container not found');
    }
});