import { describe, expect, it } from "vitest";
import { computeRarity, MIN_BASELINE, parseGcCount } from "../utils/badgeStats";

// Verrouille le calcul de rareté réelle (compteurs GoatCounter) : parsing des
// compteurs formatés et bornes du ratio. La partie réseau/DOM (fetch, cache,
// hook) est volontairement hors périmètre — elle se replie sur les estimations.

describe("parseGcCount", () => {
  it("parse les compteurs formatés GoatCounter (espace fine, virgule)", () => {
    expect(parseGcCount("1 234")).toBe(1234);
    expect(parseGcCount("5,555")).toBe(5555);
    expect(parseGcCount("42")).toBe(42);
    expect(parseGcCount(42)).toBe(42);
    expect(parseGcCount("0")).toBe(0);
  });

  it("retourne null sur les valeurs inexploitables", () => {
    expect(parseGcCount("")).toBeNull();
    expect(parseGcCount("abc")).toBeNull();
    expect(parseGcCount(undefined)).toBeNull();
    expect(parseGcCount(null)).toBeNull();
    expect(parseGcCount({})).toBeNull();
  });
});

describe("computeRarity", () => {
  it("refuse un dénominateur sous le volume minimal", () => {
    expect(computeRarity(10, MIN_BASELINE - 1)).toBeNull();
    expect(computeRarity(10, 0)).toBeNull();
  });

  it("calcule un pourcentage entier borné [1, 100]", () => {
    expect(computeRarity(50, 100)).toBe(50);
    // plancher à 1 : l'événement de l'utilisateur courant peut ne pas être ingéré
    expect(computeRarity(0, 100)).toBe(1);
    // l'arrondi ne descend jamais à 0 %
    expect(computeRarity(1, 300)).toBe(1);
    // un numérateur aberrant (> dénominateur) est plafonné à 100 %
    expect(computeRarity(250, 100)).toBe(100);
  });
});
