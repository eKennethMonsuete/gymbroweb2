import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarNavigationComponent } from './componets/toolbar-navigation/toolbar-navigation.component';

import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [CommonModule, AvatarModule, ToolbarModule, ButtonModule],
  exports: [ToolbarNavigationComponent],
})
export class SharedModule {}
