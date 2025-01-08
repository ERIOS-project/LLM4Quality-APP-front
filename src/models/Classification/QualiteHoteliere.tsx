export default interface QualiteHoteliere {
    "L’accès à l’établissement"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Les locaux et les chambres"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "L’intimité"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Le calme/volume sonore"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "La température de la chambre"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Les repas et collations"?: { positive: 0 | 1; negative: 0 | 1 } | null;
    "Les services WiFi et TV"?: { positive: 0 | 1; negative: 0 | 1 } | null;
}