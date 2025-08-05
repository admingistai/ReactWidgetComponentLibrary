/**
 * Autocomplete data source for New York Times search suggestions
 * Curated list of relevant search queries and topics
 */

export const AUTOCOMPLETE_SUGGESTIONS = [
  // A-starting suggestions
  "Apple earnings report",
  "Art exhibition reviews",
  "Amazon news updates",
  "Australia travel guide",
  "Artificial intelligence",
  "Arts & culture",
  "Apartment hunting tips",
  "Airline industry news",

  // B-starting suggestions  
  "Breaking news today",
  "Business news",
  "Book reviews",
  "Basketball scores",
  "Broadway shows",
  "Biden administration",
  "Budget proposals",
  "Banking sector news",

  // C-starting suggestions
  "Climate change",
  "Congressional hearings", 
  "Celebrity news",
  "Cooking recipes",
  "Crossword puzzle",
  "College admissions",
  "Cryptocurrency news",
  "COVID-19 updates",

  // D-starting suggestions
  "Democratic primary",
  "Dining recommendations",
  "Documentary reviews",
  "Drama series reviews",
  "Data privacy issues",
  "Debt ceiling debate",
  "Development news",
  "Dance performances",

  // E-starting suggestions
  "Eclipse coverage",
  "Economics explained", 
  "Ecuador travel",
  "Edge computing news",
  "Election updates",
  "Economic forecast",
  "Editorial board",
  "Education policy",
  "Environmental policy",
  "Entertainment news",
  "Europe travel",
  "Energy sector news",

  // F-starting suggestions
  "Fashion trends",
  "Film festival coverage",
  "Federal Reserve news",
  "Food safety alerts",
  "Football scores",
  "Foreign policy",
  "Financial markets",
  "Fitness trends",

  // G-starting suggestions
  "Global warming",
  "Government shutdown",
  "Gaza conflict updates",
  "Gaming industry news",
  "Grocery price trends",
  "Gender equality",
  "Green energy",
  "Grammy Awards",

  // H-starting suggestions (expanded)
  "Health updates",
  "Healthcare reform", 
  "Headlines today",
  "History articles",
  "Housing market",
  "Hurricane updates",
  "Holiday news",
  "Human interest stories",
  "Health and wellness",
  "High school sports",
  "Hollywood news",
  "Home and garden",
  "How to understand",

  // Other letters and categories
  "Immigration news",
  "International relations",
  "Infrastructure updates",
  "Investment advice",
  "Jazz festival reviews",
  "Job market trends",
  "Judicial nominations",
  "Kentucky Derby",
  "Labor union news",
  "Local news updates",
  "Movie reviews",
  "Music festival coverage",
  "NATO summit",
  "Opinion pieces today",
  "Politics news",
  "Presidential campaign",
  "Qatar World Cup",
  "Restaurant reviews",
  "Real estate market",
  "Science discoveries",
  "Sports headlines",
  "Supreme Court decisions",
  "Technology news",
  "Travel guides",
  "Ukraine conflict",
  "U.S. news",
  "Vaccine developments",
  "Weather alerts",
  "What is happening in",
  "When did this happen",
  "Where is the latest",
  "Who said what about",
  "Why is this important",
  "World news",
  "X platform changes",
  "Yale university news",
  "Zoning law changes"
];

/**
 * Filter suggestions based on user input
 * @param query - User's search input
 * @param maxResults - Maximum number of results to return
 * @returns Filtered array of suggestions
 */
export function filterSuggestions(query: string, maxResults: number = 6): string[] {
  if (!query.trim()) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase().trim();
  
  // ONLY filter suggestions that START with the query (prefix matching)
  const filtered = AUTOCOMPLETE_SUGGESTIONS.filter(suggestion =>
    suggestion.toLowerCase().startsWith(lowercaseQuery)
  );

  // Simple alphabetical sort since all results match the prefix
  const sorted = filtered.sort((a, b) => a.localeCompare(b));

  return sorted.slice(0, maxResults);
}