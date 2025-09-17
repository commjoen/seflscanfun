# Albert Heijn Zelfscanner Simulatie

Een interactieve webapplicatie die een Albert Heijn zelfscanner simuleert. Deze applicatie is ontwikkeld als een leerzame en leuke manier om veilig programmeren te oefenen in retail/betaal simulatie webapps.

## ✨ Functies

- **Product Scannen**: Simuleer het scannen van barcodes om producten toe te voegen
- **Winkelwagen Beheer**: Voeg producten toe, verwijder ze en wijzig hoeveelheden
- **Digitale Bon**: Genereer en bekijk digitale kassabonnen
- **Checkout Proces**: Simuleer betaling met verschillende betaalmethoden
- **"Lees van Scanner"**: Genereer willekeurige boodschappenlijsten met één klik
- **Responsief Design**: Werkt perfect op tablets, telefoons en desktops
- **Albert Heijn Branding**: Authentieke kleuren en styling
- **Offline Functionaliteit**: Service Worker voor offline gebruik

## 🚀 Live Demo

De applicatie is beschikbaar op: [GitHub Pages URL]

## 🛠️ Technologieën

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Albert Heijn kleurenschema met CSS Grid en Flexbox
- **PWA**: Service Worker voor offline functionaliteit
- **CI/CD**: GitHub Actions voor automatische deployment en releases
- **Testing**: Ingebouwde test suite met Node.js 24
- **Docker**: Container support met GitHub Container Registry (GHCR)
- **Versioning**: Semantic versioning met automatische releases

## 📱 Functionaliteiten

### Product Database
- 20+ Nederlandse Albert Heijn producten
- Realistische prijzen en beschrijvingen
- Verschillende categorieën (Zuivel, Groente & Fruit, etc.)
- Emoji als product afbeeldingen

### Barcode Scanning
- Voer barcode handmatig in of simuleer scanning
- Real-time product herkenning
- Visuele feedback bij succesvol scannen

### Winkelwagen
- Dynamische hoeveelheid aanpassingen
- Product verwijdering
- Real-time prijs berekening
- Subtotaal en eindtotaal weergave

### Betaalproces
- Meerdere betaalmethoden (PIN, Contactloos, Contant)
- Gesimuleerde betaalverwerking
- Betaalbevestiging

### Digitale Bon
- Volledige kassabon met datum/tijd
- BTW berekening
- Print functionaliteit
- Unieke bon nummer

## 🎯 Gebruik

### Normale Workflow
1. Open de applicatie in je browser
2. Voer een barcode in (bijv. `8713800000015` voor melk)
3. Klik "Scan" of druk Enter
4. Voeg het product toe aan je winkelwagen
5. Herhaal voor meer producten
6. Klik "Afrekenen" wanneer je klaar bent
7. Kies een betaalmethode
8. Bekijk je digitale bon

### "Lees van Scanner" Feature
1. Klik op "Lees van Scanner" voor een willekeurige boodschappenlijst
2. De applicatie genereert automatisch een gevulde winkelwagen
3. Een digitale bon wordt direct getoond

### Beschikbare Barcodes
```
8713800000015 - AH Verse melk
8710398230046 - AH Brood wit  
8713800000022 - AH Eieren vrije uitloop
8710398230053 - AH Bananen
8713800000039 - AH Tomaten
8710398230060 - AH Kaas jong belegen
8713800000046 - AH Koffie
8710398230077 - AH Pasta penne
... en meer!
```

## 🧪 Testing

De applicatie bevat een uitgebreide test suite:

1. Open `test.html` in je browser
2. Tests worden automatisch uitgevoerd
3. Bekijk resultaten voor product database validatie

### Test Categorieën
- Product database integriteit
- Barcode lookup functionaliteit  
- Zoek en filter functies
- Prijs validatie
- Nederlandse content verificatie

## 🏗️ Project Structuur

```
/
├── index.html          # Hoofdapplicatie
├── styles.css          # Styling met AH kleuren
├── app.js             # Hoofdapplicatie logica
├── products.js        # Product database en functies
├── sw.js              # Service Worker
├── test.html          # Test suite
├── README.md          # Documentatie
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment
```

## 🎨 Design System

### Albert Heijn Kleuren
- **Primair Blauw**: `#0066CC`
- **Donker Blauw**: `#004499`  
- **Oranje**: `#FF6600`
- **Groen**: `#00AA44`
- **Licht Grijs**: `#F5F5F5`

### Responsive Breakpoints
- **Desktop**: >768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤480px

## 🚀 Deployment

### GitHub Pages
De applicatie wordt automatisch gedeployed naar GitHub Pages via GitHub Actions:

1. Push naar `main` branch
2. GitHub Actions voert tests uit
3. Bij success: deployment naar Pages
4. Live URL wordt beschikbaar

### Lokale Development
```bash
# Clone repository
git clone [repository-url]

# Open in browser
open index.html

# Of gebruik een lokale server
python -m http.server 8000
# Navigeer naar http://localhost:8000
```

### Docker Deployment
```bash
# Pull en start vanaf GHCR
docker run -p 8000:8000 ghcr.io/commjoen/seflscanfun:latest

# Lokaal bouwen
docker build -t seflscanfun .
docker run -p 8000:8000 seflscanfun
```

Zie [DOCKER.md](DOCKER.md) voor uitgebreide Docker documentatie including Kubernetes en Cloud Run deployment.

## 🔒 Veiligheid & Best Practices

- **Geen echte betaalverwerking**: Volledig gesimuleerd
- **Client-side only**: Geen server-side dependencies
- **Geen gevoelige data**: Alle data is public en educatief
- **XSS Preventie**: Input sanitization waar nodig
- **Responsive Design**: Werkt op alle moderne browsers

## 🤝 Bijdragen

Bijdragen zijn welkom! Areas voor verbetering:

- **Meer Producten**: Uitbreiden van de product database
- **Nieuwe Features**: Kortingen, loyaliteit punten, etc.
- **Verbeterde UX**: Animaties, geluid effecten
- **Geavanceerde Tests**: E2E testing, performance tests
- **Toegankelijkheid**: ARIA labels, keyboard navigation

### Development Guidelines
1. Behoud Albert Heijn branding en kleuren
2. Zorg voor mobile-first responsive design
3. Test alle functies in `test.html`
4. Update documentatie bij wijzigingen
5. Volg bestaande code conventions

## 📄 Licentie

Dit project is ontwikkeld voor educatieve doeleinden. Albert Heijn is een geregistreerd handelsmerk van Ahold Delhaize.

## 🎯 Leerdobestellingen

Deze applicatie demonstreert:
- **Frontend Development**: Modern HTML/CSS/JS patterns
- **Responsive Design**: Mobile-first benadering  
- **State Management**: Shopping cart en UI state
- **Event Handling**: User interactions en form handling
- **Local Storage**: Persistent data (optioneel)
- **PWA Concepts**: Service Workers en offline functionaliteit
- **Testing**: Automated test suites
- **CI/CD**: GitHub Actions workflows
- **UI/UX Design**: Retail interface patterns

Perfect voor het leren van secure coding practices in een retail context!