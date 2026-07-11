// src/data/profiles-en/part2.ts
// English-speaking reference profiles (part 2) — US right / conservative & libertarian figures.
// Answer scale is identical to referenceProfiles.ts:
//   0 = "Tout à fait d'accord" (fully agree) … 3 = neutral … 6 = "Pas du tout d'accord" (fully disagree).
// Each answer is coded against the STATEMENT (favoredPole in questions.json), not the axis.

import type { ReferenceProfile } from "../referenceProfiles";

export const profilesEnPart2: ReferenceProfile[] = [
  {
    id: "trump_2024",
    name: "Donald Trump (2024)",
    description:
      "Right-wing populist and nationalist: America First sovereignism and protectionism, hardline immigration and security, social conservatism, deregulation, and a maximalist view of executive power (2024 campaign).",
    color: "#9F1239",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 6,
      q2: 1,
      q3: 1,
      q4: 6,
      q5: 1,
      q6: 1,
      q7: 5,
      q8: 5,
      q9: 1,
      q10: 4, // break up dominant firms → leans no (pro-business deregulation, despite Big-Tech animus)
      q11: 5,
      q97: 1,

      // Purpose of economic activity
      q12: 6,
      q13: 1,
      q14: 1,
      q15: 1,
      q16: 6,

      // --- WORK ---
      q17: 6,
      q18: 4,
      q19: 1,
      q20: 2,
      q21: 1,

      // --- AUTHORITY ---
      q22: 6,
      q23: 0,
      q24: 6,
      q25: 1,
      q26: 1,
      q27: 1,

      // --- DEMOCRACY ---
      q28: 1, // an elected leader can govern without constant consultation → yes (decisive executive)
      q29: 5,
      q30: 4,
      q31: 5,
      q32: 2,
      q33: 4, // experts + reps over direct vote → leans no (distrust of "experts"/deep state)
      q34: 2,

      // --- SOCIAL CHANGE ---
      q35: 6,
      q36: 2, // entrenched institutions block change → yes (drain-the-swamp / anti-establishment)
      q37: 3,
      q38: 2,
      q39: 2,
      q40: 6,

      // --- SOCIETAL PROGRESS ---
      q41: 1,
      q43: 2,
      q44: 6,
      q45: 5,
      q46: 6,
      q47: 6,
      q48: 0, // less gender/diversity, back to basics → strong yes (anti-woke crusade)
      q90: 6,
      q92: 5,
      q99: 5,

      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 6,
      q50: 0, // too much welfare to recent immigrants → strong yes
      q51: 0, // no treaty over national will → strong yes (Paris/Iran/WHO withdrawals)
      q52: 0,
      q53: 5,
      q54: 6,
      q91: 6, // EU as a political project → strong no (hostile, pro-Brexit)

      // --- RELIGION ---
      q55: 4,
      q56: 4,
      q57: 2,
      q58: 4,
      q59: 2,
      q60: 2,

      // --- JUSTICE & SECURITY ---
      q61: 1,
      q62: 1,
      q63: 1,
      q64: 6,
      q65: 5,
      q66: 1,
      q67: 5,
      q68: 5,
      q98: 5,

      // --- ECOLOGY ---
      q69: 6,
      q70: 1, // don't slow industry for ecology → strong yes (drill, deregulate)
      q71: 6,
      q72: 6,
      q73: 1,
      q74: 1,
      q89: 2, // nuclear as future energy (weight 0) → energy-dominance, incl. nuclear

      // --- PUBLIC LIBERTIES ---
      q75: 2,
      q76a: 2,
      q76b: 4, // limit "false info" restricting speech → leans no (anti-censorship framing)
      q77: 1,
      q78: 1,
      q79: 2,
      q80: 1, // emergency powers can suspend liberties → yes (Insurrection Act, border)
      q94: 6,

      // --- TECHNOLOGY & FUTURE ---
      q81: 4,
      q82: 4,
      q83: 4,
      q84: 3,
      q86: 4,
      q88: 2,
      q93: 3,
      q95: 2, // space (created Space Force)
      q96: 5, // decisions on science over tradition/emotion → no (anti-expert)

      q100: 6, // heavy inheritance tax → strong no (abolish estate tax)
      q101: 0,
      q102: 5,
      q103: 1,
    },
  },
  {
    id: "reagan_1984",
    name: "Ronald Reagan (1984)",
    description:
      "Fusionist American conservatism: free-market economics and deep tax cuts, religious moral traditionalism, muscular anti-communism, and a smaller federal government (1984 re-election).",
    color: "#92400E",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 5,
      q2: 1,
      q3: 1,
      q4: 6,
      q5: 1,
      q6: 1,
      q7: 5, // state price controls → no (lifted oil price controls in 1981)
      q8: 5,
      q9: 1,
      q10: 5, // break up dominant firms → no (relaxed antitrust)
      q11: 6,
      q97: 0, // state spends too much, cut taxes → maximal yes (Reaganomics)

      // Purpose of economic activity
      q12: 6,
      q13: 1,
      q14: 1,
      q15: 1,
      q16: 5,

      // --- WORK ---
      q17: 6,
      q18: 5,
      q19: 1,
      q20: 2,
      q21: 1,

      // --- AUTHORITY ---
      q22: 4,
      q23: 2,
      q24: 3, // concentrated power threatens collective interest → split (govt yes, business no)
      q25: 2,
      q26: 2,
      q27: 1,

      // --- DEMOCRACY ---
      q28: 2,
      q29: 4,
      q30: 4, // follow majority even if opposed → leans no (conviction leadership)
      q31: 5,
      q32: 2,
      q33: 4, // experts over the people → leans no (trust in common sense over Washington)
      q34: 2,

      // --- SOCIAL CHANGE ---
      q35: 6, // ban illegal strikes/occupations breaks movements → strong no (fired PATCO strikers)
      q36: 5,
      q37: 2,
      q38: 2,
      q39: 2,
      q40: 6,

      // --- SOCIETAL PROGRESS ---
      q41: 1,
      q43: 1,
      q44: 5,
      q45: 5,
      q46: 5, // gender roles are stereotypes → no (opposed the ERA)
      q47: 6, // affirmative action → strong no
      q48: 1,
      q90: 6,
      q92: 5,
      q99: 5,

      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 4, // borders absurd → leans no, but warmer on immigration ("shining city, doors open")
      q50: 3, // too much welfare to immigrants → split (anti-welfare, yet pro-immigrant)
      q51: 2,
      q52: 4, // no foreign aid at home → leans no (Cold-War aid to allies/"freedom fighters")
      q53: 2, // help peoples in danger → yes (interventionist anti-communism)
      q54: 4,
      q91: 2, // European integration as ally of the West → yes

      // --- RELIGION ---
      q55: 5, // no public money for religion → no (school prayer, tuition tax credits)
      q56: 5, // religious interdicts in law dangerous → no (pro-life author)
      q57: 1,
      q58: 5,
      q59: 1, // losing religious compass → moral drift → strong yes
      q60: 1,

      // --- JUSTICE & SECURITY ---
      q61: 1,
      q62: 1,
      q63: 2,
      q64: 5,
      q65: 5,
      q66: 1,
      q67: 5,
      q68: 5,
      q98: 5,

      // --- ECOLOGY ---
      q69: 5,
      q70: 1, // don't slow industry for ecology → strong yes (deregulation)
      q71: 6,
      q72: 6,
      q73: 2,
      q74: 2,
      q89: 1, // nuclear as future energy (weight 0) → pro-nuclear

      // --- PUBLIC LIBERTIES ---
      q75: 2,
      q76a: 3, // absolute free speech incl. blasphemy → split (Cold-War freedom vs Meese morality)
      q76b: 4,
      q77: 2,
      q78: 1,
      q79: 2,
      q80: 2,
      q94: 6, // free choice of drugs → strong no (War on Drugs, "Just Say No")

      // --- TECHNOLOGY & FUTURE ---
      q81: 4,
      q82: 3,
      q83: 2,
      q84: 3,
      q86: 5, // strictly regulate tech → no (deregulation champion)
      q88: 2,
      q93: 3,
      q95: 1, // massive space investment → yes (SDI / "Star Wars", pro-NASA)
      q96: 4,

      q100: 6, // heavy inheritance tax → strong no
      q101: 1,
      q102: 5,
      q103: 1, // income without work makes people passive → yes ("welfare queen", workfare)
    },
  },
  {
    id: "ron_paul_2012",
    name: "Ron Paul (2012)",
    description:
      "Consistent libertarian: near-absolute free markets and sound money paired with anti-surveillance civil liberties, drug legalization, non-interventionism, and deep distrust of centralized power — the profile that breaks the classic left/right diagonal (2012 primary run).",
    color: "#4D7C0F",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 5,
      q2: 1,
      q3: 0, // no cap on accumulation → maximal yes
      q4: 6,
      q5: 0, // property is the basis of freedom → maximal yes
      q6: 0,
      q7: 6, // state price controls → maximal no (Austrian economics)
      q8: 1,
      q9: 1,
      q10: 6, // state break-ups of firms → no (monopolies come from the state; anti-antitrust)
      q11: 6,
      q97: 0, // cut taxes / shrink the state → maximal yes (abolish IRS, End the Fed)

      // Purpose of economic activity
      q12: 6,
      q13: 0,
      q14: 1,
      q15: 1,
      q16: 5,

      // --- WORK ---
      q17: 5,
      q18: 5,
      q19: 2,
      q20: 2,
      q21: 2,

      // --- AUTHORITY (breaks the diagonal: a "right" figure who is anti-authority) ---
      q22: 1, // authority legit only if criticizable/replaceable → strong yes
      q23: 6, // strong central authority in crisis → strong no (opposed PATRIOT Act / war powers)
      q24: 1, // concentrated power threatens collective interest → strong yes
      q25: 4, // obey even bad laws or it's chaos → leans no (jury nullification, unjust drug laws)
      q26: 4,
      q27: 5, // school should teach obedience to authority → no (homeschool/critical thinking)

      // --- DEMOCRACY ---
      q28: 4,
      q29: 4, // "a republic, not a democracy" — wary of majority overriding individual rights
      q30: 5, // follow the majority even if opposed → no ("Dr. No", conscience over crowd)
      q31: 4,
      q32: 3,
      q33: 5, // experts/reps decide better → no (distrusts the Fed and technocrats)
      q34: 4,

      // --- SOCIAL CHANGE ---
      q35: 3, // banning strikes/occupations → split (civil liberties vs private-property rights)
      q36: 2, // entrenched institutions (Fed, cartels) block change → yes (End the Fed populism)
      q37: 2, // peaceful, legal, constitutional change over revolution → yes
      q38: 2, // change minds through ideas/education (Austrian economics) → yes
      q39: 3,
      q40: 5, // radical eco-collectivist change → no (wrong premise and wrong direction)

      // --- SOCIETAL PROGRESS (personally traditional, politically permissive) ---
      q41: 4, // society too tolerant → leans no (live-and-let-live on victimless behavior)
      q43: 2,
      q44: 5, // identity politics → no (methodological individualism)
      q45: 4,
      q46: 4,
      q47: 6, // affirmative action → strong no
      q48: 2, // less gender/diversity, back to basics → yes (and: abolish the Dept. of Education)
      q90: 5,
      q92: 2, // LGBTQ+ free to live/express → yes on individual liberty (govt out of private lives)
      q99: 5, // mandatory pay-equality measures → no (anti-mandate on contracts)

      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 5, // borders absurd → no (border-security restrictionist, not open-borders)
      q50: 1, // too much welfare to immigrants → yes (welfare state as a magnet)
      q51: 1, // no treaty over national will → strong yes (anti-UN, anti-NAFTA/WTO)
      q52: 1, // no foreign aid → yes (end all foreign aid, unconstitutional)
      q53: 5, // refusing to help a people abroad is cowardice → no (non-interventionism)
      q54: 6, // binding international rules → strong no (anti-global-government)
      q91: 6, // EU-style supranational union → strong no (sovereignty, central banking)

      // --- RELIGION ---
      q55: 3, // no public money for religion → split (no subsidies vs anti-secularist hostility)
      q56: 4, // religious interdicts in law dangerous → leans no (pro-life physician)
      q57: 2,
      q58: 5,
      q59: 2,
      q60: 2,

      // --- JUSTICE & SECURITY (breaks the diagonal: a "right" figure soft on the drug-war carceral state) ---
      q61: 4, // harsher sentences → leans no (against mandatory minimums / mass incarceration)
      q62: 2, // impunity feeds violence → yes for real crimes against persons/property
      q63: 3,
      q64: 2, // restorative justice / victim restitution → yes (libertarian legal theory)
      q65: 2, // a system that doesn't reintegrate fails → yes
      q66: 2,
      q67: 2, // prison hardens criminals → yes (critic of the drug-war prison system)
      q68: 2, // alternatives to prison for most offenses → yes
      q98: 5,

      // --- ECOLOGY ---
      q69: 5,
      q70: 2, // don't slow industry for ecology → yes (anti-EPA regulation)
      q71: 5,
      q72: 5,
      q73: 2,
      q74: 2,
      q89: 2, // nuclear (weight 0) → let the market build it, deregulate

      // --- PUBLIC LIBERTIES (his strongest diagonal-breaking bloc) ---
      q75: 6, // surveil private communications → strong no (Fourth Amendment, anti-NSA)
      q76a: 1, // absolute free speech incl. blasphemy/caricature → yes (First Amendment purist)
      q76b: 6, // limit "false info" restricting speech → strong no (no government truth-arbiter)
      q77: 6, // more ID checks → strong no (anti-national-ID, anti-checkpoint, anti-TSA)
      q78: 5, // police use force more freely → no (against police militarization)
      q79: 6, // permanent CCTV → strong no (privacy)
      q80: 6, // emergency powers suspend liberties → strong no (opposed PATRIOT Act, NDAA)
      q94: 0, // free choice of drugs → maximal yes (drug legalization)

      // --- TECHNOLOGY & FUTURE ---
      q81: 4,
      q82: 3,
      q83: 2,
      q84: 4,
      q86: 5, // strictly regulate tech → no (anti-regulation)
      q88: 2,
      q93: 3,
      q95: 4, // massive (state) space program → leans no (cut NASA, prefer private space)
      q96: 4,

      q100: 6, // heavy inheritance tax → strong no (abolish the estate tax)
      q101: 0,
      q102: 5,
      q103: 1, // income without work makes people passive → yes (welfare creates dependency)
    },
  },
];
