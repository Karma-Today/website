
    document.getElementById("lang-switch").addEventListener("change", function () {
        let lang = this.value;
        let cnContent = document.getElementById("karma-content_cn");
        let enContent = document.getElementById("karma-content_en");
        if (lang === "en") {
            enContent.classList.remove("hidden");
            cnContent.classList.add("hidden");
        } else {
            enContent.classList.add("hidden");
            cnContent.classList.remove("hidden");
        }
    });
    document.getElementById("lang-switch").dispatchEvent(new Event("change"));
    // donation line
    setTimeout(() => {
        // Function to validate data
        const validateData = (data) => {
            // Check if data is not a number, is NaN, or is outside 0-100 range
            if (typeof data !== 'number' || isNaN(data) || data < 0 || data > 100) {
                console.log('invalid data')
                return false;
            }
            return true;
        };
    
        const fakedata = 10; // Input data
        const isMobile = window.innerWidth < 640;
        const svg = isMobile ? document.getElementById('svg2') : document.getElementById('svg1');
    
        // Check if SVG exists
        if (!svg) {
            console.error('SVG element not found');
            return;
        }
    
        const paths = svg.querySelectorAll('path');
        const totalPaths = paths.length;
    
        // Check if paths exist
        if (totalPaths === 0) {
            console.error('No paths found in SVG');
            return;
        }
    
        // Create <text> element for percentage display
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('font-size', '20');
        text.setAttribute('font-family', 'arial');
        text.setAttribute('fill', 'white');
        text.setAttribute('dominant-baseline', 'middle');
        svg.appendChild(text);
    
        // Validate input data
        if (!validateData(fakedata)) {
            // If data is invalid, set text to "0%" and position based on the first path in sorted order
            const pathData = Array.from(paths).map((path, index) => {
                const bbox = path.getBBox();
                return {
                    index,
                    bbox,
                    xCenter: bbox.x + bbox.width / 2
                };
            });
    
            // Sort paths to match drawing order
            let sortedPathData = [...pathData];
            const firstX = pathData[0].xCenter;
            const lastX = pathData[totalPaths - 1].xCenter;
            if (lastX < firstX) {
                sortedPathData.reverse();
            } else {
                sortedPathData.sort((a, b) => a.index - b.index);
            }
    
            // Use the first path in sorted order for positioning
            const firstPathBbox = sortedPathData[0].bbox;
            const midX = firstPathBbox.x + firstPathBbox.width / 2 - 15;
            const midY = firstPathBbox.y - 20;
            text.setAttribute('x', midX);
            text.setAttribute('y', midY);
            text.textContent = '0%';
            return; // Stop all operations
        }
    
        // Map shape and size from paths
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
                originalPath: path
            };
        });
    
        // Calculate total length
        const totalLength = pathData.reduce((sum, data) => sum + data.length, 0);
        const targetLength = totalLength * (fakedata / 100);
    
        // Sort paths by index or reverse based on xCenter
        let sortedPathData = [...pathData];
        const firstX = pathData[0].xCenter;
        const lastX = pathData[totalPaths - 1].xCenter;
        if (lastX < firstX) {
            sortedPathData.reverse();
        } else {
            sortedPathData.sort((a, b) => a.index - b.index);
        }
    
        // Draw new paths
        const newPaths = [];
        sortedPathData.forEach(data => {
            const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            newPath.setAttribute('d', data.d);
            newPath.setAttribute('fill', 'none');
            newPath.setAttribute('stroke', 'none');
            svg.appendChild(newPath);
            newPaths.push(newPath);
            data.originalPath.setAttribute('fill', '#747264');
            data.originalPath.setAttribute('stroke', '#747264');
        });
    
        // Create <defs> for clip paths
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.appendChild(defs);
    
        // Set color and animate from 47% to 87.4%
        let currentIndex = 0;
        let currentLength = 0;
        let clipPathId = null;
        let clipPathIdOriginal = null;
        const startIndex = Math.floor(totalPaths * 0.47); // 47% of paths
        const midIndex = Math.floor(totalPaths * 0.874); // 87.4% of paths
        const endIndex = totalPaths - 1; // 100% of paths
        const interval = setInterval(() => {
            if (currentLength < targetLength && currentIndex < totalPaths) {
                const path = newPaths[currentIndex];
                const originalPath = sortedPathData[currentIndex].originalPath;
                const pathLength = sortedPathData[currentIndex].length;
    
                // Remove old clip paths
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
    
                // Fill path fully if within target length
                if (currentLength + pathLength <= targetLength) {
                    path.setAttribute('fill', 'white');
                    originalPath.setAttribute('opacity', '0');
                    currentLength += pathLength;
                    currentIndex++;
                } else {
                    // Apply clip path for partial fill
                    const remainingLength = targetLength - currentLength;
                    const ratio = remainingLength / pathLength;
                    const bbox = sortedPathData[currentIndex].bbox;
                    const clipWidth = bbox.width * ratio;
    
                    // Determine clip direction
                    let isReverse = false;
                    if (currentIndex >= startIndex && currentIndex < midIndex) {
                        isReverse = true; // Reverse clip direction
                    } else if (currentIndex >= midIndex && currentIndex <= endIndex) {
                        isReverse = false; // Normal clip direction
                    }
    
                    // Clip path for new path
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
    
                    // Clip path for original path
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
    
                // Update text position and percentage
                const lastColoredIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                const lastColoredBbox = sortedPathData[lastColoredIndex].bbox;
                const nextBbox = currentIndex < totalPaths ? sortedPathData[currentIndex].bbox : lastColoredBbox;
                const midXBase = (lastColoredBbox.x + lastColoredBbox.width / 2 + nextBbox.x + nextBbox.width / 2) / 2;
                const midYBase = (lastColoredBbox.y + lastColoredBbox.height / 2 + nextBbox.y + nextBbox.height / 2) / 2;
                const dx = (nextBbox.x + nextBbox.width / 2) - (lastColoredBbox.x + lastColoredBbox.width / 2);
                const dy = (nextBbox.y + nextBbox.height / 2) - (lastColoredBbox.y + lastColoredBbox.height / 2);
                const currentPercent = Math.min((currentLength / totalLength * 100), fakedata).toFixed(1);
    
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
                // Final text position and percentage
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
                text.textContent = `${fakedata}%`;
                clearInterval(interval);
            }
        }, 50);
    
        // Handle window resize for responsiveness
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth < 640;
            if (newIsMobile !== isMobile) {
                location.reload();
            }
        });
    }, 500);

