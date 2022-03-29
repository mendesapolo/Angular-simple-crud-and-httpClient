import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Cashflow } from '../../../models/cashflow';
import { CashflowService } from '../../../services/cashflow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cashflows: Cashflow[] = []
  public cashflow: Cashflow = new Cashflow()

  public deleted = false

  constructor(
    public cashflowService: CashflowService
  ) { }

  ngOnInit(): void {
    this.listCahflow()
  }

  public listCahflow() {
    this.cashflowService.isload = true
    this.cashflowService.list().subscribe(response => {
      this.cashflows = response.data as Cashflow[]
      this.cashflowService.isload = false
    })
  }

  public setCashflow(cash: Cashflow) {
    this.cashflow = cash
  }

  //Formata o valor com o sinal de mais(+) ou menus(-) dependendo se é entrada
  formatNumber(cash: Cashflow): string {
    return cash.is_entrada ? '+' + cash.valor : '-' + cash.valor
  }

  public delete(id: number) {
    if (id) {
      this.cashflowService.delete(id).subscribe(res => {
        this.deleted = true
        this.listCahflow()
        setTimeout(() => {
          this.deleted = false
        }, 2000)
      })
    }
  }

}
