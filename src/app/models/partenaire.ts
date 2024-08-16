import { Convention } from "./convention";

export class Partenaire {
    idPartenaire ?: number;
    nomPartenaire ?: string;
    adresse ?: string;
    telephone?: number
    mail?: string;

    conventions: Convention[];

}