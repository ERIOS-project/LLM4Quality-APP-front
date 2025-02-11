import CircuitDePriseEnCharge from './Classification/CircuitDePriseEnCharge';
import QualiteHoteliere from './Classification/QualiteHoteliere';
import Professionnalisme from './Classification/Professionnalisme';

export default interface ClassificationResult {
    circuit_de_prise_en_charge : CircuitDePriseEnCharge;
    qualite_hoteliere : QualiteHoteliere;
    professionnalisme_de_l_equipe : Professionnalisme;
}