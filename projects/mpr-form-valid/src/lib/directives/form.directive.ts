import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'form,ngForm,[ngForm]'
})
export class MprFormDirective {
  constructor(private elem: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    if (this.elem.nativeElement && this.elem.nativeElement.setAttribute) {
      this.render.setAttribute(this.elem.nativeElement, 'formgroup', 'formgroup');
    } else if (this.elem.nativeElement && this.elem.nativeElement.parentElement) {
      this.render.setAttribute(this.elem.nativeElement.parentElement, 'formgroup', 'formgroup');
    }
  }
}
