import { Modalite } from "./modalite";

export class Convention {
    idConvention ?: number;
    partenaireId ?: number;
    modaliteId ?: number;
    sigantureDate ?: Date;
    

    modalite ?: Modalite;

    nameModalite ?: string;
    namePartenaire ?: string;

}
