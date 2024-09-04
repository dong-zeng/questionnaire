import { Injectable } from "@angular/core";
import { Questionnair, QuestionnaireConfig, QuestionnaireSection, standardSectionNames } from "../models/questionnaire.model";

@Injectable({
    providedIn: 'root',
})
export class QuestionnaireService {
    constructor() {}

    getQuestionnaire(config: QuestionnaireConfig): Questionnair {
        const qx = this.createDefaultQuestionnaire('Programmable');     
        return qx;
    }

    createDefaultQuestionnaire(name: string): Questionnair {
        const qx = new Questionnair(name);

        let displayOrder = 0;
        standardSectionNames.forEach((s: string) => {
            const section: QuestionnaireSection = {
                displayOrder: displayOrder++,
                name: s,
                ////questions: [],
            };
            qx.add(section);
        });

        return qx;
    }
}