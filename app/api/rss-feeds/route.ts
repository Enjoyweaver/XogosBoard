// app/api/rss-feeds/route.ts
import { NextRequest, NextResponse } from "next/server";
import { RSSFeedService } from "../../services/rss-feed.service";

const feedService = new RSSFeedService();

export async function GET(request: NextRequest) {
  try {
    // Get category from query parameters instead of route params
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ["crypto", "education", "regulation", "gaming"];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Get feeds with commentary
    const feeds = await feedService.getFeedsByCategory(category);

    // Log the results for debugging
    console.log(`Found ${feeds.length} feeds for category: ${category}`);

    // Set cache headers for CDN
    const response = NextResponse.json(feeds);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("RSS feed error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication - only board members can add commentary
    // const session = await auth();
    // if (!session?.user?.role?.includes('board')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { feedGuid, commentary } = body;

    if (!feedGuid || !commentary) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await feedService.addCommentary(feedGuid, commentary);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Commentary error:", error);
    return NextResponse.json(
      { error: "Failed to add commentary" },
      { status: 500 }
    );
  }
}
