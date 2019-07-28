import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedDateComponent } from './published-date.component';

describe('PublishedDateComponent', () => {
  let component: PublishedDateComponent;
  let fixture: ComponentFixture<PublishedDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const d = '2019-07-26';
      const expectedRes = 'Fri, 26 Jul 2019 00:00:00 GMT';
      expect(component.formatDate(d)).toEqual(expectedRes);
    });
  });
});
