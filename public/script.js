document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('pixel-grid');
    const bigDisplay = document.getElementById('percentage-display'); // Novi naslov
    const statusText = document.getElementById('status-text');

    // Konfiguracija mreže
    const rows = 5;
    const cols = 10;
    const totalPixels = rows * cols; 
    let pixelsArray = [];

    // Generiranje piksela
    for (let i = 0; i < totalPixels; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
        pixelsArray.push(pixel);
    }

    let batteryLevel = 0;
    let isCharging = true;

    function updateBattery() {
        if (isCharging) {
            batteryLevel += 0.5; 
            if (batteryLevel >= 100) {
                batteryLevel = 100;
                isCharging = false;
                statusText.textContent = "SYSTEM CHARGED";
                statusText.style.color = "var(--color-high)";
                
                // Reset loop
                setTimeout(() => {
                    batteryLevel = 0;
                    isCharging = true;
                    statusText.textContent = "Charging sequence...";
                    statusText.style.color = "var(--text-gray)";
                }, 4000);
            }
        }

        // Izračuni
        const activeCount = Math.ceil((batteryLevel / 100) * totalPixels);

        // Odabir boje
        let currentColor;
        if (batteryLevel < 25) currentColor = "var(--color-low)";
        else if (batteryLevel < 65) currentColor = "var(--color-mid)";
        else currentColor = "var(--color-high)";

        // Ažuriranje naslova (brojke)
        bigDisplay.textContent = `${Math.floor(batteryLevel)}%`;
        
        // Ako je baterija > 0, oboji naslov, inače sivo
        if(batteryLevel > 0) {
            bigDisplay.style.color = currentColor;
            // Dodajemo blagi glow na tekst
            bigDisplay.style.textShadow = `0 0 20px ${currentColor}`;
        } else {
            bigDisplay.style.color = "var(--text-gray)";
            bigDisplay.style.textShadow = "none";
        }

        // Ažuriranje piksela
        pixelsArray.forEach((pixel, index) => {
            if (index < activeCount) {
                pixel.classList.add('active');
                pixel.style.backgroundColor = currentColor;
                pixel.style.color = currentColor; 
            } else {
                pixel.classList.remove('active');
                pixel.style.backgroundColor = ""; 
                pixel.style.boxShadow = "none";
            }
        });
    }

    setInterval(updateBattery, 50);
});