import { Injectable } from "@angular/core";
import { Question } from "../models/question.model";
import { QuestionnaireConfig } from '../models/questionnaire.model';
import { QuestionnaireSection, SectionDefinition } from "../models/questionnaire-section.model";
import { Questionnair, QuestionnairOperation, QuestionnairOperationType } from "../models/questionnaire.model";
import { createQuestion } from "./question.service";
import { offerrings, QuestionnaireDefinition } from "./questionnaires-data.service";

@Injectable({
    providedIn: 'root',
})
export class QuestionnaireService {
    constructor() {}

    getQuestionnaire(name: string, config: QuestionnaireConfig): Questionnair {
        return this.getQuestionnaireImpl(name, config);
    }

    getQuestionnaireImpl(name: string, config: QuestionnaireConfig): Questionnair {
        const def = offerrings.find((o) => o.name === name);
        if (name === 'truck questionnaire') {
            const qx = this.createTruckQuestionnaire(def!, config);
            this.manageQuestionApplicability(qx.sections, config, notApplicables);
            return qx;
        }

        return this.createQuestionnaire(def!);
    }

    getQuestionnaireSection(definition: SectionDefinition): QuestionnaireSection {
        const section = new QuestionnaireSection(definition.displayOrder, definition.name, definition.label);

        definition.questions.forEach((q) => {
            const question = createQuestion(q);
            console.log('got this question from factory: ', question);
            if (question) section.questions.push(question);
        });

        if (definition.rules) section.setRulesFunc(definition.rules);

        return section;
    }

    createTruckQuestionnaire(def: QuestionnaireDefinition, config: QuestionnaireConfig): Questionnair {
        const qx = new Questionnair(def.name);
        def.sections.forEach((s) => {
            if (s.name.toLowerCase() != 'supplemental') {
                qx.add(this.getQuestionnaireSection(s));
            } else {
                if (config.isCanngen) qx.add(this.getQuestionnaireSection(s));
            }
        });
        return qx;
    }

    createQuestionnaire(def: QuestionnaireDefinition): Questionnair {
        const qx = new Questionnair(def.name);
        def.sections.forEach((s) => qx.add(this.getQuestionnaireSection(s)));
        return qx;
    }

    manageQuestionApplicability(sections: QuestionnaireSection[], config: QuestionnaireConfig, notApplicables: any): void {
        if (config.isCanngen) this.makeQuestionsUnapplicable(sections, notApplicables.idsOfQuestionsNotApplicableForCanngen);

        if (config.isMissourri) this.makeQuestionsUnapplicable(sections, notApplicables.idsOfQuestionsNotApplicableForMissourri);
    }

    makeQuestionsUnapplicable(sections: QuestionnaireSection[], ids: string[]): void {
        sections.forEach((s) => {
            s.questions.forEach((q) => {
                if (ids.some((x) => x === q.id)) q.applicable = false;
            });
        });
    }

    getPaperWork(qx: Questionnair) {
        const flattened: any = {};

        qx.sections.forEach((g) => {
            g.questions.forEach((q: Question) => q.reportAnswer(flattened));
        });

        return flattened;
    }

    createChangeToNextGroupOperation = (): QuestionnairOperation => new QuestionnairOperation(QuestionnairOperationType.changeToNextSection);

    createIdlingOperation = (): QuestionnairOperation => new QuestionnairOperation(QuestionnairOperationType.none);

}

export const notApplicables: any = {
    idsOfQuestionsNotApplicableForCanngen: ['quss2', 'qus24'],
    idsOfQuestionsNotApplicableForMissourri: ['qus17'],
};