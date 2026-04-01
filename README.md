# GolfLink – POC

A social platform for golfers. Proof of concept with mocked data and simulated integrations.

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a repo called `golflink` on GitHub
2. Push this code to `main`
3. Go to **Settings → Pages → Source → GitHub Actions**
4. The workflow deploys automatically on push

The app will be live at `https://<your-username>.github.io/golflink/`

### Change the base path

If your repo name is different from `golflink`, update the `base` value in `vite.config.js` to match:

```js
base: '/your-repo-name/',
```

## What is mocked

- Authentication (demo persona selector, no real auth)
- Handicap sync (England Golf, Scottish Golf, Wales Golf, iGolf, HowDidiDo)
- Messaging between matched golfers
- Guest round request/accept flow
- Club community features
- All user data and feed content
