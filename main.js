
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
    
    const donationData = document.getElementById('donation-data');
    const fakeData = 10;
    
    setTimeout(() => {
        fetch('http://localhost:3000/api/number') // Replace with actual endpoint
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(serverData => serverData.value !== undefined ? serverData.value : fakeData)
            .catch(error => {
                console.error('Error fetching data:', error);
                return fakeData;
            })
            .then(data => {
                let currentValue = 0;
                let animationRunning = false;
    
                // Lấy SVG nào đang hiển thị
                const svg1 = document.getElementById("svg1");
                const svg2 = document.getElementById("svg2");
    
                let visibleSvgPaths;
                if (window.getComputedStyle(svg1).display !== "none") {
                    visibleSvgPaths = svg1.querySelectorAll("path");
                } else {
                    visibleSvgPaths = svg2.querySelectorAll("path");
                }
    
                const totalPaths = visibleSvgPaths.length;
                const pathsToAnimate = Math.round((data / 100) * totalPaths);
                let count = 0;
    
                const interval = setInterval(() => {
                    if (currentValue <= data) {
                        donationData.innerHTML = `${currentValue}%`;
                        currentValue++;
                    } else {
                        clearInterval(interval);
                    }
    
                    if (!animationRunning) {
                        animationRunning = true;
                        const timeDelay = 100 / (totalPaths - 2) / 19.8;
    
                        for (let i = totalPaths - 1; i >= 0 && count < pathsToAnimate; i--, count++) {
                            visibleSvgPaths[i].style.animationDelay = `${count * timeDelay}s`;
                            visibleSvgPaths[i].classList.add('line');
                        }
                    }
                }, 50);
            });
    }, 100);