import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRowComponent } from './select-row.component';

describe('SelectRowComponent', () => {
  let component: SelectRowComponent;
  let fixture: ComponentFixture<SelectRowComponent>;
  let mockData = {
    node: {
      selected: false,
      setSelected: () => {}
    }
  };
  let params;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRowComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.agInit(mockData);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render input', () => {
    component.agInit(mockData);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[type=checkbox]')).toBeTruthy();
  });

  it('should call handleClick and on click', () => {
    spyOn(component, 'handleClick');
    component.agInit(mockData);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('input[type=checkbox]').click();
    fixture.detectChanges();
    expect(component.handleClick).toHaveBeenCalled();
  });

  describe('handleClick', () => {
    it('should call handle shange on click and stop propagation', () => {
      const e = { stopPropagation: () => {} };
      spyOn(e, 'stopPropagation');
      spyOn(component, 'handleChange');
      component.agInit(mockData);
      fixture.detectChanges();
      component.handleClick(e);
      fixture.detectChanges();
      expect(e.stopPropagation).toHaveBeenCalled();
      expect(component.handleChange).toHaveBeenCalled();
    });
  })

  describe('handleChange', () => {
    it ('should call params.node.setSelected on execute', () => {
      mockData.node.setSelected = () => {};
      const checked = true;
      const e = {
        target: {
          checked
        }
      };
      spyOn(mockData.node, 'setSelected');
      component.agInit(mockData);
      fixture.detectChanges();
      component.handleChange(e);
      fixture.detectChanges();
      expect(mockData.node.setSelected).toHaveBeenCalledWith(checked);
    });
  });
});
