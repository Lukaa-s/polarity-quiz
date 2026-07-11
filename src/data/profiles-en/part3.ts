// src/data/profiles-en/part3.ts
// English-speaking reference profiles (batch 3): UK prime ministers / leaders.
// Answers are keyed by question id (see questions.json), value 0-6:
// 0 = "totally agree" with the statement, 3 = neutral, 6 = "totally disagree".
// Positions reflect each figure at the dated moment, judged against the STATEMENT.

import type { ReferenceProfile } from '../referenceProfiles';

export const profilesEnPart3: ReferenceProfile[] = [
  {
    id: 'thatcher_1983',
    name: 'Margaret Thatcher (1983)',
    description:
      'Free-market conservatism: privatization, deregulation and a strong law-and-order state, moral traditionalism, and pragmatic but anti-federalist sovereignism (pro-common-market, wary of political union).',
    color: '#1E3A8A',
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 6, // worker co-determination → no
      q2: 2, // owning flats to rent is legitimate → yes
      q3: 1, // no cap on accumulating wealth → yes
      q4: 6, // requisition empty buildings → no
      q5: 0, // property = liberty → strong yes (property-owning democracy)
      q6: 1, // competition beats state monopoly → yes
      q7: 6, // state price controls → no
      q8: 4, // privatize health/school → rather no (defended the NHS publicly)
      q9: 1, // free executive pay → yes
      q10: 5, // break up dominant firms → rather no
      q11: 6, // nationalize utilities → no (she privatized)
      q97: 0, // state spends too much, cut taxes → strong yes
      // Finality of economic activity
      q12: 6, // great fortunes = exploitation → no
      q13: 1, // legal fortunes never surtaxed → yes
      q14: 1, // profit motive drives progress → yes
      q15: 0, // entrepreneur merits great riches → strong yes
      q16: 5, // firm should serve people not owners → rather no
      // --- WORK ---
      q17: 6, // reduce working hours → no
      q18: 5, // carers paid more than traders → rather no (market sets pay)
      q19: 1, // dignity of manual labour → yes (work ethic)
      q20: 2, // effort over money earned → rather yes
      q21: 1, // work gives life meaning → yes
      // --- AUTHORITY ---
      q22: 5, // authority must always be challengeable → rather no
      q23: 0, // strong central authority in crisis → strong yes
      q24: 4, // concentrated power threatens the collective → rather no
      q25: 1, // even imperfect law must apply to all → yes (rule of law)
      q26: 1, // a group needs a leader → yes
      q27: 1, // school should teach discipline/authority → yes
      // --- DEMOCRACY ---
      q28: 1, // elected rep governs without constant consulting → yes
      q29: 6, // referendums on major laws → no (parliamentary sovereignty)
      q30: 5, // elected must follow the majority → rather no (conviction politics)
      q31: 5, // continuous participation needed → rather no
      q32: 2, // direct votes captured by mobilized groups → rather yes
      q33: 2, // experts + reps better than direct vote → rather yes
      q34: 1, // leader may go against opinion for common good → yes
      // --- SOCIAL CHANGE ---
      q35: 6, // banning wildcat strikes breaks progress → no (broke the strikes)
      q36: 5, // must replace power structures → rather no
      q37: 2, // slow legal change over revolution → yes
      q38: 2, // change via education not the street → yes
      q39: 1, // stability over revolution → yes
      q40: 5, // radical change of the model → rather no
      // --- SOCIETAL PROGRESS ---
      q41: 1, // society too tolerant of rule-breaking → yes (Victorian values)
      q43: 1, // a child needs a father and a mother → yes (Section 28)
      q44: 5, // identity politics over universalism → rather no
      q45: 4, // scrap old traditions that demean → rather no
      q46: 5, // gender roles are just stereotypes → rather no
      q47: 6, // affirmative action / quotas → no
      q48: 1, // school back to basics, less gender/diversity → yes
      q90: 6, // abolish all animal use → no
      q92: 5, // full LGBTQ+ freedom no compromise → rather no (Section 28)
      q99: 5, // more measures for gender equality → rather no ("owe nothing to women's lib")
      q98: 5, // animal cruelty sanctioned like human violence → rather no
      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 6, // borders are absurd → no
      q50: 2, // too much welfare to recent immigrants → rather yes
      q51: 2, // no treaty over the national will → yes (sovereignist)
      q52: 3, // no foreign aid while poor at home → neutral
      q53: 3, // refusing to help peoples in danger is cowardice → neutral
      q54: 5, // binding international rules on climate/pandemics → rather no
      q91: 4, // the EU is good and should be strengthened → rather no (anti-federalist)
      // --- RELIGION ---
      q55: 5, // no public money for religion → rather no (established church)
      q56: 3, // danger of religious law (abortion, blasphemy) → neutral (backed 1967 Act)
      q57: 2, // loss of faith replaced by worse creeds → rather yes
      q58: 4, // religions hold back progress → rather no
      q59: 2, // losing religious compass = moral drift → rather yes
      q60: 2, // religion valuable for social bond → rather yes
      // --- JUSTICE & SECURITY ---
      q61: 1, // harsher sentences → yes (law and order)
      q62: 1, // impunity breeds violence → yes
      q63: 2, // some crimes without any parole → rather yes
      q64: 5, // restorative justice suffices → rather no
      q65: 4, // a system that does not rehabilitate fails → rather no
      q66: 1, // life for a repeat rapist → yes
      q67: 4, // prison hardens criminals → rather no
      q68: 5, // alternatives to prison → rather no
      // --- ECOLOGY ---
      q69: 5, // climate needs strong constraints → rather no
      q70: 2, // do not hinder industry for ecology → yes
      q71: 5, // green capitalism is an illusion → rather no
      q72: 5, // planet before growth, no compromise → rather no
      q73: 2, // no need to cut our comfort → rather yes
      q74: 2, // technical progress will fix ecology → rather yes
      q89: 1, // nuclear is the energy of the future → yes (pro-nuclear)
      // --- CIVIL LIBERTIES ---
      q75: 1, // surveillance necessary against terror → yes
      q76a: 3, // free speech includes blasphemy/offence → neutral
      q76b: 3, // limit fake news → neutral
      q77: 2, // more ID checks → rather yes
      q78: 1, // police may use force more freely → yes (backed police vs miners)
      q79: 2, // CCTV everywhere → rather yes
      q80: 2, // emergency powers may suspend liberties → rather yes
      q94: 6, // free drug consumption → no
      // --- TECHNOLOGY & FUTURE ---
      q81: 3, // AI destroys more jobs than it creates → neutral (anachronistic)
      q82: 3, // no opaque algorithms for key decisions → neutral
      q83: 3, // human gene editing leads to abuses → neutral (pro-science leaning)
      q84: 3, // social media does more harm than good → neutral
      q86: 4, // strict tech regulation → rather no (deregulation)
      q88: 2, // develop emerging tech unhindered → rather yes
      q93: 2, // gene therapy against disease is legitimate → rather yes (chemist)
      q95: 3, // massive space investment → neutral
      q96: 2, // decisions on science over tradition/emotion → rather yes
      q100: 6, // heavily tax large inheritances → no (family transmission)
      q101: 1, // profit lifted billions out of poverty → yes
      q102: 6, // a world with no obligation to work → no
      q103: 1, // unconditional income makes people passive → yes
    },
  },
  {
    id: 'blair_1997',
    name: 'Tony Blair (1997)',
    description:
      "New Labour's Third Way: social-liberal and market-friendly, firmly pro-EU, moderately progressive on social issues, and tough on crime and security.",
    color: '#BE185D',
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 4, // worker co-determination → rather no (dropped Clause IV)
      q2: 2, // owning flats to rent is legitimate → yes ("relaxed about the filthy rich")
      q3: 2, // no cap on accumulating wealth → rather yes
      q4: 5, // requisition empty buildings → rather no
      q5: 2, // property = liberty → rather yes
      q6: 2, // competition beats state monopoly → rather yes
      q7: 5, // state price controls → rather no
      q8: 5, // privatize health/school → no (but used PFI/academies)
      q9: 2, // free executive pay → rather yes
      q10: 4, // break up dominant firms → rather no
      q11: 5, // nationalize utilities → no (kept privatizations)
      q97: 4, // state spends too much, cut taxes → rather no (raised NHS spending)
      q12: 5, // great fortunes = exploitation → rather no
      q13: 2, // legal fortunes never surtaxed → rather yes
      q14: 2, // profit motive drives progress → rather yes
      q15: 1, // entrepreneur merits great riches → yes
      q16: 3, // firm should serve people not owners → neutral (stakeholder rhetoric)
      // --- WORK ---
      q17: 5, // reduce working hours → rather no
      q18: 3, // carers paid more than traders → neutral
      q19: 2, // dignity of manual labour → rather yes
      q20: 2, // effort over money earned → rather yes
      q21: 2, // work gives life meaning → rather yes
      // --- AUTHORITY ---
      q22: 3, // authority must always be challengeable → neutral
      q23: 1, // strong central authority in crisis → yes (strong executive)
      q24: 3, // concentrated power threatens the collective → neutral
      q25: 2, // even imperfect law must apply to all → rather yes
      q26: 2, // a group needs a leader → rather yes
      q27: 2, // school should teach discipline → rather yes (standards agenda)
      // --- DEMOCRACY ---
      q28: 2, // elected rep governs without constant consulting → rather yes
      q29: 4, // referendums on major laws → rather no (though ran devolution votes)
      q30: 4, // elected must follow the majority → rather no (Iraq against opinion)
      q31: 4, // continuous participation needed → rather no
      q32: 2, // direct votes captured by mobilized groups → rather yes
      q33: 1, // experts + reps better than direct vote → yes (technocratic)
      q34: 1, // leader may go against opinion → yes (Iraq)
      // --- SOCIAL CHANGE ---
      q35: 5, // banning wildcat strikes breaks progress → rather no (kept union laws)
      q36: 4, // must replace power structures → rather no (reformist)
      q37: 1, // slow legal change over revolution → yes
      q38: 2, // change via education not the street → rather yes
      q39: 2, // stability over revolution → rather yes
      q40: 4, // radical change of the model → rather no
      // --- SOCIETAL PROGRESS ---
      q41: 2, // society too tolerant of rule-breaking → rather yes (tough on crime, ASBOs)
      q43: 4, // a child needs a father and a mother → rather no
      q44: 3, // identity politics over universalism → neutral (multiculturalism era)
      q45: 2, // scrap old traditions that demean → rather yes
      q46: 3, // gender roles are just stereotypes → neutral
      q47: 2, // affirmative action / quotas → rather yes (all-women shortlists)
      q48: 3, // school back to basics, less gender/diversity → neutral
      q90: 5, // abolish all animal use → rather no (but banned fox hunting)
      q92: 2, // full LGBTQ+ freedom → rather yes (repealed Section 28, civil partnerships)
      q99: 2, // more measures for gender equality → rather yes
      q98: 4, // animal cruelty sanctioned like human violence → rather no
      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 5, // borders are absurd → rather no
      q50: 4, // too much welfare to recent immigrants → rather no (pro-immigration)
      q51: 5, // no treaty over the national will → no (pooled sovereignty)
      q52: 5, // no foreign aid while poor at home → no (raised aid, Make Poverty History)
      q53: 1, // refusing to help peoples in danger is cowardice → yes (liberal interventionism)
      q54: 2, // binding international rules → rather yes (multilateralism, Kyoto)
      q91: 1, // the EU is good and should be strengthened → yes (firmly pro-EU)
      // --- RELIGION ---
      q55: 4, // no public money for religion → rather no (faith schools funded)
      q56: 2, // danger of religious law → rather yes (secular framework)
      q57: 2, // loss of faith replaced by worse creeds → rather yes (devout)
      q58: 4, // religions hold back progress → rather no (pro-faith)
      q59: 2, // losing religious compass = moral drift → rather yes
      q60: 1, // religion valuable for social bond → yes (faith communities)
      // --- JUSTICE & SECURITY ---
      q61: 2, // harsher sentences → rather yes ("tough on crime")
      q62: 2, // impunity breeds violence → rather yes
      q63: 3, // some crimes without any parole → neutral
      q64: 4, // restorative justice suffices → rather no
      q65: 3, // a system that does not rehabilitate fails → neutral ("tough on the causes")
      q66: 2, // life for a repeat rapist → rather yes
      q67: 3, // prison hardens criminals → neutral
      q68: 4, // alternatives to prison → rather no
      // --- ECOLOGY ---
      q69: 3, // climate needs strong constraints → neutral
      q70: 3, // do not hinder industry for ecology → neutral
      q71: 4, // green capitalism is an illusion → rather no (green growth)
      q72: 4, // planet before growth, no compromise → rather no
      q73: 3, // no need to cut our comfort → neutral
      q74: 3, // technical progress will fix ecology → neutral
      q89: 2, // nuclear is the energy of the future → rather yes (backed new build)
      // --- CIVIL LIBERTIES ---
      q75: 1, // surveillance necessary against terror → yes (anti-terror laws)
      q76a: 2, // free speech includes blasphemy/offence → rather yes
      q76b: 3, // limit fake news → neutral
      q77: 2, // more ID checks → rather yes (ID cards)
      q78: 2, // police may use force more freely → rather yes
      q79: 1, // CCTV everywhere → yes (UK CCTV expansion)
      q80: 2, // emergency powers may suspend liberties → rather yes
      q94: 5, // free drug consumption → rather no (tough on drugs)
      // --- TECHNOLOGY & FUTURE ---
      q81: 3, // AI destroys more jobs → neutral
      q82: 3, // no opaque algorithms → neutral
      q83: 3, // human gene editing leads to abuses → neutral (backed embryo research)
      q84: 3, // social media does more harm than good → neutral
      q86: 3, // strict tech regulation → neutral
      q88: 2, // develop emerging tech unhindered → rather yes
      q93: 2, // gene therapy against disease is legitimate → rather yes
      q95: 3, // massive space investment → neutral
      q96: 2, // decisions on science over tradition → rather yes (evidence-based)
      q100: 4, // heavily tax large inheritances → rather no (centrist)
      q101: 2, // profit lifted billions out of poverty → rather yes (pro-globalization)
      q102: 5, // a world with no obligation to work → rather no
      q103: 2, // unconditional income makes people passive → rather yes (welfare-to-work)
    },
  },
  {
    id: 'corbyn_2019',
    name: 'Jeremy Corbyn (2019)',
    description:
      'Democratic-socialist left: renationalization, anti-austerity spending and radical redistribution, pacifist and anti-authoritarian, socially liberal, and ambivalent on the EU.',
    color: '#A21CAF',
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 1, // worker co-determination → yes (inclusive ownership funds)
      q2: 5, // owning flats to rent is legitimate → rather no (against rentierism)
      q3: 5, // no cap on accumulating wealth → rather no
      q4: 1, // requisition empty buildings → yes (proposed after Grenfell)
      q5: 4, // property = liberty → rather no (values social housing)
      q6: 5, // competition beats state monopoly → rather no
      q7: 1, // state price controls → yes (energy price cap)
      q8: 6, // privatize health/school → no
      q9: 6, // free executive pay → no (pay ratios)
      q10: 1, // break up dominant firms → yes (incl. big tech)
      q11: 0, // nationalize utilities → strong yes (rail, water, energy, mail)
      q97: 6, // state spends too much, cut taxes → no (anti-austerity)
      q12: 1, // great fortunes = exploitation → yes
      q13: 6, // legal fortunes never surtaxed → no (tax the rich)
      q14: 5, // profit motive drives progress → rather no
      q15: 4, // entrepreneur merits great riches → rather no
      q16: 1, // firm should serve people not owners → yes
      // --- WORK ---
      q17: 1, // reduce working hours → yes (Labour's 32-hour week)
      q18: 1, // carers paid more than traders → yes
      q19: 2, // dignity of manual labour → rather yes
      q20: 1, // effort over money earned → yes
      q21: 3, // work gives life meaning → neutral (values leisure/emancipation too)
      // --- AUTHORITY ---
      q22: 2, // authority must always be challengeable → rather yes (anti-authoritarian)
      q23: 4, // strong central authority in crisis → rather no
      q24: 1, // concentrated power threatens the collective → yes
      q25: 4, // even imperfect law must apply to all → rather no (backs civil disobedience)
      q26: 4, // a group needs a leader → rather no (movement politics)
      q27: 5, // school should teach discipline → rather no (critical thinking)
      // --- DEMOCRACY ---
      q28: 5, // elected rep governs without consulting → rather no (member-led)
      q29: 3, // referendums on major laws → neutral (Brexit ambivalence)
      q30: 2, // elected must follow the majority → rather yes
      q31: 2, // continuous participation needed → rather yes
      q32: 4, // direct votes captured by mobilized groups → rather no
      q33: 4, // experts + reps better than direct vote → rather no
      q34: 4, // leader may go against opinion → rather no
      // --- SOCIAL CHANGE ---
      q35: 1, // banning wildcat strikes breaks progress → yes (pro-picket line)
      q36: 2, // must replace power structures → rather yes (systemic change)
      q37: 3, // slow legal change over revolution → neutral (parliamentary but radical)
      q38: 4, // change via education not the street → rather no (values activism)
      q39: 3, // stability over revolution → neutral
      q40: 2, // radical change of the model → rather yes (Green industrial revolution)
      // --- SOCIETAL PROGRESS ---
      q41: 5, // society too tolerant of rule-breaking → rather no
      q43: 6, // a child needs a father and a mother → no
      q44: 2, // identity politics over universalism → rather yes
      q45: 1, // scrap old traditions that demean → yes
      q46: 1, // gender roles are just stereotypes → yes
      q47: 1, // affirmative action / quotas → yes
      q48: 5, // school back to basics, less gender/diversity → rather no
      q90: 2, // abolish/limit animal exploitation → rather yes (vegetarian, animal-rights)
      q92: 1, // full LGBTQ+ freedom → yes
      q99: 1, // more measures for gender equality → yes
      q98: 2, // animal cruelty sanctioned like human violence → rather yes
      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 3, // borders are absurd → neutral (humane, pro-migrant but not open-borders slogan)
      q50: 6, // too much welfare to recent immigrants → no
      q51: 3, // no treaty over the national will → neutral (Lexit sympathies vs internationalism)
      q52: 5, // no foreign aid while poor at home → rather no (internationalist solidarity)
      q53: 2, // refusing to help peoples in danger is cowardice → rather yes (solidarity)
      q54: 2, // binding international rules → rather yes
      q91: 3, // the EU is good and should be strengthened → neutral (EU-ambivalent)
      // --- RELIGION ---
      q55: 3, // no public money for religion → neutral (secular left)
      q56: 1, // danger of religious law → yes
      q57: 4, // loss of faith replaced by worse creeds → rather no
      q58: 3, // religions hold back progress → neutral (respects faith communities)
      q59: 4, // losing religious compass = moral drift → rather no
      q60: 3, // religion valuable for social bond → neutral
      // --- JUSTICE & SECURITY ---
      q61: 5, // harsher sentences → rather no
      q62: 3, // impunity breeds violence → neutral (emphasizes root causes)
      q63: 5, // some crimes without any parole → rather no
      q64: 2, // restorative justice suffices → rather yes
      q65: 1, // a system that does not rehabilitate fails → yes
      q66: 5, // life for a repeat rapist → rather no (believes in rehabilitation)
      q67: 2, // prison hardens criminals → rather yes
      q68: 2, // alternatives to prison → rather yes
      // --- ECOLOGY ---
      q69: 2, // climate needs strong constraints → rather yes
      q70: 5, // do not hinder industry for ecology → rather no
      q71: 3, // green capitalism is an illusion → neutral (Green New Deal within reformed system)
      q72: 2, // planet before growth → rather yes
      q73: 4, // no need to cut our comfort → rather no
      q74: 5, // technical progress will fix ecology → rather no
      q89: 4, // nuclear is the energy of the future → rather no (CND-rooted ambivalence)
      // --- CIVIL LIBERTIES ---
      q75: 5, // surveillance necessary against terror → rather no (opposed snooper's charter)
      q76a: 2, // free speech includes blasphemy/offence → rather yes
      q76b: 3, // limit fake news → neutral
      q77: 5, // more ID checks → rather no
      q78: 5, // police may use force more freely → rather no
      q79: 5, // CCTV everywhere → rather no
      q80: 5, // emergency powers may suspend liberties → rather no
      q94: 3, // free drug consumption → neutral (health-based reform)
      // --- TECHNOLOGY & FUTURE ---
      q81: 3, // AI destroys more jobs → neutral
      q82: 2, // no opaque algorithms → rather yes
      q83: 3, // human gene editing leads to abuses → neutral
      q84: 3, // social media does more harm than good → neutral
      q86: 2, // strict tech regulation → rather yes
      q88: 4, // develop emerging tech unhindered → rather no
      q93: 3, // gene therapy against disease → neutral
      q95: 4, // massive space investment → rather no (Earth priorities first)
      q96: 2, // decisions on science over tradition → rather yes
      q100: 1, // heavily tax large inheritances → yes
      q101: 5, // profit lifted billions out of poverty → rather no
      q102: 3, // a world with no obligation to work → neutral (values dignity of work)
      q103: 4, // unconditional income makes people passive → rather no (open to UBI pilots)
    },
  },
  {
    id: 'johnson_2019',
    name: 'Boris Johnson (2019)',
    description:
      'Brexit sovereignism with big-spending centre-right economics, socially liberal for a Conservative, tough on crime, and a bonapartist streak toward Parliament.',
    color: '#0E7490',
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 5, // worker co-determination → rather no
      q2: 2, // owning flats to rent is legitimate → yes
      q3: 2, // no cap on accumulating wealth → rather yes
      q4: 5, // requisition empty buildings → rather no
      q5: 1, // property = liberty → yes
      q6: 2, // competition beats state monopoly → rather yes
      q7: 3, // state price controls → neutral (pragmatic, energy caps era)
      q8: 5, // privatize health/school → no (defends the NHS)
      q9: 2, // free executive pay → rather yes
      q10: 4, // break up dominant firms → rather no (with populist anti-big-tech streak)
      q11: 5, // nationalize utilities → no
      q97: 4, // state spends too much, cut taxes → rather no ("end of austerity", levelling up)
      q12: 5, // great fortunes = exploitation → rather no
      q13: 2, // legal fortunes never surtaxed → rather yes
      q14: 2, // profit motive drives progress → rather yes
      q15: 1, // entrepreneur merits great riches → yes
      q16: 4, // firm should serve people not owners → rather no
      // --- WORK ---
      q17: 5, // reduce working hours → rather no
      q18: 3, // carers paid more than traders → neutral (clapped for the NHS)
      q19: 2, // dignity of manual labour → rather yes
      q20: 2, // effort over money earned → rather yes
      q21: 2, // work gives life meaning → rather yes
      // --- AUTHORITY ---
      q22: 4, // authority must always be challengeable → rather no
      q23: 1, // strong central authority in crisis → yes
      q24: 4, // concentrated power threatens the collective → rather no
      q25: 2, // even imperfect law must apply to all → rather yes (stated position)
      q26: 2, // a group needs a leader → rather yes
      q27: 2, // school should teach discipline → rather yes
      // --- DEMOCRACY ---
      q28: 2, // elected rep governs without consulting → rather yes (prorogued Parliament)
      q29: 3, // referendums on major laws → neutral (championed the Brexit vote)
      q30: 3, // elected must follow the majority → neutral ("will of the people")
      q31: 4, // continuous participation needed → rather no
      q32: 3, // direct votes captured by mobilized groups → neutral
      q33: 4, // experts + reps better than direct vote → rather no (populist)
      q34: 3, // leader may go against opinion → neutral
      // --- SOCIAL CHANGE ---
      q35: 5, // banning wildcat strikes breaks progress → rather no
      q36: 5, // must replace power structures → rather no
      q37: 2, // slow legal change over revolution → rather yes
      q38: 2, // change via education not the street → rather yes
      q39: 2, // stability over revolution → rather yes
      q40: 5, // radical change of the model → rather no
      // --- SOCIETAL PROGRESS ---
      q41: 2, // society too tolerant of rule-breaking → rather yes
      q43: 4, // a child needs a father and a mother → rather no (voted for same-sex marriage)
      q44: 4, // identity politics over universalism → rather no
      q45: 3, // scrap old traditions that demean → neutral
      q46: 4, // gender roles are just stereotypes → rather no
      q47: 4, // affirmative action / quotas → rather no
      q48: 3, // school back to basics, less gender/diversity → neutral
      q90: 5, // abolish all animal use → rather no (backed welfare/sentience law)
      q92: 2, // full LGBTQ+ freedom → rather yes (pro same-sex marriage)
      q99: 3, // more measures for gender equality → neutral
      q98: 3, // animal cruelty sanctioned like human violence → neutral (raised cruelty sentences)
      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 6, // borders are absurd → no (take back control)
      q50: 2, // too much welfare to recent immigrants → rather yes (points-based system)
      q51: 1, // no treaty over the national will → yes (Brexit sovereignty)
      q52: 2, // no foreign aid while poor at home → rather yes (cut aid 0.7%→0.5%, merged DFID)
      q53: 3, // refusing to help peoples in danger is cowardice → neutral
      q54: 4, // binding international rules → rather no (sovereignist, but hosted COP26)
      q91: 6, // the EU is good and should be strengthened → no (Brexit)
      // --- RELIGION ---
      q55: 4, // no public money for religion → rather no (established church)
      q56: 2, // danger of religious law → rather yes (secular, liberal)
      q57: 3, // loss of faith replaced by worse creeds → neutral
      q58: 3, // religions hold back progress → neutral
      q59: 3, // losing religious compass = moral drift → neutral
      q60: 3, // religion valuable for social bond → neutral
      // --- JUSTICE & SECURITY ---
      q61: 1, // harsher sentences → yes (longer sentences, 20,000 more police)
      q62: 2, // impunity breeds violence → rather yes
      q63: 2, // some crimes without any parole → rather yes
      q64: 5, // restorative justice suffices → rather no
      q65: 4, // a system that does not rehabilitate fails → rather no
      q66: 1, // life for a repeat rapist → yes
      q67: 4, // prison hardens criminals → rather no
      q68: 5, // alternatives to prison → rather no
      // --- ECOLOGY ---
      q69: 4, // climate needs strong constraints → rather no (green growth, no sacrifice)
      q70: 3, // do not hinder industry for ecology → neutral (green industrial growth)
      q71: 5, // green capitalism is an illusion → rather no (techno-green believer)
      q72: 4, // planet before growth → rather no
      q73: 2, // no need to cut our comfort → rather yes (techno-optimist)
      q74: 2, // technical progress will fix ecology → rather yes
      q89: 2, // nuclear is the energy of the future → rather yes (backed new plants)
      // --- CIVIL LIBERTIES ---
      q75: 2, // surveillance necessary against terror → rather yes
      q76a: 1, // free speech includes blasphemy/offence → yes (journalist, defends offence)
      q76b: 4, // limit fake news → rather no (anti-regulation on speech)
      q77: 2, // more ID checks → rather yes
      q78: 2, // police may use force more freely → rather yes
      q79: 2, // CCTV everywhere → rather yes (expanded as Mayor)
      q80: 2, // emergency powers may suspend liberties → rather yes
      q94: 4, // free drug consumption → rather no (tough line as PM in 2019)
      // --- TECHNOLOGY & FUTURE ---
      q81: 3, // AI destroys more jobs → neutral
      q82: 3, // no opaque algorithms → neutral
      q83: 3, // human gene editing leads to abuses → neutral
      q84: 3, // social media does more harm than good → neutral
      q86: 4, // strict tech regulation → rather no (light-touch, pro-innovation)
      q88: 2, // develop emerging tech unhindered → rather yes ("Global Britain" tech)
      q93: 2, // gene therapy against disease → rather yes
      q95: 2, // massive space investment → rather yes (spaceports, ambition)
      q96: 3, // decisions on science over tradition → neutral (populist streak)
      q100: 5, // heavily tax large inheritances → rather no (Tories want IHT cuts)
      q101: 2, // profit lifted billions out of poverty → rather yes
      q102: 5, // a world with no obligation to work → rather no
      q103: 2, // unconditional income makes people passive → rather yes
    },
  },
];
