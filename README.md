# st-projects-00.github.io

The ST Projects developer site, served by GitHub Pages from the `main` branch at
https://st-projects-00.github.io

| Path | Page |
|---|---|
| `/` | Developer page listing the apps |
| `/petalwick/privacy/` | Petalwick privacy policy (the URL for Play Console) |
| `/petalwick/delete-data/` | Petalwick data deletion page (the deletion URL for Play's Data safety form) |

Plain static HTML with one shared `style.css`, system fonts, and no analytics or trackers.
`.nojekyll` turns off Jekyll processing.

Edit on a `feature/*` branch off `develop`, then merge to `main` to publish.

## app-ads.txt

`/app-ads.txt` authorises Google AdMob to sell ads in our apps. It contains the AdMob publisher ID:

```
google.com, pub-7073759238735744, DIRECT, f08c47fec0942fa0
```

The same line covers every app on this AdMob account, so there's nothing to add per game. It's served at `https://st-projects-00.github.io/app-ads.txt`. For AdMob to find it, the
**developer website** in every app's Play Store listing must be exactly `https://st-projects-00.github.io`.

Old paths (`/petal-pop/`, `/gate-glide/`, `/aether-vanguard/`, `/stoppage-time/`) are redirect stubs to the renamed paths, so older app builds and links keep working.
