// cookie-consent.js

(function() {
    const GA_ID = 'G-3R24R6J6D6';
    const CONSENT_KEY = 'htdev_cookie_consent';

    // --- CSS STYLES ---
    // Added a media query at the bottom for responsive mobile adjustments
    const BANNER_STYLES = `
        #cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0 -4px 10px rgba(0,0,0,0.05);
            padding: 1.5rem;
            z-index: 9999;
            font-family: system-ui, -apple-system, sans-serif;
            box-sizing: border-box;
        }

        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .cookie-content p {
            margin: 0;
            font-size: 0.95rem;
            color: #333;
            flex: 1;
            /* Lowered min-width to prevent overflow on very small screens */
            min-width: 250px; 
            line-height: 1.5;
        }

        .cookie-content a {
            color: #000;
            text-decoration: underline;
        }

        .cookie-buttons {
            display: flex;
            gap: 0.5rem;
        }

        .btn-cookie {
            padding: 0.5rem 1.2rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            border: none;
            transition: opacity 0.2s;
            white-space: nowrap; /* Prevents button text from wrapping */
        }

        .btn-accept {
            background-color: #000;
            color: #fff;
        }

        .btn-refuse {
            background-color: #f0f0f0;
            color: #333;
        }

        .btn-cookie:hover {
            opacity: 0.8;
        }

        /* --- MOBILE RESPONSIVE TWEAKS --- */
        @media (max-width: 768px) {
            #cookie-banner {
                padding: 1rem; /* Less padding on mobile to save space */
            }

            .cookie-content {
                flex-direction: column; /* Stack text on top of buttons */
                align-items: stretch;
            }

            .cookie-content p {
                min-width: 0; /* Remove min-width constraint on mobile */
                margin-bottom: 0.5rem;
            }

            .cookie-buttons {
                width: 100%;
                display: flex;
                gap: 0.5rem;
            }

            .btn-cookie {
                flex: 1; /* Forces buttons to share width 50/50 */
                text-align: center;
                padding: 0.8rem; /* Larger touch target for thumbs */
            }
        }
    `;

    // 1. Helper to inject CSS
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = BANNER_STYLES;
        document.head.appendChild(style);
    }

    // 2. Load Google Analytics
    function loadGoogleAnalytics() {
        console.log('Consentement accordé : Chargement de Google Analytics...');
        
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    // 3. Create and Show Banner
    function showBanner() {
        injectStyles();

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>
                    Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. 
                    <a href="/cookies.html" target="_blank">En savoir plus</a>.
                </p>
                <div class="cookie-buttons">
                    <button id="btn-refuse" class="btn-cookie btn-refuse">Refuser</button>
                    <button id="btn-accept" class="btn-cookie btn-accept">Accepter</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('btn-accept').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'granted');
            banner.remove();
            loadGoogleAnalytics();
        });

        document.getElementById('btn-refuse').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'denied');
            banner.remove();
        });
    }

    // 4. Main Logic
    const userConsent = localStorage.getItem(CONSENT_KEY);

    if (userConsent === 'granted') {
        loadGoogleAnalytics();
    } else if (userConsent === 'denied') {
        // Do nothing
    } else {
        showBanner();
    }
})();