# Sunflower Spa search setup

Primary public website: https://www.sunflowerwellnessspa.com/

## Submit to Google

1. Open https://search.google.com/search-console/ and sign in with the business owner's Google account.
2. Add a **URL-prefix** property: `https://www.sunflowerwellnessspa.com/`.
3. Choose the HTML tag verification method. Send the exact Google verification meta tag to the website maintainer to add to the homepage, then click Verify. No verification token has been added yet.
4. In **Sitemaps**, submit `sitemap.xml` (full URL below).
5. Use URL Inspection on the homepage and each page below; test the live URL and request indexing where available.
6. Monitor Page indexing and Search results reports. Submission does not guarantee indexing or a ranking position.

Sitemap: https://www.sunflowerwellnessspa.com/sitemap.xml
Crawler rules: https://www.sunflowerwellnessspa.com/robots.txt

Pages:
- https://www.sunflowerwellnessspa.com/
- https://www.sunflowerwellnessspa.com/massage-treatments/
- https://www.sunflowerwellnessspa.com/spa-in-kisasi/
- https://www.sunflowerwellnessspa.com/spa-in-bukoto/

## Local discovery

Claim or update the existing Google Business Profile for each eligible branch; avoid duplicate listings. Use the real business name, exact location pin, accurate opening hours, primary phone +256 770 768 705, actual services, and current photos. Link each profile to its corresponding branch page. Follow Google's verification flow. These profiles have not been claimed or edited as part of the website update.

Ask real customers for honest reviews without incentives, and respond to them. Keep the spa's name, phone and addresses consistent across Facebook, business directories and the website. Add the website link to the spa's social profiles. The supplied TikTok URL is a discovery page, not an official account, so it is deliberately excluded from identity structured data.

## Bing and validation

Add and verify the site in https://www.bing.com/webmasters/ and submit the same sitemap. Do not treat the robots.txt sitemap reference as a Search Console submission.

Test structured data at https://search.google.com/test/rich-results and general vocabulary at https://validator.schema.org/ . Check performance at https://pagespeed.web.dev/ . Real rankings and indexing must be measured after search engines crawl the site.

## Maintenance

The source of treatment prices is `dist/app.js`. Run `node build-seo.cjs` after service changes to regenerate crawlable prices, structured data and supporting pages. Update the sitemap lastmod date only when page content materially changes. Keep canonical URLs and sitemap URLs aligned if adopting a custom domain, and redirect old public URLs permanently. Do not use fragment links as sitemap pages.

No fabricated ratings, opening hours, geographic coordinates, medical claims, keyword stuffing or hidden keyword lists were added. Known branch addresses are used; ask the owner for exact pins and confirmed hours before adding them. The secondary Sites preview remains owner-private. Canonical URLs point to the custom domain.

Sources:
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://support.google.com/webmasters/answer/34592
- https://support.google.com/business/answer/7091
