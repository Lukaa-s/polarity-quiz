// src/data/referenceProfiles.en.ts
//
// Roster ANGLOPHONE des profils de référence (locale « en »).
//
// Contrairement aux autres overlays i18n (questions/axes/badges), qui ne
// traduisent que des libellés d'affichage sur des données FR canoniques, ce
// fichier est un ROSTER DISTINCT : en anglais, le comparateur et l'annuaire
// proposent des figures anglophones (États-Unis, Royaume-Uni, Canada, Nouvelle-
// Zélande) avec leurs PROPRES réponses — pas les politiciens français traduits.
//
// Le scoring reste identique : les `answers` sont codées contre les MÊMES ids de
// questions (questions.json), la seule source de vérité des jointures. Voir
// localizeProfiles dans src/i18n/data.ts : locale « fr » → referenceProfiles
// (roster FR), locale « en » → referenceProfilesEn (ce roster).
import { referenceProfiles, type ReferenceProfile } from "./referenceProfiles";
import { profilesEnPart1 } from "./profiles-en/part1";
import { profilesEnPart2 } from "./profiles-en/part2";
import { profilesEnPart3 } from "./profiles-en/part3";
import { profilesEnPart4 } from "./profiles-en/part4";

// Barack Obama (2012) : ses réponses existent déjà dans le roster FR canonique.
// On les réutilise PAR RÉFÉRENCE (copie identique, jamais réinventée) ; seuls le
// nom (inchangé) et la description sont donnés en anglais, et la couleur d'origine
// est conservée.
const obamaFr = referenceProfiles.find((p) => p.id === "obama_2012")!;
const obama2012En: ReferenceProfile = {
  id: "obama_2012",
  name: "Barack Obama (2012)",
  description:
    "Social-liberal center-left: pro-welfare-state yet pro-market, socially progressive and internationalist.",
  color: "#1565C0",
  isReference: true,
  answers: obamaFr.answers,
};

// 14 profils : 3 + 3 + 4 + 3 + Obama.
export const referenceProfilesEn: ReferenceProfile[] = [
  ...profilesEnPart1,
  ...profilesEnPart2,
  ...profilesEnPart3,
  ...profilesEnPart4,
  obama2012En,
];
