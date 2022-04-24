import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFactoryComponent } from './campaign-factory.component';

describe('CampaignFactoryComponent', () => {
  let component: CampaignFactoryComponent;
  let fixture: ComponentFixture<CampaignFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
