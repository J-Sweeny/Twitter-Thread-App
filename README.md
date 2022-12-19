# Twitter-Thread-App
Internal tool for creators' at Workweek to draft Twitter threads

— Taps Twitter API to send a new Tweet, request bookmarks, recent tweets, and user metrics. 
— Basic UX for writing new Twitter threads
— Scrapes HTML from email newsletters, resizes it, and displays it on a newsletter landing page based on Medium’s UX
— Dark mode toggles colors across all UI components
— Flask app for routes and error catching.  Used jinja templates to simplify HTML
— Login with Twitter -> pulls username, metrics, and profile picture to use across the site. Saves user authentication of Twitter for future API requests. 

**TODO:**
- Reimplement Postgres database to save Tweet drafts
- Add tweet scheduling features 
- Replace Tweet canvas with ProseMirror editor (currently contenteditable and insecure)
- Fill out Newsletter homepage with sidebar and related content. 
- Build out DMs feature
- Solve for content flash when navigating the site in dark mode 
- Tweet Mechanics: Delete Tweets, upload photos or gifs, fix line breaks, character count
- Rebuild with React, a CSS utility framework like Tailwind, and a responsive, coherent design system Either Twitter white and blue or Workweek black and yellow, not both. 

# Download Twitter Followers
**Problem:** There’s no way for larger accounts to know who their followers are. Twitter won't let you sort them or download them. This script downloads all publicly available information on all of an accounts followers and writes it to a searchable CSV.
— Twitter is wary of people cloning it’s social graph so they rate limit follower API requests to 1500 every 15 minutes. 
— This app pulls 1500 followers, writes them into a CSV, waits 15 minutes, then passes the last pagination token and picks up where it left off, pulling followers and writing them until you have a full list of followers. 

*Tip:* I then passed Twitter handles to the People Data API to get email addresses, LinkedIn and social urls, work history, and other searchable information on followers.  The first 1000 hits are free and after that it’s about 2 cents per hit. It can be extremely useful for enrichment for selling ads. 
