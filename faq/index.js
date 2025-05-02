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
            question: "What is the Karma Wallet?",
            answer: "A self-custody app that lets users store Karma, chat with other participants, convert crypto to fiat after KYC, and spend via virtual or physical debit cardsd-all while displaying donation proofs and reputation updates."
          },
        {
          question: "Why base minting on donations?",
          answer: "Real-world donations are transparent, measurable, and verifiable. Tying every token to a documented act of giving anchors the project in genuine goodwill and removes any “pay-to-mint” dynamic."
        },
        {
          question: "How areFerrari donation events sourced?",
          answer: "Karma.Today identifies donation events worldwide, and community members can also nominate events. Once an event is added to the candidate list, Karma.Today researches the appropriate proof methods to fully verify it.",
          button: 'Click to see',
          diagram: "diag1.png"
        },
          {
            question: "What tools are recommended for implementing event sourcing?",
            answer: "If no, proof method: karma agent on spot <br> If yes, proof method: provided by organizer."
          },
          {
            question: "How does NFT governance work?",
            answer: "Charity Guardian NFTs act as voting badges. One NFT equals one irrevocable vote. A proposal passes only if it wins the tally and more than one-third of all NFTs participate, preventing low-turnout capture."
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
          {
            question: "Once the event is completed?",
            answer: "Karma Today calculates the number of tokens to be minted based on the donation value (in USD) and the Karma token minting curve."
          },
          {
            question: "Record the event?",
            answer: "If donate in cash yes, proof complete. <br> If no, Wait for transfer receipt"
          },
          {
            question: "How do I track progress?",
            answer: "Every mint, fund movement, and governance vote is recorded on-chain for anyone to audit. The team also publishes concise public summaries after each verified donation event, so supporters can follow impact in real time."
        },
      ]
    },
    {
      title: "Allocation",
      id: 3,
      items: [
        {
            question: "How are newly minted tokens split?",
            answer: " ● 30 % to donors-rewarding the people who gave. <br> ● 10 % to beneficiariesd-letting recipients hold a transparent record of support. <br> ● 5 % to organizersd-covering the work of platforms or charities that coordinated the drive. <br> ● 25 % to the core teamd-funding development, audits, operations, and outreach. <br> ● 5 % to ecosystem developersd-grants and bounties for builders expanding Karma tooling. <br> ● 15 % to the Charity Fundd-a community-governed treasury for future good-cause projects. <br> ● 10 % to liquidity managementd-used later to create healthy on-chain markets.",
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
          question: "Are voters rewarded?",
          answer: "Casting a vote counts as a good deed. Guardians may receive surprise Karma airdrops or reputation boosts, but because timing and size are unpredictable, there's no incentive to farm the system."
        },
        {
          question: "What is the reputation system?",
          answer: "A forthcoming on-chain score that tracks lifetime Karma earned, governance participation, and verified volunteer workd-providing a non-financial “social credit” signal for individuals and organizations"
        },
        {
            question: "How can I get involved?",
            answer: "● Developers can apply for grants from the ecosystem pool to build tools, analytics, or integrations. <br> ● Non-profits can request Charity Fund grants by submitting proposals for the weekly vote. <br> ● Volunteers can earn Karma by auditing smart contracts, moderating communities, or helping with events"
        },

      ]
    }
];

