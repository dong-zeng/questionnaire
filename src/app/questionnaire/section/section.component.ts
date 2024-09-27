import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { QuestionnaireSection } from "../models/questionnaire-section.model";
import { QuestionnairOperation } from "../models/questionnaire.model";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Component({
    selector: 'qx-questionnaire-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, AfterViewInit {
    @Input() section!: QuestionnaireSection;
    noToAll: boolean | undefined;
    @Input() operation!: QuestionnairOperation;
    
    @ViewChild('myform') myform: NgForm | undefined;

    constructor() {}

    ngAfterViewInit(): void {
        this.myform?.valueChanges?.pipe(
            debounceTime(100), 
            distinctUntilChanged()
        ).subscribe({
            next: () => this.section.manageSiblingQuestionInteractions(this.section),
        });
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
            if (propName === 'operation') {
                const change = changes[propName];

                if (change.currentValue.isChangeToNextGroup()) {
                    //this.collectAnswer = true;
                }
            }
        }
    }

    collect() {
        console.log('myform is in collect: ', this.myform);
    }
}