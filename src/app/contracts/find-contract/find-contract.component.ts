import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contract } from 'src/app/shared/contract.model';
import { ContractsService } from 'src/app/shared/contracts.service';

@Component({
  selector: 'app-find-contract',
  templateUrl: './find-contract.component.html',
  styleUrls: ['./find-contract.component.css'],
})
export class FindContractComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;

  foundContracts: Contract[] = [];
  submitted = false;

  constructor(private contractsService: ContractsService) {}

  ngOnInit(): void {}

  onChange() {
    if (this.searchForm.value.search === '') {
      this.foundContracts = [];
      this.submitted = false;
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 2500);

    this.foundContracts = this.contractsService.findContracts(
      this.searchForm.value.search
    );
  }
}
