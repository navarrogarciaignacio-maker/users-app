import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main.html'
})
export class MainComponent implements OnInit {

  users: any[] = [];
  user: any = null;

  mode: 'list' | 'detail' | 'form' = 'list';
  isEdit = false;
  id: string | null = null;

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    image: ['', Validators.required]
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.url.subscribe(() => this.loadView());
  }

  loadView() {
    const url = this.router.url;

    if (url.includes('newuser')) {
      this.mode = 'form';
      this.isEdit = false;
      this.form.reset();
    }

    else if (url.includes('updateuser')) {
      this.mode = 'form';
      this.isEdit = true;
      this.id = this.route.snapshot.paramMap.get('id');
      this.userService.getById(this.id!).subscribe(res => {
        this.form.patchValue(res);
      });
    }

    else if (url.includes('user/')) {
      this.mode = 'detail';
      this.id = this.route.snapshot.paramMap.get('id');
      this.userService.getById(this.id!).subscribe(res => this.user = res);
    }

    else {
      this.mode = 'list';
      this.userService.getAll().subscribe(res => this.users = res.results);
    }
  }

  delete(id: string) {
    if (confirm('¿Borrar?')) {
      this.userService.delete(id).subscribe(() => this.loadView());
    }
  }

  submit() {
    if (this.form.invalid) return;

    if (this.isEdit) {
      this.userService.update(this.id!, this.form.value)
        .subscribe(() => alert('Actualizado'));
    } else {
      this.userService.create(this.form.value)
        .subscribe(() => alert('Creado'));
    }
  }
}