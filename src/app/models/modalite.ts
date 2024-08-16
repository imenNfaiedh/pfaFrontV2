import { Fond } from "./fond";
import { TypeModalite } from "./modalite-type.enum";

export class Modalite {
    idModalite ?: number;
    nomCompletModalite ?: string;
    montantMin ?: number;
    montantMax ?: number;
    
    nameFond :string
    
    fond ?: Fond;
    fondId?: number;
    typeModalite?: TypeModalite;
    
    


}
