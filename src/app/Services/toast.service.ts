import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string = '') {
    this.clearToasts();
    this.toastr.success(message, title, this.getToastConfig('toast-success'));
  }

  showError(message: string, title: string = '') {
    this.clearToasts();
    this.toastr.error(message, title, this.getToastConfig('toast-error'));
  }

  showInfo(message: string, title: string = '') {
    this.clearToasts();
    this.toastr.info(message, title, this.getToastConfig('toast-info'));
  }

  showWarning(message: string, title: string = '') {
    this.clearToasts();
    this.toastr.warning(message, title, this.getToastConfig('toast-warning'));
  }

  private getToastConfig(className: string): Partial<IndividualConfig> {
    return {
      toastClass: className
    };
  }

  private clearToasts() {
    this.toastr.clear();
  }
}
