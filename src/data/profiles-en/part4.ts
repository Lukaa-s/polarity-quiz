// src/data/profiles-en/part4.ts
// English-speaking reference profiles (part 4)
// Answer scale: 0 = fully agree with the statement, 3 = neutral, 6 = fully disagree.
// Each answer is calibrated to the figure's documented positions AT THE STATED YEAR,
// answering the literal statement (some statements lean left, others right).

import type { ReferenceProfile } from "../referenceProfiles";

export const profilesEnPart4: ReferenceProfile[] = [
  {
    id: "farage_2024",
    name: "Nigel Farage (2024)",
    description:
      "Reform UK's national-populist figurehead: maximal Euroscepticism and border sovereignty, Thatcherite low-tax economics, climate-relativist, anti-elite and pro-referendum.",
    color: "#7C2D12",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 5, // worker co-decision/profit-sharing → no (pro-business)
      q2: 1, // owning 10 flats to rent → legitimate
      q3: 1, // accumulate wealth without cap → yes
      q4: 6, // requisition empty buildings → no (strong property rights)
      q5: 0, // ownership = freedom → strongly yes
      q100: 6, // heavily tax large inheritances → no (Thatcherite, cut inheritance tax)
      q6: 1, // competition > state monopoly → yes
      q7: 5, // state price controls in crisis → no (free market)
      q8: 2, // private health/school → leans yes (insurance-model sympathies)
      q9: 2, // boss sets own pay → yes, with populist reserve
      q10: 4, // break up dominant firms → leans no (free-marketeer)
      q11: 4, // nationalise energy/rail/water → leans no (Thatcherite)
      q97: 0, // state spends too much, cut taxes → strongly yes

      // --- PURPOSE OF ECONOMY ---
      q12: 5, // fortunes built on exploitation → no
      q13: 1, // legal fortune never capped → yes
      q14: 1, // profit motive drives progress → yes
      q15: 1, // entrepreneur deserves to get rich → yes
      q16: 5, // firm should serve people not owners → no
      q101: 1, // profit lifted billions from poverty → yes

      // --- WORK ---
      q17: 5, // 30h week even if poorer → no (work ethic)
      q18: 5, // carer/cleaner paid more than trader → no
      q19: 1, // dignity of manual work → yes
      q20: 2, // effort commands respect → leans yes
      q21: 1, // work gives life meaning → yes
      q102: 5, // world without obligation to work → no
      q103: 1, // no-strings income makes people passive → yes

      // --- AUTHORITY ---
      q22: 4, // authority only if replaceable anytime → leans no (statist/traditional)
      q23: 3, // strong central authority in crisis → ambivalent (anti-lockdown vs patriot)
      q24: 2, // concentrated power threatens all → leans yes (anti-establishment)
      q25: 1, // law must apply to all → yes (law and order)
      q26: 2, // no leader = paralysis → leans yes
      q27: 1, // school teaches discipline/respect → yes

      // --- DEMOCRACY (populist → left on this axis) ---
      q28: 5, // rep governs without consulting → no
      q29: 0, // major laws by referendum → strongly yes
      q30: 1, // electeds must follow the majority → yes (will of the people)
      q31: 1, // 5-yearly vote not enough → yes
      q32: 5, // direct votes captured by minorities → no (trusts the people)
      q33: 5, // reps + experts over direct vote → no (anti-expert)
      q34: 5, // leader should defy popular opinion → no

      // --- SOCIAL CHANGE ---
      q35: 5, // banning wildcat strikes breaks movements → no (pro-order)
      q36: 3, // system captured, no reform works → ambivalent (anti-establishment yet not anticapitalist)
      q37: 2, // slow legal change over revolution → leans yes
      q38: 2, // change via education not the street → leans yes
      q39: 2, // stable imperfect society over rupture → leans yes
      q40: 5, // radical model change for emergencies → no

      // --- SOCIETAL PROGRESS (conservative / anti-woke) ---
      q41: 1, // society too tolerant of rule-breaking → yes
      q43: 3, // child needs father+mother → ambivalent (personally relaxed on gay rights)
      q44: 5, // highlight differences over universalism → no (assimilationist)
      q45: 4, // scrap demeaning traditions → leans no (defends heritage)
      q46: 5, // gender roles are mere stereotypes → no
      q47: 5, // affirmative action → no (meritocracy)
      q48: 0, // school: back to basics, less identity → strongly yes
      q90: 6, // abolish animal farming → no (pro-countryside/fishing)
      q92: 2, // LGBTQ+ live freely → leans yes (personally liberal)
      q98: 5, // animal cruelty = human violence → no
      q99: 5, // gender equality unfinished → no (he thinks it's largely achieved)

      // --- IMMIGRATION & SOVEREIGNTY (core: maximal) ---
      q49: 6, // borders "a line on a map" → no, borders essential
      q50: 0, // too much aid to recent immigrants → strongly yes
      q51: 0, // no treaty against the people's will → strongly yes
      q52: 0, // no foreign aid while poor at home → strongly yes
      q53: 5, // refusing to help = cowardice → no (national priority)
      q54: 6, // binding international rules → no (sovereigntist)
      q91: 6, // EU is good → maximal disagreement (Mr Brexit)

      // --- RELIGION (culturally Christian, not theocratic) ---
      q55: 4, // no public money for worship → leans no (preserve church heritage)
      q56: 2, // law shouldn't enforce religious bans → leans yes (secular/libertarian)
      q57: 3, // losing faith → worse creeds → ambivalent
      q58: 4, // be wary of religions → leans no (defends Judeo-Christian heritage)
      q59: 3, // losing religion = moral drift → ambivalent
      q60: 2, // religion good for social bond → leans yes

      // --- JUSTICE & SECURITY (law and order) ---
      q61: 1, // harsher sentences → yes
      q62: 1, // impunity feeds violence → yes
      q63: 1, // some crimes no remission → yes
      q64: 5, // trial done once victim heard → no (wants punishment)
      q65: 4, // no rehab = failed justice → leans no (punishment first)
      q66: 1, // repeat rapist locked up for life → yes
      q67: 4, // prison hardens criminals → leans no (prison works)
      q68: 5, // alternatives replace prison → no

      // --- ECOLOGY (climate-relativist, productivist) ---
      q69: 6, // climate needs strong constraints → no
      q70: 1, // don't hinder industry for ecology → yes
      q71: 5, // green capitalism an illusion → no
      q72: 6, // planet before growth, no compromise → no
      q73: 1, // no need to cut comfort → yes
      q74: 1, // tech fixes ecology without lifestyle change → yes
      q89: 1, // nuclear as future energy → yes (Reform pro-nuclear)

      // --- LIBERTY & SECURITY (security hawk but free-speech absolutist) ---
      q75: 2, // monitor comms vs terrorism → leans yes
      q76a: 1, // right to blaspheme/caricature → yes (free-speech champion)
      q76b: 5, // limit fake news → no (anti-censorship)
      q77: 2, // more ID checks/stop-and-search → leans yes
      q78: 1, // police freer use of force → yes (back the police)
      q79: 2, // pervasive CCTV → leans yes
      q80: 3, // emergency powers → ambivalent (anti-lockdown vs anti-terror)
      q94: 2, // adults free to use any drug → leans yes (libertarian streak)

      // --- TECHNOLOGY ---
      q81: 4, // AI destroys more jobs → leans no (pro-innovation)
      q82: 2, // no opaque algorithms for big decisions → leans yes
      q83: 2, // human gene editing → dangerous → leans yes (cautious)
      q84: 4, // social media net harmful → leans no (bypasses MSM)
      q86: 4, // strictly regulate tech → leans no (anti-regulation)
      q88: 2, // develop AI unhindered → leans yes (competitiveness)
      q93: 3, // embryo editing to prevent disease → ambivalent
      q95: 3, // space conquest → ambivalent (Earth first)
      q96: 4, // decisions on science not tradition → leans no (values tradition, climate-sceptic)
    },
  },
  {
    id: "trudeau_2015",
    name: "Justin Trudeau (2015)",
    description:
      "Liberal 'Sunny Ways' progressive: assertive social liberalism (cannabis legalisation, feminism, LGBTQ rights), multiculturalism and internationalism, an economic centrist who balances climate action with pipelines.",
    color: "#DB2777",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 4, // worker co-decision → leans no (centrist)
      q2: 2, // owning 10 flats → leans fine (2015, market-friendly)
      q3: 4, // wealth without cap → leans no (taxed the top 1%)
      q4: 4, // requisition empty buildings → leans no
      q5: 2, // ownership = freedom → leans yes
      q100: 4, // heavily tax large inheritances → leans no (no such tax in Canada; centrist)
      q6: 2, // competition > monopoly → leans yes
      q7: 3, // crisis price controls → ambivalent
      q8: 5, // private health/school → no (defends public health)
      q9: 4, // boss sets own pay → leans no (middle-class focus)
      q10: 4, // break up dominant firms → leans no (centrist)
      q11: 4, // nationalise utilities → leans no
      q97: 5, // state spends too much → no (ran on deficit investment)

      // --- PURPOSE OF ECONOMY ---
      q12: 4, // fortunes = exploitation → leans no
      q13: 4, // fortune never taxed → leans no (raised top-1% tax)
      q14: 2, // profit drives progress → leans yes
      q15: 2, // entrepreneur deserves reward → leans yes
      q16: 2, // firm should serve people → leans yes (grow the middle class)
      q101: 2, // profit lifted billions from poverty → leans yes (market-friendly)

      // --- WORK ---
      q17: 4, // 30h week → leans no
      q18: 2, // essential workers underpaid → leans yes
      q19: 2, // dignity of manual work → leans yes
      q20: 2, // effort over money → leans yes
      q21: 2, // work gives meaning → leans yes
      q102: 4, // world without work → leans no
      q103: 4, // no-strings income makes passive → leans no

      // --- AUTHORITY ---
      q22: 2, // authority must be accountable → leans yes
      q23: 2, // strong central authority in crisis → leans yes (federal coordination)
      q24: 2, // concentrated power threatens all → leans yes
      q25: 2, // rule of law → leans yes
      q26: 2, // no leader = paralysis → leans yes
      q27: 4, // school = discipline/respect → leans no (critical thinking)

      // --- DEMOCRACY (parliamentarian) ---
      q28: 4, // govern without consulting → leans no (ran on openness)
      q29: 4, // major laws by referendum → leans no (parliamentary)
      q30: 4, // electeds must obey majority → leans no (reps exercise judgment)
      q31: 4, // 5-yearly vote not enough → leans no
      q32: 2, // direct votes captured by minorities → leans yes
      q33: 2, // reps + experts over direct vote → yes (evidence-based)
      q34: 4, // leader defies opinion → leans no (Sunny Ways listens)

      // --- SOCIAL CHANGE ---
      q35: 3, // banning wildcat strikes → ambivalent (labour vs order)
      q36: 5, // system captured, no reform → no (institutionalist)
      q37: 2, // slow legal change over revolution → leans yes
      q38: 2, // change via education not street → leans yes
      q39: 2, // stability over rupture → leans yes
      q40: 4, // radical model change → leans no (gradualist)

      // --- SOCIETAL PROGRESS (strongly progressive) ---
      q41: 5, // society too tolerant → no
      q43: 6, // child needs father+mother → strongly no (LGBTQ ally)
      q44: 1, // highlight differences → yes ("diversity is our strength")
      q45: 1, // scrap demeaning traditions → yes
      q46: 1, // gender roles are stereotypes → yes (feminist)
      q47: 1, // affirmative action → yes (gender-balanced cabinet)
      q48: 5, // school: less identity content → no
      q90: 5, // abolish animal farming → no
      q92: 0, // LGBTQ+ live freely → strongly yes
      q98: 4, // animal cruelty = human violence → leans no
      q99: 1, // gender equality unfinished → yes (feminist)

      // --- IMMIGRATION & SOVEREIGNTY (internationalist) ---
      q49: 2, // borders "a line on a map" → leans agree (cosmopolitan)
      q50: 5, // too much aid to immigrants → no (welcomed refugees)
      q51: 4, // no treaty against the people → leans no (pro-treaties)
      q52: 5, // no foreign aid while poor at home → no (Canada is back)
      q53: 1, // refusing help = cowardice → yes (humanitarian)
      q54: 1, // binding international rules → yes (Paris Agreement)
      q91: 2, // EU/supranational cooperation good → leans yes (CETA)

      // --- RELIGION (secular but pro-pluralism) ---
      q55: 3, // no public money for worship → ambivalent (secular vs multicultural)
      q56: 1, // law shouldn't enforce religious bans → yes (pro-choice)
      q57: 5, // losing faith → worse creeds → no
      q58: 4, // be wary of religions → leans no (respects faith communities)
      q59: 5, // losing religion = moral drift → no
      q60: 3, // religion good for social bond → ambivalent

      // --- JUSTICE & SECURITY (progressive) ---
      q61: 5, // harsher sentences → no (reversed mandatory minimums)
      q62: 4, // impunity feeds violence → leans no
      q63: 4, // some crimes no remission → leans no (judicial discretion)
      q64: 2, // restorative justice → leans yes
      q65: 2, // no rehab = failed justice → leans yes
      q66: 3, // repeat rapist life sentence → ambivalent (public safety)
      q67: 2, // prison hardens criminals → leans yes
      q68: 2, // alternatives to prison → leans yes

      // --- ECOLOGY (moderate action WITH pipelines: real ambivalence) ---
      q69: 3, // climate needs strong constraints → ambivalent (carbon price, not degrowth)
      q70: 3, // don't hinder industry for ecology → ambivalent (approved pipelines)
      q71: 5, // green capitalism an illusion → no (green-growth poster child)
      q72: 4, // planet before growth, no compromise → leans no (balances both)
      q73: 3, // no need to cut comfort → ambivalent
      q74: 3, // tech fixes ecology alone → ambivalent
      q89: 2, // nuclear as future energy → leans yes (CANDU heritage)

      // --- LIBERTY & SECURITY ---
      q75: 4, // monitor comms vs terrorism → leans no (promised to rein in C-51)
      q76a: 4, // absolute right to shock → leans no (free speech "has limits")
      q76b: 2, // limit fake/harmful content → leans yes
      q77: 4, // more ID checks → leans no (anti-carding)
      q78: 4, // police freer use of force → leans no
      q79: 4, // pervasive CCTV → leans no (privacy)
      q80: 4, // emergency powers suspend liberties → leans no (2015 civil-liberties stance)
      q94: 2, // adults free to use drugs → leans yes (legalised cannabis)

      // --- TECHNOLOGY ---
      q81: 4, // AI destroys more jobs → leans no (innovation agenda)
      q82: 2, // no opaque algorithms → leans yes
      q83: 2, // human gene editing dangerous → leans yes (cautious)
      q84: 4, // social media net harmful → leans no (mastered the medium)
      q86: 2, // strictly regulate tech → leans yes
      q88: 4, // develop AI unhindered → leans no (pro-regulation balance)
      q93: 2, // embryo editing for disease → leans yes
      q95: 3, // space conquest → ambivalent
      q96: 2, // decisions on science → yes (evidence-based, restored census)
    },
  },
  {
    id: "ardern_2020",
    name: "Jacinda Ardern (2020)",
    description:
      "Labour social democrat of 'kindness politics': progressive on social issues and redistribution, decisive statist in crisis (COVID), humanitarian internationalist, firm on guns after Christchurch yet liberal on drugs and civil liberties.",
    color: "#15803D",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 2, // worker co-decision/profit-sharing → leans yes (union-friendly)
      q2: 4, // owning 10 flats → leans no (housing crisis, curbed speculation)
      q3: 4, // wealth without cap → leans no (redistribution)
      q4: 4, // requisition empty buildings → leans no (prefers state house-building)
      q5: 2, // ownership = freedom → leans yes (KiwiBuild)
      q100: 4, // heavily tax large inheritances → leans no (ruled out CGT/wealth taxes)
      q6: 3, // competition > monopoly → ambivalent (mixed economy)
      q7: 2, // crisis price controls → leans yes (active-state COVID response)
      q8: 5, // private health/school → no (public services)
      q9: 5, // boss sets own pay → no (inequality concern)
      q10: 4, // break up dominant firms → leans no (moderate)
      q11: 2, // public ownership of utilities → leans yes (Three Waters, KiwiRail)
      q97: 5, // state spends too much → no (Wellbeing Budget)

      // --- PURPOSE OF ECONOMY ---
      q12: 2, // fortunes rest on exploitation → leans yes (labour sympathy)
      q13: 4, // fortune never taxed → leans no (progressive tax)
      q14: 4, // profit is the sole driver → leans no (wellbeing over profit)
      q15: 2, // entrepreneur deserves reward → leans yes (not anti-success)
      q16: 2, // firm should serve people → leans yes (wellbeing economy)
      q101: 4, // profit lifted billions from poverty → leans no (wellbeing-economy critique)

      // --- WORK ---
      q17: 2, // shorter week → leans yes (floated 4-day week)
      q18: 2, // essential workers underpaid → leans yes (pay-equity champion)
      q19: 2, // dignity of manual work → leans yes
      q20: 2, // effort over money → leans yes
      q21: 2, // work gives meaning → leans yes
      q102: 4, // world without work → leans no
      q103: 4, // no-strings income makes passive → leans no

      // --- AUTHORITY ---
      q22: 2, // authority must be accountable → leans yes
      q23: 1, // strong central authority in crisis → yes ("go hard, go early")
      q24: 2, // concentrated power threatens all → leans yes
      q25: 2, // rule of law → leans yes
      q26: 2, // no leader = paralysis → leans yes
      q27: 4, // school = discipline/respect → leans no (critical thinking)

      // --- DEMOCRACY ---
      q28: 4, // govern without consulting → leans no (consultative)
      q29: 2, // major laws by referendum → leans yes (2020 cannabis/euthanasia votes)
      q30: 2, // electeds must obey majority → leans yes (honoured referendum results)
      q31: 4, // 5-yearly vote not enough → leans no
      q32: 4, // direct votes captured by minorities → leans no (trusts referendums)
      q33: 2, // reps + experts over direct vote → yes (science-led)
      q34: 4, // leader defies opinion → leans no (listening/kindness)

      // --- SOCIAL CHANGE ---
      q35: 3, // banning wildcat strikes → ambivalent (labour vs legality)
      q36: 4, // system captured, no reform → leans no (reformist)
      q37: 2, // slow legal change over revolution → leans yes
      q38: 2, // change via education not street → leans yes
      q39: 2, // stability over rupture → leans yes
      q40: 3, // radical model change → ambivalent (climate urgency vs gradualism)

      // --- SOCIETAL PROGRESS (strongly progressive) ---
      q41: 5, // society too tolerant → no
      q43: 6, // child needs father+mother → strongly no (LGBTQ ally)
      q44: 2, // highlight differences → leans yes (Māori/multicultural recognition)
      q45: 2, // scrap demeaning traditions → leans yes
      q46: 1, // gender roles are stereotypes → yes (feminist)
      q47: 2, // affirmative action → leans yes (equity measures)
      q48: 5, // school: less identity content → no
      q90: 5, // abolish animal farming → no (farming/dairy nation)
      q92: 1, // LGBTQ+ live freely → yes (left church over its LGBTQ stance)
      q98: 4, // animal cruelty = human violence → leans no
      q99: 1, // gender equality unfinished → yes (feminist)

      // --- IMMIGRATION & SOVEREIGNTY (internationalist) ---
      q49: 3, // borders "a line on a map" → ambivalent (humanitarian vs managed migration)
      q50: 5, // too much aid to immigrants → no (doubled refugee quota)
      q51: 4, // no treaty against the people → leans no (pro-treaties)
      q52: 5, // no foreign aid while poor at home → no (raised aid)
      q53: 1, // refusing help = cowardice → yes ("they are us")
      q54: 1, // binding international rules → yes (Paris, WHO)
      q91: 2, // supranational cooperation good → leans yes

      // --- RELIGION (secular/agnostic) ---
      q55: 2, // no public money for worship → leans yes (secular)
      q56: 1, // law shouldn't enforce religious bans → yes (decriminalised abortion 2020)
      q57: 5, // losing faith → worse creeds → no
      q58: 3, // be wary of religions → ambivalent (left church over LGBTQ vs Christchurch tolerance)
      q59: 5, // losing religion = moral drift → no
      q60: 3, // religion good for social bond → ambivalent (post-Christchurch respect)

      // --- JUSTICE & SECURITY (progressive, but firm on guns/terror) ---
      q61: 5, // harsher sentences → no (aimed to cut prison population)
      q62: 4, // impunity feeds violence → leans no (root causes)
      q63: 3, // some crimes no remission → ambivalent (Christchurch: life without parole)
      q64: 2, // restorative justice → leans yes (NZ tradition)
      q65: 2, // no rehab = failed justice → leans yes
      q66: 3, // repeat rapist life sentence → ambivalent (safety vs rehab)
      q67: 2, // prison hardens criminals → leans yes
      q68: 2, // alternatives to prison → leans yes

      // --- ECOLOGY ("nuclear-free moment", pragmatic on farming) ---
      q69: 2, // climate needs strong constraints → leans yes (Zero Carbon Act)
      q70: 3, // don't hinder industry for ecology → ambivalent (protected agriculture)
      q71: 4, // green capitalism an illusion → leans no (believes in just transition)
      q72: 3, // planet before growth, no compromise → ambivalent (just transition)
      q73: 4, // no need to cut comfort → leans no
      q74: 4, // tech fixes ecology alone → leans no
      q89: 5, // nuclear as future energy → no (NZ famously nuclear-free)

      // --- LIBERTY & SECURITY ---
      q75: 3, // monitor comms vs terrorism → ambivalent (Christchurch Call vs privacy)
      q76a: 4, // absolute right to shock → leans no (moved on hate speech/extremist content)
      q76b: 2, // limit harmful/false content → leans yes (Christchurch Call)
      q77: 4, // more ID checks → leans no (civil liberties)
      q78: 5, // police freer use of force → no (largely unarmed police)
      q79: 4, // pervasive CCTV → leans no
      q80: 2, // emergency powers for grave threat → leans yes (COVID state of emergency)
      q94: 2, // adults free to use drugs → leans yes (voted yes on cannabis referendum)

      // --- TECHNOLOGY ---
      q81: 4, // AI destroys more jobs → leans no
      q82: 2, // no opaque algorithms → leans yes (accountability)
      q83: 2, // human gene editing dangerous → leans yes (cautious)
      q84: 2, // social media net harmful → leans yes (post-Christchurch critic)
      q86: 2, // strictly regulate tech → yes (Christchurch Call)
      q88: 4, // develop AI unhindered → leans no (pro-regulation)
      q93: 2, // embryo editing for disease → leans yes
      q95: 2, // space investment → leans yes (proud of Rocket Lab)
      q96: 3, // decisions on science not emotion → ambivalent (science-led yet empathy-driven)
    },
  },
];
