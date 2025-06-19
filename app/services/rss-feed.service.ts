// app/services/rss-feed.service.ts
import Parser from "rss-parser";

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  categories?: string[];
  creator?: string;
  guid: string;
}

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: "crypto" | "education" | "regulation" | "gaming";
  priority: number;
  useProxy?: boolean; // Add proxy flag for government feeds
}

export interface FeedWithCommentary {
  item: RSSItem;
  commentary?: {
    id: string;
    author: string;
    role: string;
    content: string;
    sentiment: "positive" | "neutral" | "negative";
    createdAt: string;
  };
}

// In-memory cache (resets when server restarts, but that's fine for now)
const feedCache = new Map<
  string,
  { data: FeedWithCommentary[]; timestamp: number }
>();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Curated feed sources aligned with Xogos mission and regulatory focus
const FEED_SOURCES: FeedSource[] = [
  // SEC Feeds - Using proxy to bypass CORS/403 issues
  {
    id: "sec-press",
    name: "SEC Press Releases",
    url: "https://www.sec.gov/rss/news/press.xml",
    category: "regulation",
    priority: 1,
    useProxy: true,
  },
  {
    id: "sec-litigation",
    name: "SEC Litigation",
    url: "https://www.sec.gov/rss/litigation.xml",
    category: "regulation",
    priority: 1,
    useProxy: true,
  },
  {
    id: "sec-investor-alerts",
    name: "SEC Investor Alerts",
    url: "https://www.sec.gov/rss/investor/alerts.xml",
    category: "regulation",
    priority: 2,
    useProxy: true,
  },
  {
    id: "sec-proposed-rules",
    name: "SEC Proposed Rules",
    url: "https://www.sec.gov/rss/rules/proposed.xml",
    category: "regulation",
    priority: 1,
    useProxy: true,
  },
  {
    id: "sec-final-rules",
    name: "SEC Final Rules",
    url: "https://www.sec.gov/rss/rules/final.xml",
    category: "regulation",
    priority: 1,
    useProxy: true,
  },

  // CFTC Feeds - Also using proxy
  {
    id: "cftc-newsroom",
    name: "CFTC Newsroom",
    url: "https://www.cftc.gov/rss/newsroom.xml",
    category: "regulation",
    priority: 2,
    useProxy: true,
  },
  {
    id: "cftc-enforcement",
    name: "CFTC Enforcement",
    url: "https://www.cftc.gov/rss/enforcement.xml",
    category: "regulation",
    priority: 2,
    useProxy: true,
  },

  // Crypto & Legal News (these work without proxy)
  {
    id: "coindesk-main",
    name: "CoinDesk",
    url: "https://www.coindesk.com/arc/outboundfeeds/rss?outputType=xml",
    category: "crypto",
    priority: 1,
  },
  {
    id: "cointelegraph",
    name: "Cointelegraph",
    url: "https://cointelegraph.com/rss",
    category: "crypto",
    priority: 2,
  },
  {
    id: "cointelegraph-regulation",
    name: "Cointelegraph Regulation",
    url: "https://cointelegraph.com/rss/tag/regulation",
    category: "regulation",
    priority: 3,
  },

  // Education feeds
  {
    id: "elearning-industry",
    name: "eLearning Industry",
    url: "https://elearningindustry.com/feed",
    category: "education",
    priority: 1,
  },
  {
    id: "eschool-news",
    name: "eSchool News",
    url: "https://www.eschoolnews.com/feed/",
    category: "education",
    priority: 2,
  },

  // Gaming feeds
  {
    id: "polygon",
    name: "Polygon",
    url: "https://www.polygon.com/rss/index.xml",
    category: "gaming",
    priority: 1,
  },
  {
    id: "venturebeat-games",
    name: "VentureBeat Games",
    url: "https://venturebeat.com/category/games/feed/",
    category: "gaming",
    priority: 2,
  },
];

export class RSSFeedService {
  private parser: Parser;
  private cacheExpiry = 900; // 15 minutes

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ["creator", "categories"],
      },
    });
  }

  async getFeedsByCategory(category: string): Promise<FeedWithCommentary[]> {
    const cacheKey = `rss:category:${category}`;

    // Check in-memory cache first
    const cached = feedCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Returning cached results for ${category}`);
      return cached.data;
    }

    const relevantSources = FEED_SOURCES.filter((s) => s.category === category);
    console.log(
      `Found ${relevantSources.length} sources for category: ${category}`
    );
    const allItems: FeedWithCommentary[] = [];

    // Fetch feeds in parallel with error handling
    await Promise.allSettled(
      relevantSources.map(async (source) => {
        try {
          console.log(`Fetching ${source.name} from ${source.url}`);

          let feedUrl = source.url;

          // Use a CORS proxy for government feeds
          if (source.useProxy) {
            // Using a public CORS proxy - in production, use your own proxy server
            feedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`;
            console.log(`Using proxy for ${source.name}`);
          }

          const feed = await this.parser.parseURL(feedUrl);
          const items = feed.items.slice(0, 5).map((item) => ({
            item: {
              title: this.sanitizeTitle(item.title || ""),
              link: item.link || "",
              pubDate: item.pubDate || new Date().toISOString(),
              contentSnippet: this.truncateContent(
                item.contentSnippet || item.content || ""
              ),
              categories: this.extractCategories(item.categories || []),
              creator: item.creator || source.name,
              guid: item.guid || item.link || "",
            },
          }));
          allItems.push(...items);
          console.log(
            `✓ Successfully fetched ${items.length} items from ${source.name}`
          );
        } catch (error: any) {
          console.error(
            `✗ Failed to fetch ${source.name} (${source.url}):`,
            error.message || error
          );
          // Continue with other feeds
        }
      })
    );

    // Log summary
    console.log(`Total items fetched for ${category}: ${allItems.length}`);

    // Sort by date and priority
    const sorted = allItems
      .sort(
        (a, b) =>
          new Date(b.item.pubDate).getTime() -
          new Date(a.item.pubDate).getTime()
      )
      .slice(0, 10);

    // Cache the results in memory
    feedCache.set(cacheKey, {
      data: sorted,
      timestamp: Date.now(),
    });

    return sorted;
  }

  private sanitizeTitle(title: string): string {
    // Remove common feed artifacts
    return title
      .replace(/\[.*?\]/g, "") // Remove brackets
      .replace(/&amp;/g, "&")
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();
  }

  private truncateContent(content: string, maxLength = 200): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  }

  private extractCategories(categories: any[]): string[] {
    if (!categories || !Array.isArray(categories)) return [];

    return categories
      .map((cat) => {
        if (typeof cat === "string") {
          return cat;
        } else if (cat && typeof cat === "object") {
          // Handle the object format from some RSS feeds
          if (cat._) return cat._;
          if (cat.$ && cat.$.term) return cat.$.term;
          if (cat.name) return cat.name;
        }
        return "";
      })
      .filter(Boolean);
  }

  async addCommentary(
    feedGuid: string,
    commentary: Omit<FeedWithCommentary["commentary"], "id" | "createdAt">
  ): Promise<void> {
    // Store in database (Supabase)
    // This is a placeholder - implement with your Supabase client
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Store commentary in database
    // await supabase.from('feed_commentary').insert({
    //   id,
    //   feed_guid: feedGuid,
    //   ...commentary,
    //   created_at: createdAt
    // });

    // Invalidate cache to show new commentary
    feedCache.clear(); // Simple cache clear
  }
}
