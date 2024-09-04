import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Questionnair, QuestionnaireConfig, QuestionnairOperation } from './models/questionnaire.model';
import { QuestionnaireService } from './services/questionnaire.service';

@Component({
  selector: 'qx-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent implements OnInit {

    qx!: Questionnair;
    config: QuestionnaireConfig = {
        isCanngen: false,
        isMissourri: false,
        isEvenMoreSpecial: false,
    };

    constructor(private qxService: QuestionnaireService) {
    }

    ngOnInit() {
        this.qx = this.load(this.config);
    }

    reload = () => (this.qx = this.load(this.config));

    load = (config: QuestionnaireConfig): Questionnair => this.qxService.getQuestionnaire(config);
}
