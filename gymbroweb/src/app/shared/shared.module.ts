import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarNavigationComponent } from './componets/toolbar-navigation/toolbar-navigation.component';

import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { FooterComponent } from './componets/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarNavigationComponent, FooterComponent],
  imports: [
    CommonModule,
    AvatarModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    ToolbarModule,
    ImageModule,
    CardModule,
    RouterModule,
  ],
  exports: [ToolbarNavigationComponent, FooterComponent],
})
export class SharedModule {}
