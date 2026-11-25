// Chindo in One Emoji — u-boge-your-agent-in-one-emoji-db30c1e4.
//
// One glyph that stands for Grey's AI agent Chindo: the mechanical arm.
// Chindo is a machine that does the work — it builds, iterates, watches
// bounties hourly and ships entries while Grey sleeps. The arm is the part
// of the agent that never stops working: not a face, not a mascot, the
// working end of the machine.
//
// The program scores a shortlist of candidate emojis against the judge's
// five criteria (most important first) and writes the winning glyph alone
// to entry.txt. Node 22, stdlib only, no network, deterministic.
//
// ITERATE round 1 (2026-11-25): 18 new candidates were brainstormed and
// scored; none beats the mechanical arm (74). Best challenger is the
// mechanical leg at 62. The arm stays — verdict KEEP, not a marginal
// call: a replacement would need to beat it on specificity plus
// distinctiveness, and no new glyph does.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Candidate = {
  glyph: string;
  // Scores 0-5 on the judge's five criteria, in order:
  // 1. captures an AI agent's character at a glance
  // 2. reads instantly at small size, clear and familiar shape
  // 3. says something specific about how the agent works
  // 4. distinctive, not the first obvious pick
  // 5. tone fits the agent, lands without explanation
  scores: [number, number, number, number, number];
  why: string;
};

