
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
        const fakedata = 8.8;
        const isMobile = window.innerWidth < 640;
        const svg = isMobile ? document.getElementById('svg2') : document.getElementById('svg1');
        const paths = svg.querySelectorAll('path');
        const totalPaths = paths.length;
    
        // Bước 1: Nội suy kích thước và hình dạng
        const pathData = Array.from(paths).map((path, index) => {
            const bbox = path.getBBox();
            const length = path.getTotalLength();
            if (isNaN(length) || length <= 0) {
                console.warn(`Path ${index} có length không hợp lệ: ${length}`);
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
    
        // Tính chiều dài tổng
        const totalLength = pathData.reduce((sum, data) => sum + data.length, 0);
        console.log(`Total length: ${totalLength}`);
        pathData.forEach(data => console.log(`Path ${data.index}: length=${data.length}, xCenter=${data.xCenter}`));
        const targetLength = totalLength * (fakedata / 100);
        console.log(`Target length for ${fakedata}%: ${targetLength}`);
    
        // Bước 2: Sắp xếp theo index gốc, điều chỉnh nếu ngược
        let sortedPathData = [...pathData];
        const firstX = pathData[0].xCenter;
        const lastX = pathData[totalPaths - 1].xCenter;
        if (lastX < firstX) {
            sortedPathData.reverse();
            console.log('Đảo ngược thứ tự path vì SVG chạy từ phải qua trái');
        } else {
            sortedPathData.sort((a, b) => a.index - b.index);
            console.log('Giữ thứ tự index gốc, kiểm tra xCenter');
        }
        sortedPathData.forEach((data, i) => console.log(`Sorted path ${i}: index=${data.index}, xCenter=${data.xCenter}`));
    
        // Bước 3: Vẽ lại <path> mới
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
    
        // Tạo defs cho <clipPath>
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.appendChild(defs);
    
        // Tạo <text> cho phần trăm
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('font-size', '20');
        text.setAttribute('font-family', 'Aceh');
        text.setAttribute('fill', 'white');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = '';
        svg.appendChild(text);
    
        // Bước 4: Tô màu, đảo ngược hướng trong đoạn 47%-87.4%, và xử lý riêng 87.4%-100%
        let currentIndex = 0;
        let currentLength = 0;
        let clipPathId = null;
        let clipPathIdOriginal = null;
        const startIndex = Math.floor(totalPaths * 0.47); // 47%
        const midIndex = Math.floor(totalPaths * 0.874); // 87.4%
        const endIndex = totalPaths - 1; // 100%
        const interval = setInterval(() => {
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
    
                    // Xác định hướng tô: 0%-47% (trái → phải), 47%-87.4% (phải → trái), 87.4%-100% (phải → trái)
                    let isReverse = false;
                    if (currentIndex >= startIndex && currentIndex < midIndex) {
                        isReverse = true; // 47%-87.4%: tô ngược hướng
                    } else if (currentIndex >= midIndex && currentIndex <= endIndex) {
                        isReverse = false; // 87.4%-100%: tô ngược hướng
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
    
        // Responsive: Cập nhật khi thay đổi kích thước màn hình
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth < 640;
            if (newIsMobile !== isMobile) {
                location.reload();
            }
        });
    }, 500);