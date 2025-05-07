const faqData = [
  {
    title: "Event Sourcing & Preparation",
    id: 1,
    items: [
      {
        question: "What is Karma?",
        answer: "Karma is a non-financial digital token whose only purpose is to acknowledge charitable acts. It is never marketed as an investment or used for speculation-think of it as a permanent, blockchain-based “thank-you note.”"
      },
      {
          question: "What is the Karma Wallet?",
          answer: "A self-custody app that lets users store Karma, chat with other participants, convert crypto to fiat after KYC, and spend via virtual or physical debit cards-all while displaying donation proofs and reputation updates."
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
          answer: " ● 30 % to donors-rewarding the people who gave. <br> ● 10 % to beneficiaries-letting recipients hold a transparent record of support. <br> ● 5 % to organizers-covering the work of platforms or charities that coordinated the drive. <br> ● 25 % to the core team-funding development, audits, operations, and outreach. <br> ● 5 % to ecosystem developers-grants and bounties for builders expanding Karma tooling. <br> ● 15 % to the Charity Fund-a community-governed treasury for future good-cause projects. <br> ● 10 % to liquidity management-used later to create healthy on-chain markets.",
          button: 'Click to see',
          diagram: "diag3.png"
      },
      {
        question: "Why isn't Karma a security?",
        answer: "You can't buy tokens directly; they appear only after a donation. There is no pre-mine, no dividend, and no expectation of profit-only recognition and governance privileges."
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
        answer: "A forthcoming on-chain score that tracks lifetime Karma earned, governance participation, and verified volunteer work-providing a non-financial “social credit” signal for individuals and organizations"
      },
      {
          question: "How can I get involved?",
          answer: "● Developers can apply for grants from the ecosystem pool to build tools, analytics, or integrations. <br> ● Non-profits can request Charity Fund grants by submitting proposals for the weekly vote. <br> ● Volunteers can earn Karma by auditing smart contracts, moderating communities, or helping with events"
      },

    ]
  }
];
export default faqData;