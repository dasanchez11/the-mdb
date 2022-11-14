import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeDiscoverComponent } from './home-discover.component';

fdescribe('HomeDiscoverComponent', () => {
  let component: HomeDiscoverComponent;
  let fixture: ComponentFixture<HomeDiscoverComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDiscoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an only one input', () => {
    const input = el.queryAll(By.css('.discover__input'));
    expect(input.length).toBe(1);
  });

  it('should have a search Button', () => {
    const button = el.queryAll(By.css('.discover__search'));
    expect(button.length).toBe(1);
    const text = button[0].nativeElement.innerText;
    expect(text).toBe('Search');
  });
});