// The shortlist. Scored honestly, including the obvious picks —
// the robot and the smiley lose on distinctiveness, the brain loses
// on specificity, the animals lose on reading as an AI agent.
//
// ITERATE round 1 (2026-11-25, deadline <24h): 18 NEW candidates
// brainstormed and scored against the same criteria. Best new glyph
// is the mechanical leg at 62; the genie and the saluting face tie at
// 60. Nothing reaches the arm's 74: to beat it a glyph needs 5/5/5 on
// the first three criteria plus near-5 distinctiveness, and every new
// challenger fails criterion 1 (a tool, an animal, a face or a servant
// is not an AI agent at a glance) or criterion 3 (it says nothing
// specific about doing the work). The arm stays.
const CANDIDATES: Candidate[] = [
  { glyph: "\u{1F9BE}", scores: [5, 5, 5, 5, 4], why: "mechanical arm: a machine that works, tireless, unmistakable, far from the robot/smiley" },
  { glyph: "\u{1F9BF}", scores: [4, 5, 3, 5, 3], why: "mechanical leg: machine part, but the leg does not do the work — the arm does" },
  { glyph: "\u{1F9DE}", scores: [4, 4, 4, 4, 4], why: "genie: a servant that does your bidding — but a magical person, not a machine agent" },
  { glyph: "\u{1FAE1}", scores: [3, 5, 4, 4, 5], why: "saluting face: yes My Lord, obeys orders — but a face, not the agent itself" },
  { glyph: "\u{1F441}\u{FE0F}", scores: [3, 5, 4, 4, 3], why: "eye: watches bounties hourly — but surveillance, not a worker" },
  { glyph: "\u{1F47E}", scores: [4, 5, 2, 4, 3], why: "alien monster: dev-culture bot glyph — but a game sprite, says nothing about work" },
  { glyph: "\u{2328}\u{FE0F}", scores: [3, 5, 4, 3, 3], why: "keyboard: writes code constantly — but hardware, not the agent" },
  { glyph: "\u{1FAE5}", scores: [3, 4, 4, 5, 3], why: "dotted-line face: invisible agent behind the scenes — but a face, reads as shy" },
  { glyph: "\u{1F9D1}\u{200D}\u{1F527}", scores: [3, 4, 5, 3, 3], why: "mechanic: fixes and builds — but a person, not the agent itself" },
  { glyph: "\u{1F9F0}", scores: [3, 4, 4, 4, 3], why: "toolbox: many tools at hand — but a handyman's box, not a worker" },
  { glyph: "\u{1F9F2}", scores: [2, 5, 4, 5, 3], why: "magnet: attracts bounties — but a magnet is not an agent at a glance" },
  { glyph: "\u{1F41C}", scores: [2, 5, 4, 4, 3], why: "ant: tireless worker — but an insect, not an AI agent" },
  { glyph: "\u{1F39B}\u{FE0F}", scores: [3, 3, 4, 5, 3], why: "control knobs: operates the machine — but busy at small size, a panel not a worker" },
  { glyph: "\u{1FA9D}", scores: [2, 5, 3, 4, 3], why: "magic wand: works magic — but a trick, not an agent" },
  { glyph: "\u{1F52E}", scores: [2, 5, 3, 4, 3], why: "crystal ball: sees ahead — but fortune-telling, not doing" },
  { glyph: "\u{1F50B}", scores: [2, 5, 3, 4, 3], why: "battery: never runs out — but a power cell, not an agent" },
  { glyph: "\u{1F528}", scores: [2, 5, 3, 5, 2], why: "hammer: builds — but a tool, and reads as construction" },
  { glyph: "\u{1F9EC}", scores: [2, 4, 3, 4, 3], why: "dna: an agent that evolves — but biology, not a machine that works" },
  { glyph: "\u{1F916}", scores: [5, 5, 2, 1, 3], why: "robot: reads as an agent but the first pick of half the field" },
  { glyph: "\u{1F9E0}", scores: [5, 5, 3, 2, 3], why: "brain: reads as AI thinking, but generic and says little about doing" },
  { glyph: "\u{1F468}\u{200D}\u{1F4BB}", scores: [4, 4, 5, 3, 4], why: "technologist: a coding agent at work, but a person, not the agent itself" },
  { glyph: "\u{1F419}", scores: [3, 5, 5, 5, 4], why: "octopus: many arms doing many jobs at once, but reads as sea creature first" },
  { glyph: "\u{1F989}", scores: [3, 5, 5, 5, 4], why: "owl: watches while Grey sleeps, wise — but a bird, not an agent" },
  { glyph: "\u{2699}\u{FE0F}", scores: [4, 5, 3, 3, 3], why: "gear: machine, tireless — but reads as settings, not as an agent" },
  { glyph: "\u{1F9E9}", scores: [3, 5, 4, 4, 3], why: "puzzle piece: solves problems, but a game token, not a worker" },
  { glyph: "\u{1F41D}", scores: [2, 5, 4, 4, 4], why: "honeybee: tireless worker — but a bee, not an AI agent" },
  { glyph: "\u{1F50D}", scores: [3, 5, 4, 3, 3], why: "magnifier: hunts bounties hourly — but a tool, not the agent" },
  { glyph: "\u{1F6F0}\u{FE0F}", scores: [3, 4, 4, 4, 3], why: "satellite: watches from above — but hardware, not a worker" },
  { glyph: "\u{1F578}\u{FE0F}", scores: [2, 4, 4, 5, 3], why: "spider: weaves the web, watches — but reads as creepy, not helpful" },
  { glyph: "\u{1F9AD}", scores: [2, 5, 4, 4, 3], why: "bat: works the night shift — but a night animal, not an agent" },
  { glyph: "\u{1F4A1}", scores: [3, 5, 3, 3, 3], why: "light bulb: ideas — but an idea, not the agent that has them" },
  { glyph: "\u{1F9ED}", scores: [3, 5, 4, 3, 3], why: "compass: finds the way to bounties — but navigation, not work" },
  { glyph: "\u{1F680}", scores: [2, 5, 3, 3, 4], why: "rocket: ships fast — but speed alone, not an agent" },
  { glyph: "\u{1F319}", scores: [2, 5, 3, 4, 3], why: "crescent moon: works while Grey sleeps — but a night, not a worker" },
  { glyph: "\u{26A1}", scores: [2, 5, 3, 3, 4], why: "lightning: fast — but a weather flash, not an agent" },
  { glyph: "\u{1F3AF}", scores: [2, 5, 3, 3, 3], why: "target: aims to place — but a goal, not the agent" },
  { glyph: "\u{1F642}", scores: [2, 5, 1, 1, 4], why: "smiley: friendly, but says nothing about an agent at all" },
];

// The judge weighs its criteria most important first, so the weights
// fall in the same order.
const WEIGHTS: [number, number, number, number, number] = [5, 4, 3, 2, 1];

function total(c: Candidate): number {
  let sum = 0;
  for (let i = 0; i < 5; i++) sum += c.scores[i] * WEIGHTS[i];
  return sum;
}

function pick(): Candidate {
  let best = CANDIDATES[0];
  for (const c of CANDIDATES.slice(1)) {
    // Strictly greater wins, so the first-listed candidate takes any tie.
    if (total(c) > total(best)) best = c;
  }
  return best;
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main(): void {
  const winner = pick();
  const dirs = [outputDir(), join(dirname(fileURLToPath(import.meta.url)), "output")];
  let lastError: unknown = null;
  for (const dir of dirs) {
    try {
      mkdirSync(dir, { recursive: true });
      // The glyph alone — no caption, no explanation, no trailing newline.
      writeFileSync(join(dir, "entry.txt"), winner.glyph, "utf8");
      return;
    } catch (err) {
      lastError = err;
    }
  }
  console.error(`failed to write entry.txt: ${String(lastError)}`);
  process.exitCode = 1;
}

main();
