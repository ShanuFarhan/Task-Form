import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreButtonRenderComponent } from './restore-button-render.component';

describe('RestoreButtonRenderComponent', () => {
  let component: RestoreButtonRenderComponent;
  let fixture: ComponentFixture<RestoreButtonRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoreButtonRenderComponent]
    });
    fixture = TestBed.createComponent(RestoreButtonRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
