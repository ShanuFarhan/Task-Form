import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedUsersComponent } from './deleted-users.component';

describe('DeletedUsersComponent', () => {
  let component: DeletedUsersComponent;
  let fixture: ComponentFixture<DeletedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedUsersComponent]
    });
    fixture = TestBed.createComponent(DeletedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
