import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IListDetails } from '../../interfaces/list-details-response.interface';

import { ListPreviewComponent } from './list-preview.component';

const mockList : IListDetails = {
  created_by: "creator",
  items: [],
  description: 'test',
  favorite_count: 1,
  id: '1',
  item_count: 1,
  iso_639_1: 'test',
  list_type: 'test',
  name: 'test',
  poster_path: 'path',
};

describe('ListPreviewComponent', () => {
  let component: ListPreviewComponent;
  let fixture: ComponentFixture<ListPreviewComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [ListPreviewComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPreviewComponent);
    component = fixture.componentInstance;
    component.list = mockList;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', async () => {
    component.openConfirmationDialog();
    let dialog = await loader.getHarness(MatDialogHarness);
    expect(dialog).toBeTruthy();
  });

  it('should dispatch delete list action when confirmation is true', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(true));
    component.deleteList();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      ListsActions.deleteList({ listId: parseInt(mockList.id) })
    );
  });

  it('should not dispatch delete list action when confirmation is false', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(false));
    component.deleteList();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
