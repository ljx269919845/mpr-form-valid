/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControlValidComponent } from './form-control-valid/form-control-valid.component';
import { FormValidMsgDirective } from './directives/form-valid-msg.directive';
import { GlobalValidService } from './services/global-valid.service';
import { FormValidMsgService } from './services/form-valid-msg.service';
import { IsbnValidtorDirective } from './validtors/isbn-validtor.directive';
import { IsbnPartValidDirective } from './validtors/isbn-part-valid.directive';
import { IsbnHeaderValidDirective } from './validtors/isbn-header-valid.directive';
import { FloatOnlyValidtorDirective } from './validtors/float-only-validtor.directive';
import { MprFormGroupDirective } from './directives/form-group.directive';
import { MprFormDirective } from './directives/form.directive';
export class FormValidModule {
}
FormValidModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule
                ],
                declarations: [
                    FormControlValidComponent,
                    FormValidMsgDirective,
                    IsbnValidtorDirective,
                    IsbnPartValidDirective,
                    IsbnHeaderValidDirective,
                    FloatOnlyValidtorDirective,
                    MprFormGroupDirective,
                    MprFormDirective
                ],
                exports: [
                    FormControlValidComponent,
                    FormValidMsgDirective,
                    IsbnValidtorDirective,
                    IsbnPartValidDirective,
                    IsbnHeaderValidDirective,
                    ReactiveFormsModule,
                    FormsModule,
                    FloatOnlyValidtorDirective,
                    MprFormGroupDirective,
                    MprFormDirective
                ],
                providers: [
                    GlobalValidService,
                    FormValidMsgService
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9mb3JtLXZhbGlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBbUMvRCxNQUFNOzs7WUFqQ0wsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsV0FBVztpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1oseUJBQXlCO29CQUN6QixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0Qix3QkFBd0I7b0JBQ3hCLDBCQUEwQjtvQkFDMUIscUJBQXFCO29CQUNyQixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCx5QkFBeUI7b0JBQ3pCLHFCQUFxQjtvQkFDckIscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLDBCQUEwQjtvQkFDMUIscUJBQXFCO29CQUNyQixnQkFBZ0I7aUJBQ2pCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxrQkFBa0I7b0JBQ2xCLG1CQUFtQjtpQkFDcEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNcHJGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS1ncm91cC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNcHJGb3JtRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0uZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBNcHJGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgICBNcHJGb3JtRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgTXByRm9ybUdyb3VwRGlyZWN0aXZlLFxyXG4gICAgTXByRm9ybURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBGb3JtVmFsaWRNc2dTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTW9kdWxlIHsgfVxyXG4iXX0=