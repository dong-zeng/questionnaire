export class Questionnair {
    sections: QuestionnaireSection[];
    name: string;

    constructor(name: string) {
        this.name = name;
        this.sections = [];
    }

    add(section: QuestionnaireSection): void {
        this.sections.push(section);
    }
}

export interface QuestionnaireConfig {
    isCanngen: boolean;
    isMissourri: boolean;
    isEvenMoreSpecial: boolean;
}

export class QuestionnaireSection {
    displayOrder: number;
    name: string;
    ////questions: QuestionV1[];

    constructor(displayOrder: number, name: string) {
        this.displayOrder = displayOrder;
        this.name = name;
        ////this.questions = [];
    }
}

export class QuestionnairOperation {
    type: QuestionnairOperationType;

    constructor(type: QuestionnairOperationType) {
        this.type = type;
    }

    isChangeToNextGroup = (): boolean =>
        this.type === QuestionnairOperationType.changeToNextSection;
}

export enum QuestionnairOperationType {
    none,
    changeToNextSection,
    changeToPreviousSection,
}

export const standardSectionNames = ['Questions 1-8', 'Questions 9-16', 'Questions 17-25', 'Questions 26-30', 'Questions 31-37', 'Supplemental 38-45'];