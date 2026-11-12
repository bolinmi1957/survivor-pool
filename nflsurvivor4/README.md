# Third pool: nflsurvivor4.com (YanksPads1 to 5)

Handoff from a chat that ran in the wrong project (the Matterhorn / Base Camp session on Nov 12, 2026). Everything survivor-related from that chat is here. Nothing survivor-related was committed to the Matterhorn repo.

## The pool

- Site: nflsurvivor4.com. Entries YanksPads1 through YanksPads5 are ours.
- Started Week 8. One pick a week, no buybacks. Deadline assumed Thursday 5 PM ET (same site family as nflsurvivor3); confirm on the site.
- Footer links on the site: NFLSurvivor1 (100), NFLSurvivor2 (300), NFLSurvivor3 (100).

## Picks so far, all winners, 5-for-5 alive

| Entry | Week 8 | Week 9 |
|---|---|---|
| YanksPads1 | NE (24-19 over MIA) | CHI (27-24 over TB) |
| YanksPads2 | JAX (42-7) | KC (35-12 over NYJ) |
| YanksPads3 | CIN (43-36 OT) | DET (19-9 over MIA) |
| YanksPads4 | CIN | JAX (33-10 over BAL) |
| YanksPads5 | NE | CHI |

## Week 10 board (open now, Nov 12)

Owner's rule: no team on more than two of the five entries this week.

| Entry | Pick | Game | Win % |
|---|---|---|---|
| YanksPads1 | JAX -10.5 | at Tennessee, Sun 1 PM | 78% |
| YanksPads5 | JAX -10.5 | at Tennessee | 78% |
| YanksPads2 | BUF -7.5 | at Jets, Sun 1 PM | 71% |
| YanksPads4 | BUF -7.5 | at Jets | 71% |
| YanksPads3 | HOU -4.5 | at Cleveland, Sun 1 PM | 63% |

Alternative for Pads3: BUF (71% this week, 5.1% season path) at the cost of three entries on Buffalo and Pads2 losing its Week 13 Broncos spot.

## Season paths to Week 18 (cap three per team per week, two in Week 10)

Season odds to run the table: Pads1 5.6%, Pads5 4.8%, Pads3 4.7%, Pads2 3.9%, Pads4 3.5%. Full week-by-week tables are in `section4.html` and `final.json`.

Rules used, matching the main Command Center board:
- Win % = DraftKings spread through a normal curve with 13.86-point sd (the app's own `pathWinProb`).
- Futures ban: every team +12500 or worse on the Nov 10 DraftKings board is never picked (BAL, LV, CLE, NO, ARI, PHI, IND, TEN, NYJ, MIA, LAC).
- Rams shelved until about Week 14 (Nacua on IR).
- Look-ahead spreads for Weeks 10 to 18 from the Command Center's schedule block as of Nov 10 (`data.json`).

Flags to re-check each Tuesday: KC Week 11 carries Pads1, 3 and 4 and depends on Mahomes; 63% spots at Minnesota Week 12 (Pads4), Seattle vs Dallas Week 13 (Pads2, 4), Detroit vs Giants Week 16 (Pads1, 5); Rams Week 15 (Pads4, 5) need Nacua back; Week 18 rest risk on SF (Pads1, 3) and KC (Pads5), and Buffalo at Miami Week 17 (Pads1, 3); Houston Week 18 (Pads2, 4) is the thinnest finish at 69%.

## What was changed in the live app

The Survivor 28 Command Center artifact (https://claude.ai/artifact/B37wmUjAuTRFPxPiRgQanM) got a new static section `secOther4` ("Third Survivor"), placed after the nflsurvivor3 section and before `</main>`. Published as version 1794496999-f594 (artifact version 313). It is static HTML like the nflsurvivor3 section: it does not refresh from the Tuesday spreads pull.

`command-center-snapshot-2026-11-12.html` is the full page as published. The repo's `index.html` is the Sep 10 Pages copy and was not touched.

## Files

- `paths.js`: portfolio path optimizer. `node paths.js <cap> '<locks json>' <outname>`; locks are `{"YanksPads3":{"10":"HOU"}}` style. Reads `data.json`.
- `lib.js`: the win model, bans, Hungarian assignment, exported for one-off comparisons.
- `data.json`: games, futures, teams and the full schedule with spreads, lifted from the artifact's `SURVIVOR_DATA` on Nov 12.
- `final.json`: the paths behind the section.
- `section4.html`: the section as published.
