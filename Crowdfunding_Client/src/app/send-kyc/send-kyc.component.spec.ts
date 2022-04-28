import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendKYCComponent } from './send-kyc.component';

describe('SendKYCComponent', () => {
  let component: SendKYCComponent;
  let fixture: ComponentFixture<SendKYCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendKYCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendKYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
