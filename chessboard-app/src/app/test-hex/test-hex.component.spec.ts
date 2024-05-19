import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHexComponent } from './test-hex.component';

describe('TestHexComponent', () => {
  let component: TestHexComponent;
  let fixture: ComponentFixture<TestHexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
