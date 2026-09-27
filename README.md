# st-projects-00.github.io

The ST Projects developer site, served by GitHub Pages from the `main` branch at
https://st-projects-00.github.io

| Path | Page |
|---|---|
| `/` | Developer page listing the apps |
| `/petal-pop/privacy/` | Petal Pop privacy policy (the URL for Play Console) |
| `/petal-pop/delete-data/` | Petal Pop data deletion page (the deletion URL for Play's Data safety form) |

Plain static HTML with one shared `style.css`, system fonts, and no analytics or trackers.
`.nojekyll` turns off Jekyll processing.

Edit on a `feature/*` branch off `develop`, then merge to `main` to publish.

## app-ads.txt (to do)

`/app-ads.txt` is deliberately **not** in the repo yet, because it must contain the real AdMob publisher ID.
Once you have one (AdMob > Settings > Account information, `pub-XXXXXXXXXXXXXXXX`), create `app-ads.txt`
in the repo root with exactly this line, with your ID in place of the X's:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

It will then be served at `https://st-projects-00.github.io/app-ads.txt`. For AdMob to find it, the
**developer website** in every app's Play Store listing must be exactly `https://st-projects-00.github.io`.
