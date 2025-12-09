// cookie-consent.js

(function() {
    const GA_ID = 'G-3R24R6J6D6';
    const CONSENT_KEY = 'htdev_cookie_consent';

    // 1. Fonction pour charger Google Analytics (ne s'exécute que si autorisé)
    function loadGoogleAnalytics() {
        console.log('Consentement accordé : Chargement de Google Analytics...');
        
        // Création du script gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        // Configuration inline
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    // 2. Fonction pour créer et afficher le bandeau
    function showBanner() {
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

        // Écouteurs d'événements (Clicks)
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

    // 3. Logique principale au chargement de la page
    const userConsent = localStorage.getItem(CONSENT_KEY);

    if (userConsent === 'granted') {
        loadGoogleAnalytics(); // Déjà accepté précédemment
    } else if (userConsent === 'denied') {
        // Déjà refusé : on ne fait rien (pas de tracking)
    } else {
        showBanner(); // Premier visite : on montre le bandeau
    }
})();