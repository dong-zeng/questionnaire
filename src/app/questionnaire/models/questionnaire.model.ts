import { QuestionnaireSection } from "./questionnaire-section.model";

export class Questionnair {
    sections: QuestionnaireSection[];
    name: string;

    constructor(name: string) {
        this.name = name;
        this.sections = [];
    }

    add = (section: QuestionnaireSection) => this.sections.push(section);
}

export interface QuestionnaireConfig {
    isCanngen: boolean;
    isMissourri: boolean;
    isEvenMoreSpecial: boolean;
}

export class QuestionnairOperation {
    type: QuestionnairOperationType;

    constructor(type: QuestionnairOperationType) {
        this.type = type;
    }

    isChangeToNextGroup = (): boolean => this.type === QuestionnairOperationType.changeToNextSection;
}

export enum QuestionnairOperationType {
    none,
    changeToNextSection,
    changeToPreviousSection,
}

export interface QuestionnaireConfig {
    isCanngen: boolean;
    isMissourri: boolean;
    isEvenMoreSpecial: boolean;
}
