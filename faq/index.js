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
        answer: "Karma Today calculates the number of tokens to be minted based on the donation value (in USD)  and the Karma token minting curve."
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
        const itemsHTML = section.items.map(item => `
            <div class="faq-box_content">
                <div class="question no-select">
                    ${item.question}
                    <div class="accordion">
                        <div class="show-answer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                                <path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="answer">
                    ${item.answer}
                </div>
            </div>
        `).join('');

        return `
            <div class="faq-box box${section.id}">
                <div class="faq-box_title no-select">
                    <h2>${section.title}</h2>
                </div>
                ${itemsHTML}
            </div>
        `;
    }).join('');
}

// Add event listeners to make questions clickable
function setupToggles() {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answerDiv = this.nextElementSibling;
            const arrow = this.querySelector('.show-answer svg');
            
            answerDiv.classList.toggle('active');
            arrow.classList.toggle('rotate');
            this.classList.toggle('active');
        });
    });
}

// Add event listeners for category navigation scrolling
function setupCategoryNav() {
    const navLinks = document.querySelectorAll('.category-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetClass = this.getAttribute('data-target');
            const targetBox = document.querySelector(`.faq-box.${targetClass}`);
            
            if (targetBox) {
                targetBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Execute when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.faq-container_content');
    if (container) {
        container.innerHTML = renderFAQSections();
        setupToggles();
        setupCategoryNav();
    } else {
        console.error('FAQ container not found');
    }
});