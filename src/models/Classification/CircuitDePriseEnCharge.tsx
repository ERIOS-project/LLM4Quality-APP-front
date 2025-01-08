export default interface CircuitDePriseEnCharge {
    "La fluidité et la personnalisation du parcours"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "L’accueil et l’admission"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Le circuit administratif"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "La rapidité de prise en charge et le temps d’attente"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "L’accès au bloc"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "La sortie de l’établissement"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Le suivi du patient après le séjour hospitalier"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Les frais supplémentaires et dépassements d’honoraires"?: { positive: 0 | 1; negative: 0 | 1 } | null;
}