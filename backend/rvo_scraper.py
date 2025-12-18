"""
RVO Subsidy Scraper - Fetches real Dutch subsidy data from RVO.nl
Provides up-to-date information about available subsidies for businesses.
"""

import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import asyncio
from datetime import datetime
import re


class RVOSubsidyScraper:
    """
    Scrapes subsidy information from RVO.nl (Netherlands Enterprise Agency)
    """
    
    BASE_URL = "https://www.rvo.nl"
    SUBSIDIES_URL = "https://www.rvo.nl/subsidies-financiering"
    
    # Known subsidy categories with their RVO pages
    SUBSIDY_SOURCES = [
        {
            "url": "https://www.rvo.nl/subsidies-financiering/wbso",
            "name": "WBSO",
            "category": "Fiscaal"
        },
        {
            "url": "https://www.rvo.nl/subsidies-financiering/sde",
            "name": "SDE++",
            "category": "Energie"
        },
        {
            "url": "https://www.rvo.nl/subsidies-financiering/mkb-innovatiestimulering-topsectoren-mit",
            "name": "MIT",
            "category": "Innovatie"
        },
        {
            "url": "https://www.rvo.nl/subsidies-financiering/energie-investeringsaftrek-eia",
            "name": "EIA",
            "category": "Energie"
        },
        {
            "url": "https://www.rvo.nl/subsidies-financiering/milieu-investeringsaftrek-mia-en-vamil",
            "name": "MIA/Vamil",
            "category": "Milieu"
        },
        {
            "url": "https://www.rvo.nl/subsidies-financiering/innovatiebox",
            "name": "Innovatiebox",
            "category": "Fiscaal"
        },
        {
            "url": "https://www.rvo.nl/subsidies-financiering/borgstelling-mkb-kredieten-bmkb",
            "name": "BMKB",
            "category": "Financiering"
        },
    ]
    
    def __init__(self):
        self.client = httpx.AsyncClient(
            timeout=30.0,
            follow_redirects=True,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        )
        self.cache = {}
        self.cache_time = None
        self.cache_duration = 3600  # Cache for 1 hour
    
    async def close(self):
        await self.client.aclose()
    
    async def fetch_page(self, url: str) -> Optional[str]:
        """Fetch a page and return its HTML content"""
        try:
            response = await self.client.get(url)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def parse_subsidy_page(self, html: str, subsidy_info: dict) -> Dict:
        """Parse a single subsidy page for relevant information"""
        soup = BeautifulSoup(html, 'html.parser')
        
        result = {
            "id": subsidy_info["name"].lower().replace("/", "-") + "-2024",
            "name": subsidy_info["name"],
            "category": subsidy_info["category"],
            "url": subsidy_info["url"],
            "title": "",
            "description": "",
            "deadline": "Doorlopend",
            "status": "Open",
            "amount_info": "",
            "eligibility": [],
            "last_updated": datetime.now().isoformat()
        }
        
        # Extract title
        title_elem = soup.find("h1")
        if title_elem:
            result["title"] = title_elem.get_text(strip=True)
        
        # Extract description from intro paragraph
        intro = soup.find("p", class_="intro") or soup.find("div", class_="intro")
        if intro:
            result["description"] = intro.get_text(strip=True)[:500]
        else:
            # Try first paragraph
            first_p = soup.find("article")
            if first_p:
                p = first_p.find("p")
                if p:
                    result["description"] = p.get_text(strip=True)[:500]
        
        # Look for deadline information
        deadline_patterns = [
            r'deadline[:\s]+(\d{1,2}[\s\-]+\w+[\s\-]+\d{4})',
            r'tot[:\s]+(\d{1,2}[\s\-]+\w+[\s\-]+\d{4})',
            r'uiterlijk[:\s]+(\d{1,2}[\s\-]+\w+[\s\-]+\d{4})',
        ]
        
        page_text = soup.get_text()
        for pattern in deadline_patterns:
            match = re.search(pattern, page_text, re.IGNORECASE)
            if match:
                result["deadline"] = match.group(1)
                break
        
        # Look for status (open/gesloten)
        if "gesloten" in page_text.lower():
            result["status"] = "Gesloten"
        elif "open" in page_text.lower():
            result["status"] = "Open"
        
        # Extract bullet points as eligibility criteria
        lists = soup.find_all("ul")
        for ul in lists[:2]:  # First two lists likely contain requirements
            items = ul.find_all("li")
            for item in items[:5]:  # Max 5 items
                text = item.get_text(strip=True)
                if len(text) > 10 and len(text) < 200:
                    result["eligibility"].append(text)
        
        return result
    
    async def scrape_all_subsidies(self) -> List[Dict]:
        """Scrape all known subsidy pages"""
        
        # Check cache
        if self.cache and self.cache_time:
            age = (datetime.now() - self.cache_time).total_seconds()
            if age < self.cache_duration:
                return self.cache.get("subsidies", [])
        
        subsidies = []
        
        for subsidy_info in self.SUBSIDY_SOURCES:
            html = await self.fetch_page(subsidy_info["url"])
            if html:
                parsed = self.parse_subsidy_page(html, subsidy_info)
                subsidies.append(parsed)
            
            # Be respectful - small delay between requests
            await asyncio.sleep(0.5)
        
        # Update cache
        self.cache["subsidies"] = subsidies
        self.cache_time = datetime.now()
        
        return subsidies
    
    async def get_subsidy_by_name(self, name: str) -> Optional[Dict]:
        """Get a specific subsidy by name"""
        subsidies = await self.scrape_all_subsidies()
        for subsidy in subsidies:
            if subsidy["name"].lower() == name.lower():
                return subsidy
        return None
    
    async def search_subsidies(self, query: str) -> List[Dict]:
        """Search subsidies by keyword"""
        subsidies = await self.scrape_all_subsidies()
        query_lower = query.lower()
        
        results = []
        for subsidy in subsidies:
            if (query_lower in subsidy["name"].lower() or
                query_lower in subsidy["title"].lower() or
                query_lower in subsidy["description"].lower() or
                query_lower in subsidy["category"].lower()):
                results.append(subsidy)
        
        return results


