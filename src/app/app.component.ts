import { Component, OnInit } from '@angular/core';
import { CashflowService } from './services/cashflow.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public form: FormGroup = new FormGroup({})

  constructor(
    private cashflowService: CashflowService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: ['']
    })
  }

  public onSearch(text: string) {
    // pass
  }
}
