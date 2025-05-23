import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import logo from '/images/logo.png';
import './faq.css';
import faqData from '../../data/faqData'
function FAQ() {
  const [activeAnswers, setActiveAnswers] = useState(new Set());
  const [fullscreenDiagram, setFullscreenDiagram] = useState(null);
  const [language, setLanguage] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  // Store the scroll position when opening fullscreen diagram
  const scrollPositionRef = useRef(0);
  // Store the active section when opening fullscreen diagram
  const activeSectionRef = useRef(1);
  //img url
  const diagramImages = {
    'diag1.png': new URL('/images/faq/diag1.png', import.meta.url).href,
    'diag2.png': new URL('/images/faq/diag2.png', import.meta.url).href,
    'diag3.png': new URL('/images/faq/diag3.png', import.meta.url).href,
  };
  // Handle click outside to close language menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#lang-toggle') && !e.target.closest('.lang')) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key to close fullscreen diagram
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && fullscreenDiagram) {
        closeDiagramFullscreen();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [fullscreenDiagram]);

  const toggleQuestion = (sectionId, itemIndex) => {
    const key = `${sectionId}-${itemIndex}`;
    const answerEl = document.getElementById(`answer-${sectionId}-${itemIndex}`);
    const arrowEl = document.querySelector(`#question-${sectionId}-${itemIndex} .show-answer svg`);
    
    if (!answerEl) return;

    if (activeAnswers.has(key)) {
      // Close the answer
      gsap.to(answerEl, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          answerEl.style.display = 'none';
          answerEl.style.visibility = 'hidden';
          const newSet = new Set(activeAnswers);
          newSet.delete(key);
          setActiveAnswers(newSet);
        }
      });

      // Rotate arrow back
      gsap.to(arrowEl, {
        rotation: 0,
        duration: 0.1,
        ease: "power2.out"
      });
    } else {
      // Open the answer - improved calculation
      answerEl.style.display = 'flex';
      answerEl.style.visibility = 'visible';
      answerEl.style.height = 'auto';
      answerEl.style.paddingTop = '15px';
      answerEl.style.paddingBottom = '15px';
      
      // Get the full height including padding
      const fullHeight = answerEl.offsetHeight;
      
      // Reset to zero for animation
      answerEl.style.height = '0px';
      answerEl.style.paddingTop = '0px';
      answerEl.style.paddingBottom = '0px';

      gsap.to(answerEl, {
        height: fullHeight,
        paddingTop: 15,
        paddingBottom: 15,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          answerEl.style.height = 'auto';
        }
      });

      // Rotate arrow
      gsap.to(arrowEl, {
        rotation: -90,
        duration: 0.1,
        ease: "power2.out"
      });

      setActiveAnswers(new Set(activeAnswers).add(key));
    }
  };

  const showBox = (boxId) => {
    const header = document.querySelector('#header');
    const headerHeight = header ? header.offsetHeight : 80;

    setActiveSection(boxId);

    setTimeout(() => {
      const boxElement = document.querySelector(`.box${boxId}`);
      if (boxElement) {
        window.scrollTo({
          top: boxElement.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const hideAllBoxes = () => {
    const header = document.querySelector('#header');
    const headerHeight = header ? header.offsetHeight : 80;

    setActiveSection(1);

    setTimeout(() => {
      const boxElement = document.querySelector('.box1');
      if (boxElement) {
        window.scrollTo({
          top: boxElement.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const showDiagramFullscreen = (sectionId, itemIndex) => {
    const section = faqData.find(s => s.id === sectionId);
    const item = section?.items[itemIndex];

    if (!item || !item.diagram) return;

    // Save current scroll position before hiding container
    scrollPositionRef.current = window.scrollY;
    // Save current active section
    activeSectionRef.current = activeSection;

    const faqContainer = document.querySelector('#container-f');
    if (faqContainer) faqContainer.style.display = 'none';

    const header = document.querySelector('#header');
    if (header) header.classList.add('is-fixed');

    document.body.style.overflow = 'hidden';
    document.body.classList.add('fullscreen-active');

    setFullscreenDiagram({
      question: item.question,
      diagram: item.diagram,
      sectionId,
      itemIndex
    });
  };

  const closeDiagramFullscreen = () => {
    document.body.style.overflow = '';
    document.body.classList.remove('fullscreen-active');

    const header = document.querySelector('#header');
    if (header) header.classList.remove('is-fixed');

    const faqContainer = document.querySelector('#container-f');
    if (faqContainer) {
      faqContainer.style.display = '';
      
      // First, restore the active section if needed
      if (activeSection !== activeSectionRef.current) {
        setActiveSection(activeSectionRef.current);
      }
      
      // Then restore scroll position with a delay to ensure DOM is updated
      setTimeout(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent animation
        });
      }, 0);
    }

    setFullscreenDiagram(null);
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  useEffect(() => {
    if (fullscreenDiagram) {
      const fullscreenDiv = document.querySelector('.fullscreen-diagram');
      const fullscreenContent = fullscreenDiv?.querySelector('.fullscreen-content');
      const diagramImage = fullscreenDiv?.querySelector('.fullscreen-image');

      if (fullscreenDiv && fullscreenContent && diagramImage) {
        gsap.fromTo(fullscreenDiv, 
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        gsap.fromTo(fullscreenContent, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        gsap.fromTo(diagramImage, 
          { y: -300, opacity: 0, scale: 1 },
          { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", delay: 0.3 }
        );
      }
    }
  }, [fullscreenDiagram]);

  return (
    <div id="main">
      <div id="header">
        <Link to="/" className="logo">
          <img src={logo} alt="karma-logo" loading="lazy" />
        </Link>
        <div className="nav">
          <div className="nav-faq" id="nav-faq">
            <div className="nav-language">
              <div id="lang-toggle" onClick={() => setShowLangMenu(!showLangMenu)}>
                Language
              </div>
              <div id="lang-submenu" className={showLangMenu ? "" : "hidden"}>
                <div 
                  data-lang="en" 
                  className={`lang ${language === 'en' ? 'active' : ''}`}
                  onClick={() => toggleLanguage('en')}
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleLanguage('en');
                    }
                  }}
                >
                  ENG
                </div>
                <div 
                  data-lang="cn" 
                  className={`lang ${language === 'cn' ? 'active' : ''}`}
                  onClick={() => toggleLanguage('cn')}
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleLanguage('cn');
                    }
                  }}
                >
                  汉语
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="container-f">
        <div className="faq-container">
          <div id="bg-tit">
            <h1>Frequently Asked Questions</h1>
          </div>
          <div className="faq-container_content">
            {faqData.map((section) => (
              <div 
                key={section.id}
                className={`faq-box box${section.id}`} 
                style={{ display: activeSection >= section.id ? 'flex' : 'none' }}
              >
                <div className="faq-box_title no-select">
                  <h2>{section.title}</h2>
                </div>
                
                {section.items.map((item, index) => (
                  <div className="faq-box_content" key={index}>
                    <div 
                      className={`question no-select ${activeAnswers.has(`${section.id}-${index}`) ? 'active' : ''}`}
                      id={`question-${section.id}-${index}`}
                      role="button" 
                      tabIndex="0" 
                      aria-expanded={activeAnswers.has(`${section.id}-${index}`) ? 'true' : 'false'} 
                      aria-controls={`answer-${section.id}-${index}`}
                      onClick={() => toggleQuestion(section.id, index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleQuestion(section.id, index);
                        }
                      }}
                    >
                      {item.question}
                      <div className="accordion">
                        <div className="show-answer">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24"
                          >
                            <path fill="#fff" d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="answer" 
                      id={`answer-${section.id}-${index}`} 
                      data-has-diagram={item.diagram ? 'true' : 'false'} 
                      data-diagram-path={item.diagram || ''}
                      style={{ 
                        display: 'none',
                        visibility: 'hidden',
                        height: '0',
                        paddingTop: '0',
                        paddingBottom: '0'
                      }}
                    >
                      {item.diagram ? (
                        <>
                          <div className="answer-text" dangerouslySetInnerHTML={{ __html: item.answer }} />
                          <div className="diagram-container" style={{ display: 'block' }}>
                            <img 
                              src={diagramImages[item.diagram]} 
                              alt={`${item.question} diagram`} 
                              className="diagram-image" 
                            />
                          </div>
                          <div className="diagram-btn">
                            <button 
                              className="diagram-button"
                              onClick={() => showDiagramFullscreen(section.id, index)}
                            >
                              {item.button}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                      )}
                    </div>
                  </div>
                ))}
                
                {section.id === 1 && activeSection === 1 && (
                  <div 
                    className="show-more-btn" 
                    id="toggle-box2-btn"
                    onClick={() => showBox(2)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
                      <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                    </svg>
                  </div>
                )}
                
                {section.id === 2 && activeSection === 2 && (
                  <div 
                    className="show-more-btn" 
                    id="toggle-box3-btn"
                    onClick={() => showBox(3)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
                      <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                    </svg>
                  </div>
                )}
                
                {section.id === 3 && activeSection === 3 && (
                  <div 
                    className="show-more-btn" 
                    id="hide-boxes-btn"
                    onClick={hideAllBoxes}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none" style={{ transform: 'rotate(180deg)' }}>
                      <path d="M17.2322 31.7678C18.2085 32.7441 19.7915 32.7441 20.7678 31.7678L36.6777 15.8579C37.654 14.8816 37.654 13.2986 36.6777 12.3223C35.7014 11.346 34.1184 11.346 33.1421 12.3223L19 26.4645L4.85786 12.3223C3.88155 11.346 2.29864 11.346 1.32233 12.3223C0.346019 13.2986 0.346019 14.8816 1.32233 15.8579L17.2322 31.7678ZM19 0L16.5 -1.09278e-07L16.5 30L19 30L21.5 30L21.5 1.09278e-07L19 0Z" fill="white"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fullscreen Diagram */}
      {fullscreenDiagram && (
        <>
          <div className="fullscreen-overlay"></div>
          <div className="fullscreen-diagram">
            <div className="fullscreen-content">
              <div className="question-display">{fullscreenDiagram.question}</div>
              <div className="diagram-display">
                <img 
                  src={diagramImages[fullscreenDiagram.diagram]} 
                  alt="Diagram" 
                  className="fullscreen-image" 
                />
                <button 
                  className="close-fullscreen-btn"
                  onClick={closeDiagramFullscreen}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FAQ;