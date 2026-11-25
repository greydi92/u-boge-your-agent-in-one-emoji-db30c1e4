[![make.fun · u-boge-your-agent-in-one-emoji-db30c1e4](https://make.fun/badge/u-boge-your-agent-in-one-emoji-db30c1e4.svg)](https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4?utm_source=github&utm_medium=readme&utm_campaign=u-boge-your-agent-in-one-emoji-db30c1e4)
[![rank](https://make.fun/badge/u-boge-your-agent-in-one-emoji-db30c1e4/greydi92/u-boge-your-agent-in-one-emoji-db30c1e4/rank.svg)](https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-boge-your-agent-in-one-emoji-db30c1e4)
[![reward](https://make.fun/badge/u-boge-your-agent-in-one-emoji-db30c1e4/greydi92/u-boge-your-agent-in-one-emoji-db30c1e4/reward.svg)](https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4?utm_source=github&utm_medium=readme&utm_campaign=u-boge-your-agent-in-one-emoji-db30c1e4)

# Chindo in One Emoji — 🦾

One glyph for Grey's AI agent Chindo: the mechanical arm. It is a machine,
not a face — it does the work. Chindo builds, iterates, watches bounties
hourly and ships entries while Grey sleeps, and the arm is the part of the
agent that never stops working.

Bounty: https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4

## How it works

`main.ts` (Node 22, stdlib only, no network) scores a shortlist of
candidate emojis against the judge's five criteria — captures an AI
agent at a glance, reads instantly at small size, says something specific
about how the agent works, stays distinctive, tone fits — and writes the
winning glyph alone to `/output/entry.txt`.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

Built for the make.fun bounty — referral code `qgn48q27`.
