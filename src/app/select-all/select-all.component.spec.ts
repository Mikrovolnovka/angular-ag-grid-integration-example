import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllComponent } from './select-all.component';
import { fn } from '@angular/compiler/src/output/output_ast';

describe('SelectAllComponent', () => {
  let component: SelectAllComponent;
  let fixture: ComponentFixture<SelectAllComponent>;
  let params;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    params =  {
      column: {},
      displayName: 'otherVal',
      enableSorting: true,
      enableMenu: true,
      showSortingMenu: false,
      showColumnMenu: false,
      progressSort: false,
      setSort: () => {},
      api: {
        addEventListener: () => {},
        selectAll: () => {},
        deselectAll: () => {},
        getDisplayedRowCount: () => 2,
      },
      columnApi: {},
      context: {},
      template: '<div />'
    };
  
    fixture = TestBed.createComponent(SelectAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[type=checkbox]')).toBeTruthy();
  });

  it('should contain correctly set params and event listener to be added', () => {
    spyOn(params.api, 'addEventListener');
    component.agInit(params);
    fixture.detectChanges();
    expect(component.params).toEqual(params);
    expect(params.api.addEventListener).toHaveBeenCalled();
  });

  it('should call toggleSelectAll on change the checkbox', () => {
    spyOn(component, 'toggleSelectAll');
    fixture.nativeElement.querySelector('input').click();
    fixture.detectChanges();
    expect(component.toggleSelectAll).toHaveBeenCalled();
  });

  describe('toggleSelectAll', () => {
    it('should call api.selectAll on click toggleSelectAll with checked value', () => {
      spyOn(params.api, 'selectAll');
      component.agInit(params);
      fixture.detectChanges();
      component.toggleSelectAll({
        target: {
          checked: true
        }
      });
      fixture.detectChanges();
      expect(params.api.selectAll).toHaveBeenCalled();
    });

    it('should call api.deselectAll on click toggleSelectAll with unchecked value', () => {
      spyOn(params.api, 'deselectAll');
      component.agInit(params);
      fixture.detectChanges();
      component.toggleSelectAll({
        target: {
          checked: false
        }
      });
      fixture.detectChanges();
      expect(params.api.deselectAll).toHaveBeenCalled();
    });
  });

  describe('updateCheckBox', () => {
    it('should become unchecked if not all rows are selected', () => {
      params.api.getSelectedNodes = () => [1];
      component.agInit(params);
      fixture.detectChanges();
      component.updateCheckBox();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[type=checkbox]:checked')).toBeFalsy();
    });

    it('should become checked if all rows are selected', () => {
      params.api.getSelectedNodes = () => [1, 2];
      component.agInit(params);
      fixture.detectChanges();
      component.updateCheckBox();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[type=checkbox]:checked')).toBeTruthy();
    });
  });
});
