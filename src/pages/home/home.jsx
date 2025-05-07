import { useState, useEffect, useRef } from 'react';
import logo from '../../../public/images/logo.png';
import Sun from '../../../public/images/Sun.png';
import SunMb from '../../../public/images/mb/Sun.png';
import mountain from '../../../public/images/mountain.png';
import mountainMb from '../../../public/images/mb/mountain.png';
import bg from '../../../public/images/background.png';
import './home.css';
import { Link } from 'react-router-dom';

import HomeContentEng from './homeContentEng/homeContentEng'; 
import HomeContentCn from './homeContentCn/homeContentCn'; 

function Home() {
    const [selectedLang, setSelectedLang] = useState('en');
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const svgRef = useRef(null);
    const intervalRef = useRef(null);
    const timerRef = useRef(null);
  
    const handleLangToggle = () => {
      setIsSubmenuOpen(!isSubmenuOpen);
    };
  
    const handleLangSelect = (lang) => {
      setSelectedLang(lang);
      setIsSubmenuOpen(false);
    };
  
    useEffect(() => {
      const fakeData = 10; // Input data
  
      const validateData = (data) => {
        if (typeof data !== 'number' || isNaN(data) || data < 0 || data > 100) {
          console.log('invalid data');
          return false;
        }
        return true;
      };
  
      const setupSvgAnimation = () => {
        const svg = svgRef.current;
        if (!svg) {
          console.error('SVG element not found');
          return;
        }
  
        const paths = svg.querySelectorAll('path');
        const totalPaths = paths.length;
  
        if (totalPaths === 0) {
          console.error('No paths found in SVG');
          return;
        }
  
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('font-size', '22');
        text.setAttribute('font-family', 'arial');
        text.setAttribute('fill', 'white');
        text.setAttribute('dominant-baseline', 'middle');
        svg.appendChild(text);
  
        if (!validateData(fakeData)) {
          const pathData = Array.from(paths).map((path, index) => {
            const bbox = path.getBBox();
            return {
              index,
              bbox,
              xCenter: bbox.x + bbox.width / 2,
            };
          });
  
          let sortedPathData = [...pathData];
          const firstX = pathData[0].xCenter;
          const lastX = pathData[totalPaths - 1].xCenter;
          if (lastX < firstX) {
            sortedPathData.reverse();
          } else {
            sortedPathData.sort((a, b) => a.index - b.index);
          }
  
          const firstPathBbox = sortedPathData[0].bbox;
          const midX = firstPathBbox.x + firstPathBbox.width / 2 - 15;
          const midY = firstPathBbox.y - 20;
          text.setAttribute('x', midX);
          text.setAttribute('y', midY);
          text.textContent = '0%';
          return;
        }
  
        const pathData = Array.from(paths).map((path, index) => {
          const bbox = path.getBBox();
          const length = path.getTotalLength();
          if (isNaN(length) || length <= 0) {
            console.warn(`Path ${index} length not found: ${length}`);
          }
          const d = path.getAttribute('d');
          return {
            index,
            d,
            length,
            bbox,
            xCenter: bbox.x + bbox.width / 2,
            originalPath: path,
          };
        });
  
        const totalLength = pathData.reduce((sum, data) => sum + data.length, 0);
        const targetLength = totalLength * (fakeData / 100);
  
        let sortedPathData = [...pathData];
        const firstX = pathData[0].xCenter;
        const lastX = pathData[totalPaths - 1].xCenter;
        if (lastX < firstX) {
          sortedPathData.reverse();
        } else {
          sortedPathData.sort((a, b) => a.index - b.index);
        }
  
        const newPaths = [];
        sortedPathData.forEach((data) => {
          const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          newPath.setAttribute('d', data.d);
          newPath.setAttribute('fill', 'none');
          newPath.setAttribute('stroke', 'none');
          svg.appendChild(newPath);
          newPaths.push(newPath);
          data.originalPath.setAttribute('fill', '#747264');
          data.originalPath.setAttribute('stroke', '#747264');
        });
  
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.appendChild(defs);
  
        let currentIndex = 0;
        let currentLength = 0;
        let clipPathId = null;
        let clipPathIdOriginal = null;
        const startIndex = Math.floor(totalPaths * 0.47);
        const midIndex = Math.floor(totalPaths * 0.874);
        const endIndex = totalPaths - 1;
  
        intervalRef.current = setInterval(() => {
          if (currentLength < targetLength && currentIndex < totalPaths) {
            const path = newPaths[currentIndex];
            const originalPath = sortedPathData[currentIndex].originalPath;
            const pathLength = sortedPathData[currentIndex].length;
  
            if (clipPathId) {
              const oldClipPath = document.getElementById(clipPathId);
              if (oldClipPath) oldClipPath.remove();
              path.removeAttribute('clip-path');
              clipPathId = null;
            }
            if (clipPathIdOriginal) {
              const oldClipPath = document.getElementById(clipPathIdOriginal);
              if (oldClipPath) oldClipPath.remove();
              originalPath.removeAttribute('clip-path');
              clipPathIdOriginal = null;
            }
  
            if (currentLength + pathLength <= targetLength) {
              path.setAttribute('fill', 'white');
              originalPath.setAttribute('opacity', '0');
              currentLength += pathLength;
              currentIndex++;
            } else {
              const remainingLength = targetLength - currentLength;
              const ratio = remainingLength / pathLength;
              const bbox = sortedPathData[currentIndex].bbox;
              const clipWidth = bbox.width * ratio;
  
              let isReverse = false;
              if (currentIndex >= startIndex && currentIndex < midIndex) {
                isReverse = true;
              } else if (currentIndex >= midIndex && currentIndex <= endIndex) {
                isReverse = false;
              }
  
              clipPathId = `clip-new-${currentIndex}`;
              const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
              clipPath.setAttribute('id', clipPathId);
              const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              if (isReverse) {
                rect.setAttribute('x', bbox.x + bbox.width - clipWidth);
                rect.setAttribute('y', bbox.y);
                rect.setAttribute('width', clipWidth);
                rect.setAttribute('height', bbox.height);
              } else {
                rect.setAttribute('x', bbox.x);
                rect.setAttribute('y', bbox.y);
                rect.setAttribute('width', clipWidth);
                rect.setAttribute('height', bbox.height);
              }
              clipPath.appendChild(rect);
              defs.appendChild(clipPath);
              path.setAttribute('fill', 'white');
              path.setAttribute('clip-path', `url(#${clipPathId})`);
  
              clipPathIdOriginal = `clip-original-${currentIndex}`;
              const clipPathOriginal = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
              clipPathOriginal.setAttribute('id', clipPathIdOriginal);
              const rectOriginal = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              if (isReverse) {
                rectOriginal.setAttribute('x', bbox.x);
                rectOriginal.setAttribute('y', bbox.y);
                rectOriginal.setAttribute('width', bbox.width - clipWidth);
                rectOriginal.setAttribute('height', bbox.height);
              } else {
                rectOriginal.setAttribute('x', bbox.x + clipWidth);
                rectOriginal.setAttribute('y', bbox.y);
                rectOriginal.setAttribute('width', bbox.width - clipWidth);
                rectOriginal.setAttribute('height', bbox.height);
              }
              clipPathOriginal.appendChild(rectOriginal);
              defs.appendChild(clipPathOriginal);
              originalPath.setAttribute('fill', '#747264');
              originalPath.setAttribute('opacity', '1');
              originalPath.setAttribute('clip-path', `url(#${clipPathIdOriginal})`);
  
              currentLength = targetLength;
              currentIndex++;
            }
  
            const lastColoredIndex = currentIndex > 0 ? currentIndex - 1 : 0;
            const lastColoredBbox = sortedPathData[lastColoredIndex].bbox;
            const nextBbox = currentIndex < totalPaths ? sortedPathData[currentIndex].bbox : lastColoredBbox;
            const midXBase = (lastColoredBbox.x + lastColoredBbox.width / 2 + nextBbox.x + nextBbox.width / 2) / 2;
            const midYBase = (lastColoredBbox.y + lastColoredBbox.height / 2 + nextBbox.y + nextBbox.height / 2) / 2;
            const dx = (nextBbox.x + nextBbox.width / 2) - (lastColoredBbox.x + lastColoredBbox.width / 2);
            const dy = (nextBbox.y + nextBbox.height / 2) - (lastColoredBbox.y + lastColoredBbox.height / 2);
            const currentPercent = Math.min((currentLength / totalLength * 100), fakeData).toFixed(1);
  
            let midX, midY;
            if (currentLength === 0 && currentIndex === 0) {
              midX = midXBase - 15;
              midY = lastColoredBbox.y - 20;
            } else if (currentLength / totalLength >= 0.9) {
              midX = Math.abs(dx) > Math.abs(dy) ? midXBase - 10 : midXBase - 20;
              midY = Math.abs(dx) > Math.abs(dy) ? midYBase - 20 : midYBase - 5;
            } else {
              midX = Math.abs(dx) > Math.abs(dy) ? midXBase - 10 : midXBase - 15;
              midY = Math.abs(dx) > Math.abs(dy) ? midYBase - 20 : midYBase - 5;
            }
            text.setAttribute('x', midX);
            text.setAttribute('y', midY);
            text.textContent = `${currentPercent}%`;
          } else {
            const lastColoredIndex = currentIndex > 0 ? currentIndex - 1 : 0;
            const lastColoredBbox = sortedPathData[lastColoredIndex].bbox;
            const nextBbox = currentIndex < totalPaths ? sortedPathData[currentIndex].bbox : lastColoredBbox;
            const midXBase = (lastColoredBbox.x + lastColoredBbox.width / 2 + nextBbox.x + nextBbox.width / 2) / 2;
            const midYBase = (lastColoredBbox.y + lastColoredBbox.height / 2 + nextBbox.y + nextBbox.height / 2) / 2;
            const dx = (nextBbox.x + nextBbox.width / 2) - (lastColoredBbox.x + lastColoredBbox.width / 2);
            const dy = (nextBbox.y + nextBbox.height / 2) - (lastColoredBbox.y + lastColoredBbox.height / 2);
  
            let midX, midY;
            if (currentLength === 0 && currentIndex === 0) {
              midX = midXBase - 15;
              midY = lastColoredBbox.y - 20;
            } else if (currentLength / totalLength >= 0.9) {
              midX = Math.abs(dx) > Math.abs(dy) ? midXBase - 10 : midXBase - 20;
              midY = Math.abs(dx) > Math.abs(dy) ? midYBase - 20 : midYBase - 5;
            } else {
              midX = Math.abs(dx) > Math.abs(dy) ? midXBase - 10 : midXBase - 15;
              midY = Math.abs(dx) > Math.abs(dy) ? midYBase - 20 : midYBase - 5;
            }
            text.setAttribute('x', midX);
            text.setAttribute('y', midY);
            text.textContent = `${fakeData}%`;
            clearInterval(intervalRef.current);
          }
        }, 50);
      };
  
        timerRef.current = setTimeout(setupSvgAnimation, 500);
    
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 640;
            if (newIsMobile !== isMobile) {
            setIsMobile(newIsMobile);
            window.location.reload();
            }
        };
    
        window.addEventListener('resize', handleResize);
  
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);
  return (
    <>
      <section className="mountain-container">
        <div className="bg">
          <img src={bg} alt="" loading="lazy" />
        </div>
        <div id="header">
            <Link to="/" className="logo">
                <img src={logo} alt="karma-logo" loading="lazy" />
            </Link>
            <div className="nav">
                <Link to="/faq" className="nav-faq">
                Faq
            </Link>
            <div className="nav-language">
                <div id="lang-toggle" onClick={handleLangToggle}>
                    Language
                </div>
                <div id="lang-submenu" className={isSubmenuOpen ? '' : 'hidden'}>
                <div
                  data-lang="en"
                  className={`lang ${selectedLang === 'en' ? 'active' : ''}`}
                  onClick={() => handleLangSelect('en')}
                >
                    ENG
                </div>
                <div
                  data-lang="cn"
                  className={`lang ${selectedLang === 'cn' ? 'active' : ''}`}
                  onClick={() => handleLangSelect('cn')}
                >
                  汉语
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="container">
            <div className="title">
                <span>KARMA</span>
                <span>TODAY</span>
            </div>
            <div className="sun">
                <img className="pc" src={Sun} alt="sun" loading="lazy" />
                <img className="mb" src={SunMb} alt="sun" loading="lazy" />
            </div>
        </div>
        <div className="mountain">
          <img className="pc" src={mountain} alt="mountain" loading="lazy" />
          <img className="mb" src={mountainMb} alt="mountain" loading="lazy" />
          <div className="road">
            <div className="road1">
                <svg
                    id="svg1"
                    className="pc"
                    preserveAspectRatio="none"
                    width="1119"
                    height="550"
                    viewBox="0 0 1119 693"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ref={isMobile ? null : svgRef}
                >
                <g clipPath="url(#clip0_145_337)">
                    <path
                        d="M535.114 9.75133L532.353 6.77161C527.594 10.7715 525.172 13.8021 521.311 20.8189L525.452 22.5216C528.155 16.4959 530.219 13.648 535.114 9.75133Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M518.09 28.9067L522.231 30.1838L517.17 45.9338L512.568 44.6567L518.09 28.9067Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M514.409 54.0216L510.268 53.1703L505.206 68.9203L509.808 70.1973L514.409 54.0216Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M507.047 78.2851L502.906 77.0081L497.385 92.3324L501.526 94.0351L507.047 78.2851Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M498.305 102.123L491.403 117.022L487.722 115.319L494.567 100.586L498.305 102.123Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M487.722 125.11L487.645 125.263C484.732 131.045 483.075 134.334 479.44 139.582L476.219 137.88C479.733 131.995 484.041 123.407 484.041 123.407L487.722 125.11Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M471.158 145.116L474.839 147.67C470.327 153.605 467.907 156.416 463.796 160.441L461.035 157.461C465.929 152.769 468.132 150.063 471.158 145.116Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M438.95 168.954C439.044 170.53 439.238 171.37 439.87 172.785C446.838 171.168 450.442 169.761 456.434 166.4L453.674 162.995C448.623 166.335 445.538 167.841 438.95 168.954Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M429.287 170.657L429.748 174.062C421.659 174.639 417.956 175.263 413.183 177.042L411.803 173.211C419.085 171.283 422.913 170.717 429.287 170.657Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M405.361 180.447C404.393 179.203 403.915 178.448 403.061 177.042C397.405 180.89 394.304 183.299 388.797 187.684L391.558 190.664C396.672 186.155 399.592 183.728 405.361 180.447Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M381.896 193.643L385.116 196.623C381.355 200.369 379.211 203.468 376.374 209.393C374.959 208.932 374.04 208.65 372.233 208.116C374.556 203.046 376.694 199.871 381.896 193.643Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M371.773 217.907L375.914 217.055C379.041 223.239 381.128 225.734 385.577 228.549C384.468 229.914 383.864 230.658 382.816 231.954C376.403 226.429 373.983 223.353 371.773 217.907Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M392.938 233.657L390.638 237.062C396.523 239.25 399.734 241.224 405.361 245.576L408.122 242.17C401.761 237.907 398.436 236.039 392.938 233.657Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M415.484 248.13C414.428 249.358 413.817 250.003 412.723 251.109C417.593 255.289 420.207 257.908 424.686 263.028C425.915 261.823 426.521 261.168 427.447 260.049C422.965 255.26 420.341 252.65 415.484 248.13Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M433.428 266.859C432.045 267.867 431.352 268.424 430.208 269.414C434.466 274.449 436.673 277.34 440.33 282.609C441.099 282.14 441.734 281.767 444.011 280.481C439.518 274.551 437.2 271.567 433.428 266.859Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M449.072 287.718C452.956 293.044 454.992 296.106 458.275 301.765L454.594 303.468C451.367 298.114 449.314 295.172 445.391 289.846L449.072 287.718Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M459.195 311.13L462.876 309.001C466.445 314.551 468.352 317.723 471.618 323.474L467.937 325.603C464.594 319.695 462.684 316.515 459.195 311.13Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M472.078 332.839L476.219 331.136L484.501 346.035L480.82 347.738L472.078 332.839Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M484.501 355.4C486.21 354.607 487.111 354.243 488.642 353.697C491.512 359.181 493.259 362.381 496.464 368.17L492.323 369.873C489.474 364.067 487.778 360.885 484.501 355.4Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M496.464 377.535L500.145 375.833C502.925 382.29 504.616 385.552 507.967 390.731L503.826 392.434C500.657 387.118 498.905 383.873 496.464 377.535Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M507.967 400.522L511.648 398.393C514.771 404.039 516.815 407.105 520.85 412.441L517.629 414.569C513.509 409.11 511.375 406.035 507.967 400.522Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M526.372 419.251L523.151 421.805C526.983 426.791 529.689 429.478 535.114 434.15L537.875 431.17C532.968 426.938 530.461 424.317 526.372 419.251Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M544.776 437.13C543.533 438.195 542.934 438.851 542.016 440.109C546.356 443.611 549.543 445.825 555.819 449.9L558.12 446.92C553.122 443.894 550.255 441.801 544.776 437.13Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M581.586 459.265L579.745 462.67C571.92 459.254 568.432 457.491 563.641 454.582C564.628 453.504 565.124 452.844 565.942 451.603C571.807 454.808 575.224 456.495 581.586 459.265Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M589.868 462.245C589.236 463.698 588.832 464.441 588.027 465.65C594.304 468.093 598.078 469.383 605.051 471.609L606.432 468.204C599.681 465.955 596.023 464.658 589.868 462.245Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M615.174 470.758C614.751 472.478 614.558 473.163 614.254 474.164C620.668 476.109 624.181 477.452 630.358 480.123C631.329 478.306 631.787 477.453 632.198 476.718C625.932 473.889 621.844 472.371 615.174 470.758Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M640.02 481.4C639.274 482.606 638.804 483.267 637.719 484.38C642.322 487.837 646.34 489.417 654.284 492.042C654.751 490.576 654.961 489.74 655.204 488.211C648.489 486.466 645.117 485.031 640.02 481.4Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M663.946 489.913C663.702 491.467 663.491 492.301 663.026 493.745C669.73 494.903 673.69 495.447 680.97 496.299C681.168 494.917 681.271 494.1 681.43 492.468C674.516 491.92 670.683 491.381 663.946 489.913Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M690.633 493.745C697.57 494.845 701.544 495.435 708.577 496.299C708.446 497.376 708.169 498.195 707.694 499.595L707.657 499.704C699.907 498.771 696.148 498.207 690.173 497.15C690.355 496.103 690.455 495.389 690.633 493.745Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M717.319 497.15L716.859 500.981L734.344 503.109L734.804 499.704L717.319 497.15Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M744.466 500.981C744.154 502.361 743.951 503.103 743.546 504.386C750.464 505.625 754.409 506.141 761.491 506.941C761.51 506.442 761.638 505.679 761.951 503.535C755.366 502.754 751.561 502.217 744.466 500.981Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M787.257 513.326C786.217 514.9 785.794 515.697 784.956 516.731L769.312 509.069L769.624 508.626C770.537 507.323 771.076 506.556 771.613 505.664C777.807 508.831 781.244 510.533 787.257 513.326Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M811.643 523.116C805.612 520.861 802.105 519.48 795.539 516.731L793.698 520.137C799.481 522.727 803.037 524.223 809.803 526.947L811.643 523.116Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M820.385 526.096C826.659 528.344 830.314 529.478 836.949 531.204C836.59 532.704 836.284 533.544 835.569 535.035C828.757 533.186 825.084 532.018 819.005 529.501L820.385 526.096Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M846.152 533.332C851.715 534.969 855.232 535.754 863.176 537.163L862.256 540.995C854.975 539.733 851.11 538.945 845.231 537.163L845.266 537.032L845.267 537.028C845.716 535.321 845.979 534.324 846.152 533.332Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M872.378 538.441L871.918 542.272C878.165 542.657 882.333 543.306 889.403 543.974L889.863 540.143C883.881 539.392 879.814 539.043 872.378 538.441Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M899.065 541.846C906.049 542.825 909.867 543.59 916.549 545.251C916.237 546.406 916.037 547.169 915.629 548.657C908.941 546.855 905.114 546.109 898.145 545.251C898.618 543.674 898.868 542.822 899.065 541.846Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M925.752 547.38L924.371 550.785C930.721 553.079 934.365 554.277 940.935 556.319L942.316 552.913C936.049 550.884 932.46 549.7 925.752 547.38Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M968.082 560.15L966.702 563.981L965.791 563.745C959.34 562.07 955.448 561.06 949.678 558.873L951.058 555.468C957.472 557.661 961.254 558.6 968.082 560.15Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M976.825 562.278L975.904 565.684C982.631 567.358 986.478 568.026 993.389 569.089L994.309 565.684C987.49 564.654 983.662 563.958 976.825 562.278Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1003.51 566.961L1002.59 570.792C1009 571.952 1012.88 572.421 1020.08 573.346L1021 569.515C1014.28 568.503 1010.39 568.094 1003.51 566.961Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1030.2 570.792L1029.28 574.623C1036.01 575.923 1039.85 576.447 1046.76 577.177L1047.68 573.346C1040.54 572.344 1036.71 571.852 1030.2 570.792Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1056.88 575.049C1064.15 576.072 1067.95 576.735 1074.37 578.028L1072.99 581.859C1066.2 580.357 1062.47 579.666 1055.96 578.454L1056.88 575.049Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1083.57 579.731C1090.53 581.098 1094.39 581.957 1101.06 583.988L1099.68 587.393C1093.28 585.628 1089.57 584.69 1082.65 583.136L1083.57 579.731Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1109.8 586.542C1120.28 593.291 1120.94 596.307 1108.88 599.738L1107.96 595.907C1114.69 594.896 1115.34 593.796 1107.96 590.373L1109.8 586.542Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1099.21 596.758V600.589C1092.46 600.894 1088.64 600.99 1081.73 601.015V597.184C1088.61 597.165 1092.44 597.06 1099.21 596.758Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1072.07 597.184V601.015C1065.11 600.946 1061.26 600.879 1054.58 600.589V596.758C1061.58 597.005 1065.37 597.054 1072.07 597.184Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1044.92 596.758V600.164C1038.04 600.198 1034.21 600.112 1027.44 599.738V596.332C1034.27 596.586 1038.09 596.671 1044.92 596.758Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M1018.23 595.907V599.312C1011.18 599.236 1007.29 599.167 1000.29 598.886V595.481C1006.78 595.668 1010.58 595.766 1018.23 595.907Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M991.088 595.055V598.887L973.604 598.461V594.63L991.088 595.055Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M963.941 594.63V598.035H946.917V594.63H963.941Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M919.77 595.055V598.461L937.255 598.035V594.63L919.77 595.055Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M910.108 595.481V599.312L892.623 600.164L892.163 596.758L910.108 595.481Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M865.477 601.015L866.397 604.846L883.421 601.441L882.961 598.035L865.477 601.015Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M856.274 602.718L857.194 606.549L840.63 610.805L839.25 606.974L856.274 602.718Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M830.048 609.954L831.428 613.359L815.784 619.319L813.944 615.914L830.048 609.954Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M805.201 619.745L807.042 623.15C800.883 625.977 797.328 627.431 790.938 629.961L789.097 626.555L805.201 619.745Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M764.711 636.346L766.552 639.751C773.094 637.583 776.702 636.291 782.656 633.366L780.815 629.961C775.408 632.327 771.699 633.751 764.711 636.346Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M755.969 639.751L757.81 643.582C751.436 646.064 747.794 647.344 741.246 649.542L739.865 645.711C746.193 643.5 749.727 642.219 755.969 639.751Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M731.123 649.116L732.503 652.522C726.251 654.927 722.592 656.219 715.939 658.481L714.559 654.65C721.466 652.491 725.119 651.279 731.123 649.116Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M705.816 657.63L707.197 661.461C700.684 663.516 696.955 664.537 690.173 666.143L688.792 662.312C696.129 660.672 699.805 659.644 705.816 657.63Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M680.05 664.441L680.97 668.272C674.243 669.76 670.425 670.523 663.486 671.677L663.026 667.846C669.708 666.71 673.43 665.958 680.05 664.441Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M636.339 672.528L636.799 676.36C643.63 675.396 647.458 674.75 654.284 673.38L653.823 669.549C647.11 670.838 643.29 671.497 636.339 672.528Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M627.137 673.805L627.597 677.637C620.809 678.592 616.978 679.05 610.113 679.765L609.653 675.934C616.516 675.208 620.347 674.747 627.137 673.805Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M600.45 676.785L600.91 680.616C593.878 681.428 589.951 681.808 582.966 682.319L582.506 678.488C589.14 677.963 593.042 677.6 600.45 676.785Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M573.764 679.339V683.17C566.761 683.964 562.83 684.251 555.819 684.447V680.616C562.738 680.283 566.772 680.128 573.764 679.339Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M546.617 681.468V685.299C539.789 685.772 535.96 685.964 529.132 686.15V682.319C535.988 682.19 539.821 682.038 546.617 681.468Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M519.47 683.17V687.001C512.644 687.505 508.816 687.702 501.986 687.853V684.022C508.812 683.815 512.639 683.621 519.47 683.17Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M492.323 684.447V688.278C485.587 688.733 481.757 688.819 474.839 688.704V684.873C481.662 684.825 485.491 684.725 492.323 684.447Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M465.636 685.299V689.13C458.811 689.606 454.983 689.714 448.152 689.555V685.724C455.196 685.733 459.011 685.627 465.636 685.299Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M438.49 686.15V689.981C431.494 690.097 427.653 690.105 421.005 689.981V686.15C427.973 686.284 431.799 686.28 438.49 686.15Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M411.343 686.576V690.407C404.385 690.548 400.55 690.555 393.859 690.407V686.576C400.426 686.777 404.242 686.785 411.343 686.576Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M384.656 686.576V690.832C377.465 690.959 373.523 690.969 366.712 690.832V686.576C373.799 686.748 377.732 686.754 384.656 686.576Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M357.509 687.001V690.832C350.502 690.948 346.572 690.955 339.565 690.832V687.001C346.572 687.144 350.502 687.15 357.509 687.001Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M330.363 687.427V691.258C323.633 691.398 319.817 691.416 312.878 691.258V687.427C320.081 687.522 323.922 687.524 330.363 687.427Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M303.216 687.853V691.684C296.388 691.775 292.56 691.792 285.731 691.684V687.853C292.56 687.974 296.388 687.951 303.216 687.853Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M276.529 687.853V691.684C269.555 691.775 265.628 691.779 258.585 691.684V687.853C265.594 688.027 269.521 688.019 276.529 687.853Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M249.382 687.427V691.258L231.438 690.832V687.001L249.382 687.427Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M222.236 687.001V690.832L204.291 690.407V686.576L222.236 687.001Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M195.089 686.15V690.407L177.144 689.981V685.724L195.089 686.15Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M167.942 685.724V689.555L149.998 689.13V685.299L167.942 685.724Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M141.255 684.873V688.704L123.311 688.278V684.447L141.255 684.873Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M114.109 684.022V687.853L96.1641 687.427V683.596L114.109 684.022Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M69.0173 682.745V686.576L86.9618 687.001V683.17L69.0173 682.745Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M59.815 682.319V686.15L41.8705 685.299V681.468L59.815 682.319Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                    <path
                        d="M32.6682 685.299V681.042L15.1838 680.616V684.873L32.6682 685.299Z"
                        fill="#747264" stroke="#747264" strokeWidth="1.2"
                    />
                </g>
                <defs>
                  <clipPath id="clip0_145_337">
                    <rect
                      width="1119"
                      height="693"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                id="svg2"
                className="mb hidden"
                preserveAspectRatio="none"
                width="696"
                height="688"
                viewBox="0 0 696 688"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ref={isMobile ? svgRef : null}
              >
                <path d="M323 20.5691C325.787 12.4604 327.111 9.72234 332 6.92803L329 2.56905C322.611 6.06923 320.529 9.58274 317.5 18.5691L323 20.5691Z" fill="#747264" stroke="#747264" strokeWidth="2"/>
                <path d="M314.5 32.5L320 33.9216L316.5 55L310.5 53L314.5 32.5Z" fill="#747264" stroke="#747264"/>
                <path d="M308.5 90.5L313 68.5L307 66.5L303 88.5L308.5 90.5Z" fill="#747264" stroke="#747264"/>
                <path d="M300.262 124L305.762 103L300.262 101.5L295 122.5L300.262 124Z" fill="#747264" stroke="#747264"/>
                <path d="M287.743 153L296.243 135.5L291 133L282.243 149.5L287.743 153Z" fill="#747264" stroke="#747264"/>
                <path d="M280.438 162.402C279.071 160.254 277.367 160.148 276 158C270.691 162.802 269.42 164.531 263.5 166L266.5 171.5C273.061 170.604 274.716 167.827 280.438 162.402Z" fill="#747264" stroke="#747264"/>
                <path d="M254.586 174.5L252 169.5C245.228 171.038 242.993 172.679 237.93 179.5L242.5 183C246.567 176.653 248.17 176.236 254.586 174.5Z" fill="#747264" stroke="#747264"/>
                <path d="M233 195L227.5 191.5C220.74 198.758 222.144 199.303 222 209.5L228.5 210C229.085 201.832 227.896 200.439 233 195Z" fill="#747264" stroke="#747264"/>
                <path d="M240 240L244.5 236C238.755 232.425 235.79 229 231.79 222L226.5 224.5C230.885 231.347 233.681 235.508 240 240Z" fill="#747264" stroke="#747264"/>
                <path d="M264 259L252.5 243L248.083 247L259 263L264 259Z" fill="#747264" stroke="#747264"/>
                <path d="M279 286.5L270 269L265 272.408L274 289.5L279 286.5Z" fill="#747264" stroke="#747264"/>
                <path d="M292 318.44L284.5 299.5L279 301.786L286.5 320.787L292 318.44Z" fill="#747264" stroke="#747264"/>
                <path d="M296.259 354L302.5 352L296.259 333.5L290.5 335.5L296.259 354Z" fill="#747264" stroke="#747264"/>
                <path d="M307 366.5L301.5 368.5L308.5 387.5L314 386L307 366.5Z" fill="#747264" stroke="#747264"/>
                <path d="M321.579 419L327.5 415.5C322.795 409.379 320.066 406.981 317.5 399L311 401.222C313.599 409.163 316.736 412.449 321.579 419Z" fill="#747264" stroke="#747264"/>
                <path d="M341 444.625L345.5 440.417C340.202 435.579 337.691 433.475 333.5 426.417L328 429.625C331.633 436.175 335.067 439.002 341 444.625Z" fill="#747264" stroke="#747264"/>
                <path d="M362 462L365.5 456.5C359.295 453.671 358.478 453.345 353.5 447.5L348.5 451.5C353.332 456.732 355.671 458.569 362 462Z" fill="#747264" stroke="#747264"/>
                <path d="M384 476.5L387 471C381.122 467.553 380.5 466.5 373.5 462L370 467C378 472 377 472 384 476.5Z" fill="#747264" stroke="#747264"/>
                <path d="M409 490.5L410.714 484.315C404.259 481.899 402.025 481.002 397 477L393.355 482.315C398.292 486.617 401.342 488.27 409 490.5Z" fill="#747264" stroke="#747264"/>
                <path d="M434.033 496.684L435 491.5L420.5 487.5L418.5 493L434.033 496.684Z" fill="#747264" stroke="#747264"/>
                <path d="M442 498.861L457 503L458 497.285L444 493.5L442 498.861Z" fill="#747264" stroke="#747264"/>
                <path d="M464.5 505.434L466.5 500.5L482 506.719L480 512.219L464.5 505.434Z" fill="#747264" stroke="#747264"/>
                <path d="M488.145 516L492 510.5C497.442 515.188 499.149 515.988 505.5 518.5L502.772 524.892C496.231 521.857 493.89 520.242 488.145 516Z" fill="#747264" stroke="#747264"/>
                <path d="M528.541 534.5L530 528.5C523.941 526.55 520.395 525.876 514.5 522.5L512 528.241C517.922 531.66 522.506 532.589 528.541 534.5Z" fill="#747264" stroke="#747264"/>
                <path d="M553.5 539.5L554.332 534C548.031 532.13 544.001 531.388 537.5 530.5L536.5 536.5C542.9 537.011 547.086 537.673 553.5 539.5Z" fill="#747264" stroke="#747264"/>
                <path d="M576 548.5L579 543.462C573.216 539.827 569.449 537.477 563 536L561 541.5C567 543.462 570.286 544.82 576 548.5Z" fill="#747264" stroke="#747264"/>
                <path d="M600.012 559.816L602 554.5C596.056 552.207 592.895 551.381 587 548L584.317 552.851C590.35 556.601 593.795 558.035 600.012 559.816Z" fill="#747264" stroke="#747264"/>
                <path d="M625.168 567.304L625.973 561.5L610.74 557.196L609.184 563L625.168 567.304Z" fill="#747264" stroke="#747264"/>
                <path d="M633.975 569.19L635.341 563.5C641.574 565.473 644.811 566.744 650.901 567.786L650.12 573C643.703 572.341 640.16 571.551 633.975 569.19Z" fill="#747264" stroke="#747264"/>
                <path d="M659.451 575.345L660.086 569.631C666.681 570.576 670.557 572.044 676.451 574.393L675.402 579.631C669.173 577.53 665.679 576.613 659.451 575.345Z" fill="#747264" stroke="#747264"/>
                <path d="M682.197 582.361L684 577C692.466 581.888 696.154 583.909 693.385 588.133L688.27 594.291L685 589.467C687.615 586.346 688.348 584.903 682.197 582.361Z" fill="#747264" stroke="#747264"/>
                <path d="M681 596V591H665V596H681Z" fill="#747264" stroke="#747264"/>
                <path d="M656 595.571V590.5H640V595.571H656Z" fill="#747264" stroke="#747264"/>
                <path d="M615 594.5V589.5L631 590V595L615 594.5Z" fill="#747264" stroke="#747264"/>
                <path d="M606 594V589.5H590V594H606Z" fill="#747264" stroke="#747264"/>
                <path d="M581 594.5V589.5H565V594.5H581Z" fill="#747264" stroke="#747264"/>
                <path d="M556.5 595V590C549.678 590.311 546.95 590.565 540.5 592.5L541.5 597.5C547.752 595.348 550 595.337 556.5 595Z" fill="#747264" stroke="#747264"/>
                <path d="M531.5 600L529.5 595C522.79 596.337 520.76 599.052 515 602L518 607C523.839 604.09 525.16 601.393 531.5 600Z" fill="#747264" stroke="#747264"/>
                <path d="M509 613L505.5 608.5L492 617.5L494.249 622.5L509 613Z" fill="#747264" stroke="#747264"/>
                <path d="M472.704 636.591C478.505 633.418 481.314 631.453 487 627.5L484 623C478.17 626.664 476.44 628.917 470.5 632L472.704 636.591Z" fill="#747264" stroke="#747264"/>
                <path d="M464.189 641.952L461.689 638C455.59 641.229 452.926 642.683 446.689 645L448.394 649.5C454.733 647.119 458.194 645.473 464.189 641.952Z" fill="#747264" stroke="#747264"/>
                <path d="M440.587 653.81L438.5 649C432.957 651.757 430.38 653.749 424.5 655L426 659.5C431.433 658.028 434.645 656.744 440.587 653.81Z" fill="#747264" stroke="#747264"/>
                <path d="M417 663L415.417 658C409.397 660.006 407.508 661.168 401 662L401.847 667C407.877 666.061 410.814 665.204 417 663Z" fill="#747264" stroke="#747264"/>
                <path d="M391 671L389.5 665.5C383.236 667.202 381.477 669.741 375.5 670L376 675C381.827 674.844 384.649 672.505 391 671Z" fill="#747264" stroke="#747264"/>
                <path d="M366 677.242L365.673 672C359.626 673.12 356.203 673.558 350 673.747L350.327 678.989C356.433 679.078 359.864 678.63 366 677.242Z" fill="#747264" stroke="#747264"/>
                <path d="M325 681V676.188C330.705 675.836 333.746 675.319 340.5 674L341 679.25C334.424 680.539 330.942 680.932 325 681Z" fill="#747264" stroke="#747264"/>
                <path d="M317 682.5V677C310.366 678.046 306.647 678.861 300 678.5V683.794C306.483 684.249 310.221 683.638 317 682.5Z" fill="#747264" stroke="#747264"/>
                <path d="M291 684.5V679L275 680V685.5L291 684.5Z" fill="#747264" stroke="#747264"/>
                <path d="M266.561 686V680.5H250.478V686H266.561Z" fill="#747264" stroke="#747264"/>
                <path d="M241.581 686.5V681H225.841V686.5H241.581Z" fill="#747264" stroke="#747264"/>
                <path d="M216.602 687.5V682H200.519V687.5H216.602Z" fill="#747264" stroke="#747264"/>
                <path d="M191.965 687.5V682H175.198V687.5H191.965Z" fill="#747264" stroke="#747264"/>
                <path d="M166.643 687.5V682H150.561V687.5H166.643Z" fill="#747264" stroke="#747264"/>
                <path d="M142.006 687.5V681.5H125.239V687.5H142.006Z" fill="#747264" stroke="#747264"/>
                <path d="M116.685 686.5V680.5L100.26 680V686L116.685 686.5Z" fill="#747264" stroke="#747264"/>
                <path d="M92.0473 685.5V680H75.6226V685.5H92.0473Z" fill="#747264" stroke="#747264"/>
                <path d="M67.0677 684.5V679L50.643 677.5L50.3008 683.5L67.0677 684.5Z" fill="#747264" stroke="#747264"/>
                <path d="M42.0883 683V677.5L25.3213 677V682.5L42.0883 683Z" fill="#747264" stroke="#747264"/>
                <path d="M17.1093 681.5V676V675.5H0.68457V681.5H17.1093Z" fill="#747264" stroke="#747264"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
      <HomeContentEng
        className={`karma-content ${selectedLang === 'en' ? '' : 'hidden'}`}
        id="karma-content_en"
      />
      <HomeContentCn
        className={`karma-content ${selectedLang === 'cn' ? '' : 'hidden'}`}
        id="karma-content_cn"
      />
    </>
  );
}

export default Home;