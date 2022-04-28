import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApprovalsComponent } from './get-approvals.component';

describe('GetApprovalsComponent', () => {
  let component: GetApprovalsComponent;
  let fixture: ComponentFixture<GetApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
