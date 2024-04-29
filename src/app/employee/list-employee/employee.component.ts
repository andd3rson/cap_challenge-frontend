import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../employee.service';
import { Employee } from '../employee-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagedList } from 'src/app/shared/model/PagedList';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

  $employee!: Employee[];
  itemToBeDeleted!: String;
  search = "";
  totalPage = 0;
  page = 1;
  pageSize: number = 5;
  constructor(private employeeServices: EmployeeServices, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshEmployee();
  }

  open(content: any, item: Employee) {
    this.itemToBeDeleted = item.fullname;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.employeeServices.remove(Number(item!.id)).subscribe(
          success => {
            this.toastr.success('well done! it was deleted.', 'DONE')
            this.refreshEmployee()
          }
        )
      }
    }, (reason) => {
      console.log(reason);
    });
  }
  refreshEmployee() {
    this.employeeServices.getWithPaginationAndFilter(this.search, this.page, this.pageSize).subscribe(
      (paged: PagedList<Employee>) => {
        this.page = paged.page;
        this.pageSize = paged.pageSize;
        this.totalPage = paged.totalPage;
        this.$employee = paged.items
      }
    );
  }
  nextPage() {
    this.refreshEmployee();
  }
  itemPerPage() {
    this.refreshEmployee();
  }
}
