import { Subject } from 'rxjs';
import { Company } from './company.model';
import { GeneralService } from './general.service';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class CompaniesService {
  companies: Company[] = [];
  companiesChanged = new Subject<boolean>();
  companyAddingStatus = new Subject<boolean>();
  newCompanyId = new Subject<string>();

  constructor(private generalService: GeneralService) { }

  addCompany(newCompany: Company) {
    this.generalService.addNewData('companies', newCompany)
      .subscribe(
        (res: { name: string }) => {
          this.companies.push({ ...newCompany, id: res.name });
          this.companiesChanged.next(true);
          this.companyAddingStatus.next(true);
          this.newCompanyId.next(res.name);
        }, error => {
          console.log(error);
          this.companyAddingStatus.next(false);
        }
      )
  }

  checkExistCompany(newCompany: Company) {
    const foundCompany = this.companies.find(company => company.crNo === newCompany.crNo);
    if (foundCompany) {
      this.newCompanyId.next(foundCompany.id);
    } else {
      this.addCompany(newCompany)
    }
  }

  loadCompanies() {
    this.generalService.getArrayOfData('companies').subscribe(
      (res: Company[]) => {
        this.companies = res;
        this.companiesChanged.next(true);
      }, error => {
        console.log(error);
      }
    )
  }
}
