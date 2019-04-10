import { Component, OnInit, ApplicationModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { ToastrService } from 'ngx-toastr';
import { ActionMode, ScmSharedUtil } from 'src/app/shared/scm-shared-util';
import { Category } from '../category.model';
import { filter, tap, switchMap, map } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/shared/can-deativate-guard.service';

@Component({
  selector: 'poc-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, CanComponentDeactivate {
  subTitle: string;
  actionMode: ActionMode;
  categoryForm: FormGroup;
  private submitted = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private database: DataStoreService,
              private fb: FormBuilder,
              private toastr: ToastrService) { 
    this.initForm();
  }

  ngOnInit() {
    this.route.queryParams.pipe(filter(q => {console.log(q); return q['action'] !== undefined;}),
        tap(q => this._setActionMode(q)),
        switchMap(q => this.route.data),
        filter((data: {category: Category}) => data.category !== null),
        map((data: {category: Category}) => data.category))
      .subscribe(cat =>
        this.actionMode === 'read' ? this.resetForm(cat) : this.categoryForm.patchValue(cat)
      );
  }

  canDeactivate() {
    if(this.submitted || this.categoryForm.pristine) return true;
    return confirm('not saved yet');
  }

  submit() {
    const category: Category = this.categoryForm.value;

    if(this.actionMode === 'create') {
      const categoryFn = (no) => {
        category.no = no;
        return category;
      };
      this.database.create('category', categoryFn).subscribe(this._onSuccess(), this._onError());
      return;
    }

    category.updatedTime = ScmSharedUtil.getCurrentDateTime();
    this.database.update('category', category).then(this._onSuccess(), this._onError());
  }

  cancel() {
    this.redirectToCategoryList();
  }

  private _setActionMode(q) {
    this.actionMode = q['action'];
    switch (this.actionMode) {
      case 'create':
        this.subTitle = 'add';
        break;
      case 'edit':
        this.subTitle = 'mod';
        break;
      case 'read':
      default:
        this.subTitle = 'read';
    }
  }

  private redirectToCategoryList() {
    this.router.navigate(['category-list']);
  }

  private _onSuccess() {
    return () => {
      this.toastr.success(`category ${this.subTitle} confirm`,'[Category Manage]');
      this.submitted = true;
      this.redirectToCategoryList();
    };
  }

  private _onError() {
    return e => {
      this.toastr.error(`Category ${this.subTitle} fail`, '[Category Manage]');
      this.redirectToCategoryList();
    }
  }

  initForm() {
    this.categoryForm = this.fb.group({
      no: [0],
      name: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      isUse: [true, Validators.required],
      createdTime: [ScmSharedUtil.getCurrentDateTime()],
      updatedTime: ['']
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
