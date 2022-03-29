import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cashflow } from '../../../models/cashflow';
import { CashflowService } from '../../../services/cashflow.service';

@Component({
  selector: 'app-insert-or-update-cashflow',
  templateUrl: './insert-or-update-cashflow.component.html',
  styleUrls: ['./insert-or-update-cashflow.component.css']
})
export class InsertOrUpdateCashflowComponent implements OnInit {

  @Input() cashflow: Cashflow = new Cashflow()
  @Output('event') eventEmit: EventEmitter<any> = new EventEmitter()

  public form: FormGroup = new FormGroup({})
  public valid = true
  public saved = false

  constructor(
    private cashflowService: CashflowService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      valor: [0, Validators.required],
      is_entrada: [1, Validators.required],
    })
    this.reset()
  }

  onSubmit(valueForm: any) {
    if (valueForm.descricao && valueForm.valor) {
      this.valid = true
      this.cashflow.descricao = valueForm.descricao
      this.cashflow.valor = valueForm.valor
      this.cashflow.is_entrada = valueForm.is_entrada == 1 ? true : false
      this.insertOrUpdate(this.cashflow)
    } else {
      this.valid = false
      setTimeout(() => {
        this.valid = true
      }, 2000)
    }
  }

  public get f() {
    return this.form.controls
  }

  public insertOrUpdate(cash: Cashflow) {
    if (cash.id) {
      this.cashflowService.update(cash).subscribe(res => {
        this.saved = true
        this.eventEmit.emit()
        setTimeout(() => {
          this.reset()
        }, 2000)
      })
    } else {
      this.cashflowService.insert(cash).subscribe(res => {
        this.saved = true
        this.eventEmit.emit()
        setTimeout(() => {
          this.reset()
        }, 2000)
      })
    }
  }

  public reset() {
    if (this.cashflow.id) {
      this.cashflow.id = 0
      this.cashflow.descricao = ''
      this.cashflow.valor = 0
      this.cashflow.is_entrada = true
    }
    this.saved = false
    this.form.reset()
    this.eventEmit.emit()
  }

}
