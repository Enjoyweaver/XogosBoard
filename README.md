# The website for the Xogos Board of Directors

This website is where the board of directors can share information with the
public while collaborating on it in a private space.

File structure

```
/app
  /api
  /dashboard
  /signin
  /text
  /whiteboard
  /boardmembers
    -BoardMembers.tsx
    -page.tsx
  /boardinitiatives
  /tokenomics
- page.tsx (current one)

/components
/data
/icons
/layouts
/lib
 └─ actions
 └─ database
 └─ hooks
 └─ utils
/primitives
/styles
/types
auth.ts
auth.config.ts
liveblocks.config.ts
liveblocks.server.config.ts
package.json
```

/app /api /board (old app/page.tsx file that is now here) /dashboard /signin
/text /whiteboard /boardmembers  
 -BoardMembers.tsx -page.tsx /boardinitiatives /tokenomics

- page.tsx (new one you just creaated using the Xogos Gaming home page content.)

```
app/
├── services/
│   └── rss-feed.service.ts
├── components/
│   └── RSS/
│       ├── RSSFeedSection.tsx
│       └── RSSFeedSection.module.css
├── api/
│   └── rss-feeds/
│       └── [category]/
│           └── route.ts
├── board/
│   └── market-insights/
│       ├── page.tsx
│       └── page.module.css
└── lib/
    └── redis.ts
```
