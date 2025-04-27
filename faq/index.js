const faqData = [
  {
    title: "Event Sourcing & Preparation",
    id: 1,
    items: [
      {
        question: "For Event Sourcing & Preparation?",
        answer: "Karma Today identifies donation events from around the world, and the community can also submit events."
      },
      {
        question: "Once an event is in the candidate list?",
        answer: "Karma Today will conduct research on the proof method to verify the completeness of the event (in future)."
      },
      {
        question: "Is a Fraud?",
        answer: "If is a fraud, reject <br> Else then will grant authorization."
      },
      {
        question: "On chain donation?",
        answer: "If yes, Recipient wallet declaration & donator wallet declaration with proof method transaction hash."
      },
      {
        question: "Confirm payment method?",
        answer: "Organizer will verify."
      },
      {
        question: "What tools are recommended for implementing event sourcing?",
        answer: "If no, proof method: karma agent on spot <br> If yes, proof method: provided by organizer."
      },
    ]
  },
  {
    title: "Witness & Minting",
    id: 2,
    items: [
      {
        question: "After receiving authorization and confirming the donation verification method?",
        answer: "Karma Today is ready to witness the donation event."
      },
      {
        question: "Once the event is completed?",
        answer: "Karma Today calculates the number of tokens to be minted based on the donation value (in USD) and the Karma token minting curve."
      },
      {
        question: "Karma declaration for event participation?",
        answer: "When event start."
      },
      {
        question: "Proof method? ",
        answer: "Karma agent on spot. <br> Provided by organizer. <br> Transaction hash"
      },
      {
        question: "Proof method Karma agent on spot & Provided by organizer?",
        answer: "Record the event and donation."
      },
      {
        question: "Proof method transaction?",
        answer: "Hash record the transaction and proof complete."
      },
      {
        question: "Record the event?",
        answer: "If donate in cash yes, proof complete. <br> If no, Wait for transfer receipt"
      },
      {
        question: "Proof complete?",
        answer: "Mint Karma and declare the completion of the event."
      },
    ]
  },
  {
    title: "Allocation",
    id: 3,
    items: [
      {
        question: "According to the white paper, the token allocation will be?",
        answer: "30% to the Donor <br> 0% to the Beneficiary <br> 5% to the Organizer (if none, this portion is split between the Donor and Beneficiary) <br> 25% to the Team <br> 5% to Ecosystem Development <br> 15% to the Charity Fund <br> 10% to Liquidity"
      },
      {
        question: "A separate agreement?",
        answer: "Karma Today will sign a separate agreement for each event, specifying the token release schedule based on the donation amount."
      },
      {
        question: "For smaller donations?",
        answer: "For smaller donations tokens may be released immediately."
      },
      {
        question: "While larger donations ?",
        answer: "Larger donations will follow a cliff and linear vesting schedule."
      },
      {
        question: "Karma Token?",
        answer: "Wait for All Parties to Provide Their Addresses "
      },
      {
        question: "Address Provided?",
        answer: "Compile the Agreement into Smart Contract Storage after Immediately Relate Portion"
      },
      {
        question: "Address Not Provided?",
        answer: "Voluntarily Donate to Charity Fund after Release in Each Cycle or Wait for 30 days, if still not provided, automatically donate to charity fund."
      },
      {
        question: "Tokens allocated to the Charity Fund and Liquidity?",
        answer: "Tokens allocated to the Charity Fund and Liquidity will be released immediately, as they do not directly impact the token price."
      }
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="27" viewBox="0 0 32 27" fill="none">
                                <path d="M16 27L0.41154 8.78301e-07L31.5885 3.60387e-06L16 27Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="answer" id="answer-${section.id}-${index}">
                    ${item.answer}
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
                        <div class="answer" id="answer-${section.id}-${index + 5}">
                            ${item.answer}
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
            const isExpanded = answerDiv.classList.toggle('active');
            
            this.classList.toggle('active');
            arrow.classList.toggle('rotate');
            this.setAttribute('aria-expanded', isExpanded);
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
            
            targetContent.classList.toggle('visible');
            this.classList.toggle('expanded');
        });
    });
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

            document.querySelectorAll('.show-more-btn').forEach(button => {
                button.classList.remove('expanded');
            });
            document.querySelectorAll('.hidden-content').forEach(content => {
                content.classList.remove('visible');
            });

            document.querySelectorAll('.faq-box').forEach(box => {
                box.classList.remove('active');
            });
            
            const targetBox = document.querySelector(`.faq-box.${targetClass}`);
            if (targetBox) {
                targetBox.classList.add('active');
                const headerHeight = document.querySelector('#header').offsetHeight || 0;
                window.scrollTo({
                    top: targetBox.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Target box not found: .faq-box.${targetClass}`);
            }
            
            categoryItems.forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            const categoryNav = document.getElementById('category-nav');
            if (categoryNav) {
                categoryNav.classList.remove('visible');
            }
        });
    });
}

function setupMenuToggle() {
    const navMenu = document.getElementById('nav-menu');
    const navFaq = document.getElementById('nav-faq');
    const categoryNav = document.getElementById('category-nav');
    const langSubmenu = document.getElementById('lang-submenu'); // thêm dòng này

    if (!categoryNav) {
        console.error('Category navigation not found');
        return;
    }

    if (navMenu) {
        navMenu.addEventListener('click', function() {
            // Đóng lang-submenu nếu đang mở
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
    const categoryNav = document.getElementById('category-nav'); // thêm dòng này

    if (!langToggle || !langSubmenu) {
        console.error('Language toggle or submenu not found');
        return;
    }

    langToggle.addEventListener('click', function() {
        // Đóng category-nav nếu đang mở
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
        
        // Add keyboard accessibility
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

// Add this function call to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.faq-container_content');
    if (container) {
        container.innerHTML = renderFAQSections();
        setupToggles();
        setupCategoryNav();
        setupMenuToggle();
        setupLanguageToggle();
        setupCloseButton(); // Add this new function call
    } else {
        console.error('FAQ container not found');
    }
});