function renderFAQSections() {
    // Only show box1 initially, others will be revealed with "Show More"
    const html = faqData.map((section, sectionIndex) => {
        // Show all items per box as specified (6-7 items)
        const itemsHTML = section.items.map((item, index) => `
            <div class="faq-box_content">
                <div class="question no-select" role="button" tabindex="0" aria-expanded="false" aria-controls="answer-${section.id}-${index}">
                    ${item.question}
                    <div class="accordion">
                        <div class="show-answer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#fff" d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645" />
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
                       <div class="diagram-btn"><button class="diagram-button">${item.button}</button></div>
                       ` 
                      : item.answer}
                </div>
            </div>
        `).join('');
        
        // Add Show More button after Box 1 to show Box 2
        const showMoreButton = sectionIndex === 0 ? `
            <div class="show-more-btn" id="toggle-box2-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
                    <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                </svg>
            </div>
        ` : '';

        // Add Show More button after Box 2 to show Box 3
        const showBox3Button = sectionIndex === 1 ? `
            <div class="show-more-btn" id="toggle-box3-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
                    <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                </svg>
            </div>
        ` : '';

        // Add Hide All button after Box 3
        const hideAllButton = sectionIndex === 2 ? `
            <div class="show-more-btn" id="hide-boxes-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none" style="transform: rotate(180deg);">
                    <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                </svg>
            </div>
        ` : '';
        
        // Only first box is visible initially
        const displayStyle = section.id === 1 ? 'flex' : 'none';
        
        return `
            <div class="faq-box box${section.id}" style="display: ${displayStyle}">
                <div class="faq-box_title no-select">
                    <h2>${section.title}</h2>
                </div>
                ${itemsHTML}
                ${showMoreButton}
                ${showBox3Button}
                ${hideAllButton}
            </div>
        `;
    }).join('');
    
    return html;
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
            
            // Close any open answers
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
                // Close the answer if it's active
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
                // Open the answer if it's not active
                answerDiv.classList.add('active');
                answerDiv.style.display = 'flex';
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
                    }
                });
            }
            
            // Rotate the arrow
            gsap.to(arrow, {
                rotation: isActive ? 0 : -90,
                duration: 0.1,
                ease: "power2.out"
            });
            
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
        });

        // Enable keyboard navigation
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    // Set up the buttons for toggling boxes
    setupBoxToggleButtons();

    // Set up diagram button listeners
    setupDiagramButtons();
}

function setupBoxToggleButtons() {
    // Track visibility states
    let box2Visible = false;
    let box3Visible = false;

    // Get header height for offset calculation
    const header = document.querySelector('#header');
    const headerHeight = header ? header.offsetHeight : 80; // Default to 80px if no header

    // 1. Toggle button for Box 2 (in Box 1)
    const toggleBox2Btn = document.getElementById('toggle-box2-btn');
    if (toggleBox2Btn) {
        toggleBox2Btn.addEventListener('click', function() {
            const box2 = document.querySelector('.box2');
            const toggleBox3Btn = document.getElementById('toggle-box3-btn');

            if (box2 && !box2Visible) {
                box2.style.display = 'flex';
                
                gsap.fromTo(box2, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
                
                // Ensure toggle-box3-btn is visible when box2 is shown
                if (toggleBox3Btn) {
                    toggleBox3Btn.style.display = 'flex';
                    toggleBox3Btn.style.opacity = '1';
                    toggleBox3Btn.style.height = 'auto';
                }
                
                // Scroll to box2 with larger offset
                setTimeout(() => {
                    window.scrollTo({
                        top: box2.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }, 100);
                
                // Hide this button after showing box2
                gsap.to(this, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        this.style.display = 'none';
                        box2Visible = true;
                    }
                });
            }
        });
    }
    
    // 2. Toggle button for Box 3 (in Box 2)
    const toggleBox3Btn = document.getElementById('toggle-box3-btn');
    if (toggleBox3Btn) {
        toggleBox3Btn.addEventListener('click', function() {
            const box3 = document.querySelector('.box3');
            
            if (box3 && !box3Visible) {
                box3.style.display = 'flex';
                
                gsap.fromTo(box3, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
                
                // Scroll to box3 with larger offset
                setTimeout(() => {
                    window.scrollTo({
                        top: box3.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }, 100);
                
                // Hide this button after showing box3
                gsap.to(this, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        this.style.display = 'none';
                        box3Visible = true;
                    }
                });
            }
        });
    }
    
    // 3. Hide All button (in Box 3)
    const hideBoxesBtn = document.getElementById('hide-boxes-btn');
    if (hideBoxesBtn) {
        hideBoxesBtn.addEventListener('click', function() {
            const box2 = document.querySelector('.box2');
            const box3 = document.querySelector('.box3');
            const toggleBox2Btn = document.getElementById('toggle-box2-btn');
            const toggleBox3Btn = document.getElementById('toggle-box3-btn');
            
            // Hide box2 and box3 simultaneously
            if (box2 && box3 && (box2Visible || box3Visible)) {
                gsap.to([box2, box3], {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: "sine.out",
                    onComplete: function() {
                        if (box2) {
                            box2.style.display = 'none';
                            box2Visible = false;
                        }
                        if (box3) {
                            box3.style.display = 'none';
                            box3Visible = false;
                        }
                        
                        // Show the toggle-box2-btn again
                        if (toggleBox2Btn) {
                            toggleBox2Btn.style.display = 'flex';
                            toggleBox2Btn.style.opacity = '0';
                            toggleBox2Btn.style.height = 'auto';
                            gsap.to(toggleBox2Btn, {
                                opacity: 1,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                        
                        // Reset toggle-box3-btn to be visible when box2 is shown again
                        if (toggleBox3Btn) {
                            toggleBox3Btn.style.display = 'flex';
                            toggleBox3Btn.style.opacity = '1';
                            toggleBox3Btn.style.height = 'auto';
                        }
                    }
                });
            }
            
            // Scroll back to top of box1 after animation completes
            setTimeout(() => {
                window.scrollTo({
                    top: document.querySelector('.box1').offsetTop - headerHeight - 100,
                    behavior: 'smooth'
                });
            }, 600);
        });
    }
}

function setupDiagramButtons() {
    const diagramButtons = document.querySelectorAll('.diagram-button');
    
    diagramButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerDiv = this.closest('.answer');
            const questionDiv = answerDiv.previousElementSibling;
            const diagramContainer = answerDiv.querySelector('.diagram-container');
            
            // Hide the FAQ container content
            const faqContainer = document.querySelector('#container-f');
            if (faqContainer) {
                faqContainer.style.display = 'none';
            }
            
            // Apply is-fixed class to main for all viewports
            const mainElement = document.querySelector('#header');
            if (mainElement) {
                mainElement.classList.add('is-fixed');
            }
            
            // Get header height
            const header = document.querySelector('#header');
            const headerHeight = header ? header.offsetHeight : 80;
            
            // Add overlay to prevent seeing content behind the diagram
            const overlay = document.createElement('div');
            overlay.className = 'fullscreen-overlay';
            document.body.appendChild(overlay);
            
            // Add class to body
            document.body.classList.add('fullscreen-active');
            
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
                
                // Apply fixed positioning styles
                const fullscreenContent = fullscreenDiv.querySelector('.fullscreen-content');
                fullscreenContent.style.position = 'fixed';
                fullscreenContent.style.top = headerHeight + 'px';
                fullscreenContent.style.bottom = '32px';
                fullscreenContent.style.left = '0';
                fullscreenContent.style.right = '0';
                fullscreenContent.style.margin = '0 auto';
                fullscreenContent.style.maxWidth = window.innerWidth <= 640 ? '95%' : '60%';
                fullscreenContent.style.zIndex = '10005';
                fullscreenContent.style.borderRadius = '8px';
                fullscreenContent.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.4)';
                
                // Update fullscreen-diagram styles
                fullscreenDiv.style.position = 'fixed';
                fullscreenDiv.style.top = '0';
                fullscreenDiv.style.left = '0';
                fullscreenDiv.style.width = '100%';
                fullscreenDiv.style.height = '100%';
                fullscreenDiv.style.zIndex = '10004';
                
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
    const overlay = document.querySelector('.fullscreen-overlay');
    
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
                
                // Remove overlay
                if (overlay) {
                    overlay.remove();
                }
                
                // Remove class from body
                document.body.classList.remove('fullscreen-active');
                
                // Remove is-fixed class from main
                const mainElement = document.querySelector('#header');
                if (mainElement) {
                    mainElement.classList.remove('is-fixed');
                }
                
                // Re-enable scrolling
                document.body.style.overflow = '';
                
                // Show the FAQ container content again
                const faqContainer = document.querySelector('#container-f');
                if (faqContainer) {
                    faqContainer.style.display = ''; 
                }
            }
        });
    }
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langSubmenu = document.getElementById('lang-submenu');

    if (!langToggle || !langSubmenu) {
        console.error('Language toggle or submenu not found');
        return;
    }

    langToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        langSubmenu.classList.toggle('hidden');
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

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.faq-container_content');
    if (container) {
        container.innerHTML = renderFAQSections();
        setupToggles();
        setupLanguageToggle();
    } else {
        console.error('FAQ container not found');
    }
});