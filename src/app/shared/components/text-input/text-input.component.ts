import { Component, ElementRef, Input, Self, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent  {
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Input() label!: string;
  @Input() type = 'text';

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control?.validator] : [];
    const asyncValidators = control?.asyncValidator
      ? [control?.asyncValidator]
      : [];

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  onChange(_event: Event): any {
    const inputElement = _event.target as HTMLInputElement;
    const value = inputElement.value;

    if (this.controlDir && this.controlDir.control) {
      this.controlDir.control.setValue(value);
    }
  }

  onTouched(): any {}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
