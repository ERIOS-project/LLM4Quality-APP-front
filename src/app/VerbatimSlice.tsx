import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  Verbatim  from '../models/Verbatim'; // Assurez-vous que ce chemin est correct
import VerbatimStatus  from '../models/VerbatimStatus';

// État initial : liste vide de verbatims
const initialState: Verbatim[] = [
  {
    id: '1',
    content: `Lors de mon séjour au CHU de Montpellier, j'ai été accueilli aux urgences après un accident de voiture. Je dois dire que l'organisation m'a laissé un sentiment mitigé. Dès mon arrivée, on m'a pris en charge rapidement pour les premiers examens, et l'infirmière qui s'est occupée de moi était incroyablement gentille et rassurante. Elle a pris le temps de m'expliquer chaque étape, ce qui m'a vraiment aidé à me détendre malgré la douleur.
Cependant, après les examens initiaux, j'ai été laissé dans un couloir pendant plusieurs heures sans aucune mise à jour. J'avais l'impression qu'on m'avait un peu oublié, et le personnel semblait débordé. Je comprends que les urgences peuvent être un endroit très chargé, mais ne pas savoir ce qui allait se passer ajoutait du stress inutile.
Finalement, j'ai été transféré en orthopédie pour des radios et des points de suture. Là encore, l'équipe médicale était compétente et professionnelle, mais l'attente entre chaque étape était interminable.
En résumé, j'ai eu des soins de qualité, et je suis reconnaissant envers les soignants, mais l'organisation générale laisse à désirer. Je pense qu'avec un peu plus de communication et une meilleure gestion des flux, mon expérience aurait été bien plus positive. Cela dit, je n'oublierai jamais le dévouement du personnel, qui fait tout son possible malgré les circonstances.`,
    status: VerbatimStatus.Success,
    year: 2023,
    created_at: new Date('2023-01-01'),
    result: {
      CircuitDePriseEnCharge: {
        "La fluidité et la personnalisation du parcours": true,
        "L’accueil et l’admission": false,
        "Le circuit administratif": true,
        "La rapidité de prise en charge et le temps d’attente": true,
        "L’accès au bloc": true,
        "La sortie de l’établissement": null,
        "Le suivi du patient après le séjour hospitalier": true,
        "Les frais supplémentaires et dépassements d’honoraires": false,
      },
      QualiteHoteliere: {
        "L’accès à l’établissement": true,
        "Les locaux et les chambres": true,
        "L’intimité": false,
        "Le calme/volume sonore": true,
        "La température de la chambre": true,
        "Les repas et collations": true,
        "Les services WiFi et TV": false,
      },
      Professionnalisme: {
        "L’information et les explications": true,
        "L’humanité et la disponibilité des professionnels": true,
        "Les prises en charges médicales et paramédicales": true,
        "Droits des patients": false,
        "Gestion de la douleur et médicaments": true,
        "Maternité et pédiatrie": false,
      },
    },
  },
  {
    id: '2',
    content: 'Verbatim 2',
    status: VerbatimStatus.Error,
    year: 2022,
    created_at: new Date('2022-05-15'),
    result: {
      CircuitDePriseEnCharge: {
        "La fluidité et la personnalisation du parcours": false,
        "L’accueil et l’admission": true,
        "Le circuit administratif": false,
        "La rapidité de prise en charge et le temps d’attente": false,
        "L’accès au bloc": true,
        "La sortie de l’établissement": true,
        "Le suivi du patient après le séjour hospitalier": false,
        "Les frais supplémentaires et dépassements d’honoraires": true,
      },
      QualiteHoteliere: {
        "L’accès à l’établissement": false,
        "Les locaux et les chambres": false,
        "L’intimité": true,
        "Le calme/volume sonore": false,
        "La température de la chambre": true,
        "Les repas et collations": true,
        "Les services WiFi et TV": true,
      },
      Professionnalisme: {
        "L’information et les explications": false,
        "L’humanité et la disponibilité des professionnels": false,
        "Les prises en charges médicales et paramédicales": true,
        "Droits des patients": true,
        "Gestion de la douleur et médicaments": false,
        "Maternité et pédiatrie": true,
      },
    },
  },
];

const verbatimSlice = createSlice({
  name: 'verbatims',
  initialState,
  reducers: {
    addVerbatim: (state, action: PayloadAction<Verbatim>) => {
      state.push(action.payload);
    },
    updateVerbatim: (state, action: PayloadAction<Verbatim>) => {
      const index = state.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteVerbatim: (state, action: PayloadAction<string>) => {
      return state.filter((v) => v.id !== action.payload);
    },
    setVerbatims: (state, action: PayloadAction<Verbatim[]>) => {
      return action.payload;
    },
  },
});

export const { addVerbatim, updateVerbatim, deleteVerbatim, setVerbatims } = verbatimSlice.actions;

export default verbatimSlice.reducer;
