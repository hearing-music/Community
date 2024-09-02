import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../components/loading/loading.module'
import {
	NbLayoutModule,
} from '@nebular/theme';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LayersComponent } from './layers/layers.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
@NgModule({
	imports: [
		LoginRoutingModule,
		NzMessageModule,
		ThemeModule,
		NbLayoutModule,
		FormsModule,
		NzButtonModule,
		LoadingModule,
		NzCardModule,
		NzInputModule,
		NzSelectModule,
		NzLayoutModule,
		NzCarouselModule,
	],
	declarations: [
		LoginComponent,
		LayersComponent,
	],
})
export class LoginModule {
}
