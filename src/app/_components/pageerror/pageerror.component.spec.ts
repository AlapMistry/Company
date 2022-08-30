import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageerrorComponent } from './pageerror.component';

describe('PageerrorComponent', () => {
  let component: PageerrorComponent;
  let fixture: ComponentFixture<PageerrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageerrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
