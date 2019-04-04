import { Component, OnInit, ApplicationModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { ToastrService } from 'ngx-toastr';
import { ActionMode, ScmSharedUtil } from 'src/app/shared/scm-shared-util';
import { Category } from '../category.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'poc-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  subTitle: string;
  actionMode: ActionMode;
  categoryForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private database: DataStoreService,
              private fb: FormBuilder,
              private toastr: ToastrService) { 
    this.initForm();
  }

  ngOnInit() {
    this.route.queryParams.pipe( filter(q=>q['action'] !== undefined) ).pipe;
  }

  initForm() {
    this.categoryForm = this.fb.group({
      no: [0],
      name: ['', Validators.required],
      desc: ['',Validators.compose([Validators.required, Validators.minLength(5)]), 
             Validators.maxLength(100)],
      isUse: [true, Validators.required],
      createdTime: [ScmSharedUtil.getCurrentDateTime()],
      updatedTime: [''], 
    });
  }

  resetForm(cat: Category) {
    this.categoryForm.reset({
      no: { value: cat.no, disabled: true },
      name: { value: cat.name, disabled: true },
      desc: { value: cat.desc, disabled: true },
      isUse: { value: cat.isUse, disabled: true },
      createdTime: { value: cat.createdTime, disabled: true },
      updatedTime: { value: cat.updatedTime, disabled: true },
    });
  }

}