# Fallback static data when scraping fails
FALLBACK_SUBSIDIES = [
    {
        "id": "wbso-2024",
        "name": "WBSO",
        "category": "Fiscaal",
        "title": "WBSO - Afdrachtvermindering speur- en ontwikkelingswerk",
        "description": "De WBSO is een fiscale regeling waarmee u de loonkosten van uw R&D-medewerkers kunt verlagen. U betaalt minder loonheffingen en premies voor werknemers die speur- en ontwikkelingswerk doen.",
        "deadline": "30 september 2024",
        "status": "Open",
        "amount_info": "Tot 32% afdrachtvermindering",
        "eligibility": [
            "Bedrijven met S&O-activiteiten in Nederland",
            "Minimaal 500 S&O-uren per jaar",
            "Technisch nieuw product, proces of programmatuur"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/wbso"
    },
    {
        "id": "sde-2024",
        "name": "SDE++",
        "category": "Energie",
        "title": "SDE++ - Stimulering Duurzame Energieproductie en Klimaattransitie",
        "description": "De SDE++ subsidie is bedoeld voor bedrijven die hernieuwbare energie produceren of CO2-reducerende technieken toepassen. De subsidie compenseert het verschil tussen de kostprijs van duurzame energie en de marktprijs.",
        "deadline": "Najaar 2024",
        "status": "Open",
        "amount_info": "Afhankelijk van technologie en productie",
        "eligibility": [
            "Energieproductie uit hernieuwbare bronnen",
            "CO2-reducerende maatregelen",
            "Minimale projectomvang vereist"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/sde"
    },
    {
        "id": "mit-2024",
        "name": "MIT",
        "category": "Innovatie",
        "title": "MIT - MKB Innovatiestimulering Regio en Topsectoren",
        "description": "De MIT-regeling stimuleert innovatie bij het MKB. U kunt subsidie krijgen voor haalbaarheidsprojecten, R&D-samenwerkingsprojecten en kennisvouchers.",
        "deadline": "Meerdere rondes per jaar",
        "status": "Open",
        "amount_info": "Tot 40% subsidie op projectkosten",
        "eligibility": [
            "MKB-onderneming",
            "Innovatie- of R&D-project",
            "Samenwerking met kennisinstelling (bij R&D)"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/mit"
    },
    {
        "id": "eia-2024",
        "name": "EIA",
        "category": "Energie",
        "title": "EIA - Energie-investeringsaftrek",
        "description": "Met de EIA kunt u fiscaal voordeel behalen bij investeringen in energiebesparende bedrijfsmiddelen en duurzame energie. U mag een percentage van de investering aftrekken van de fiscale winst.",
        "deadline": "Binnen 3 maanden na investering",
        "status": "Open",
        "amount_info": "45,5% extra aftrek in 2024",
        "eligibility": [
            "Investering in bedrijfsmiddel op de Energielijst",
            "Minimaal €2.500 per bedrijfsmiddel",
            "Aanvraag binnen 3 maanden na opdracht"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/eia"
    },
    {
        "id": "mia-vamil-2024",
        "name": "MIA/Vamil",
        "category": "Milieu",
        "title": "MIA/Vamil - Milieu-investeringsaftrek en Willekeurige afschrijving",
        "description": "Met MIA krijgt u een extra aftrekmogelijkheid van de fiscale winst. Met Vamil mag u zelf bepalen wanneer u afschrijft. Hiermee krijgt u een liquiditeits- en rentevoordeel.",
        "deadline": "Binnen 3 maanden na investering",
        "status": "Open",
        "amount_info": "Tot 45% MIA + Vamil",
        "eligibility": [
            "Investering in bedrijfsmiddel op de Milieulijst",
            "Minimaal €2.500 per bedrijfsmiddel",
            "Aanvraag binnen 3 maanden na opdracht"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/mia-vamil"
    },
    {
        "id": "innovatiebox-2024",
        "name": "Innovatiebox",
        "category": "Fiscaal",
        "title": "Innovatiebox - Verlaagd vennootschapsbelastingtarief",
        "description": "Met de Innovatiebox betaalt u een verlaagd tarief vennootschapsbelasting (9% in plaats van tot 25,8%) over de winst die u behaalt met innovatieve activiteiten.",
        "deadline": "Jaarlijkse belastingaangifte",
        "status": "Open",
        "amount_info": "9% VPB-tarief op innovatiewinst",
        "eligibility": [
            "WBSO-verklaring of octrooi",
            "Zelfontworpen immaterieel activum",
            "Aantoonbare innovatieactiviteiten"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/innovatiebox"
    },
    {
        "id": "bmkb-2024",
        "name": "BMKB",
        "category": "Financiering",
        "title": "BMKB - Borgstelling MKB-kredieten",
        "description": "Met de BMKB garandeert de overheid een deel van uw banklening. Hierdoor kunt u makkelijker financiering krijgen als u onvoldoende zekerheden heeft.",
        "deadline": "Doorlopend beschikbaar",
        "status": "Open",
        "amount_info": "Borgstelling tot 90% van krediet",
        "eligibility": [
            "MKB-onderneming",
            "Levensvatbaar ondernemingsplan",
            "Onvoldoende eigen zekerheden"
        ],
        "url": "https://www.rvo.nl/subsidies-financiering/bmkb"
    }
]


async def get_subsidies() -> List[Dict]:
    """
    Main function to get subsidies - tries scraping first, falls back to static data
    """
    scraper = RVOSubsidyScraper()
    try:
        subsidies = await scraper.scrape_all_subsidies()
        if subsidies:
            return subsidies
    except Exception as e:
        print(f"Scraping failed: {e}")
    finally:
        await scraper.close()
    
    # Return fallback data
    return FALLBACK_SUBSIDIES


# For testing
if __name__ == "__main__":
    async def main():
        subsidies = await get_subsidies()
        for s in subsidies:
            print(f"- {s['name']}: {s['title']}")
    
    asyncio.run(main())
