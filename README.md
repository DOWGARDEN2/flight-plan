# Flight Plan

A daily planner that tells James one thing: what to do today to walk into the August 22 SAT with a Math 700+, a stronger Reading & Writing score, and every college application filed early.

You install it from your phone's home screen. No login, no account, no internet after the first load. Everything you check off saves to your phone.

## What it does

- **Today** — the phase you're in, a countdown to the SAT and the Nov 1 EA deadline, a progress ring, and the exact tasks for today. Tap any task to see the step-by-step procedure. The SAT and Reading work is tagged "Big 4" and sits at the top.
- **Week** — your seven-day rhythm at a glance. Tap a chip to check off any day.
- **Plan** — the whole map: the five phases, every hard deadline, the school list, and where your next hour should go.
- **Progress** — your streak and a 30-day bar for each area, so you can see consistency build.
- **Add** — drop in a one-off task, and export/import a backup of your data.

## The SAT method baked in

Every SAT session follows what moves a score:

- **Math (Mon/Wed/Fri, 75 min):** Desmos warmup, one timed module, an error log that tags every miss as careless / didn't-know / too-slow, then targeted reps on exactly what you missed. The error log is where the points come from.
- **Reading & Writing (Tue/Thu/Sat, 45 min):** timed skill sets, the predict-before-you-look habit for transitions and vocabulary, the goal-first method for rhetorical synthesis, and the punctuation rule set — then a review log.
- Both lean on the free official tools: the Bluebook app for full adaptive tests, the College Board Question Bank for targeted drills, and Khan Academy for the lessons behind your misses.

## Run it on your computer

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Put it on your phone (GitHub Pages)

1. Make a new GitHub repo named **`flight-plan`** (the name matters — the app is configured for that path). If you use a different name, change `BASE` in `vite.config.ts` and the paths in `index.html` to match.
2. Push this folder to it:
   ```bash
   git remote add origin https://github.com/<your-username>/flight-plan.git
   git branch -M main
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
4. The included workflow builds and deploys on every push. After it finishes, your app is live at `https://<your-username>.github.io/flight-plan/`.
5. On your iPhone, open that link in Safari → Share → **Add to Home Screen.** It opens full-screen and works offline.

## Your data

It all lives in your phone's browser storage. Nothing leaves the device. Before you clear your browser or switch phones, use **Add → Export backup** to save a file, and **Import backup** to restore it.

## A note on the plan

The investing tasks are a framework, not financial advice — set up any accounts with your parents. Confirm the exact August SAT date and every application deadline on the official sites before you rely on them.

---

Built with Vite + React + TypeScript. Tech stack and screens follow the build spec in `james-master-plan-and-app-spec.md`.
