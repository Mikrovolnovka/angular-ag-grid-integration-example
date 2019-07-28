import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderControlsComponent } from './header-controls.component';

describe('HeaderControlsComponent', () => {
  let component: HeaderControlsComponent;
  let fixture: ComponentFixture<HeaderControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain total records amount', () => {
    component.total = 13;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.total-records').innerText).toEqual('Total records: 13');
  });

  it('should contain selected records amount', () => {
    component.selected = 12;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.selected-records').innerText).toEqual('Selected records: 12');
  });

  it('should contain button with `Disable select mode` text when appropriate', () => {
    component.enabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.toggle-select > button').innerText).toEqual('Disable select mode');
  });

  it('should contain button with `Enable select mode` text when appropriate', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.toggle-select > button').innerText).toEqual('Enable select mode');
  });

  it('should call toggleMode when button is clicked', () => {
    spyOn(component, 'toggleMode');
    fixture.nativeElement.querySelector('div.toggle-select > button').click();
    fixture.detectChanges();
    expect(component.toggleMode).toHaveBeenCalled();
  });

  it('should call output function when toggleMode is called', () => {
    spyOn(component.toggleSelect, 'emit');
    const event = {
      type: 'mockType'
    };
    component.toggleMode(event);
    fixture.detectChanges();
    expect(component.toggleSelect.emit).toHaveBeenCalledWith(event);
  });
});
