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
@NgModule({
	imports: [
		LoginRoutingModule,
		NzMessageModule,
		ThemeModule,
		NbLayoutModule,
		FormsModule,
		NzButtonModule,
		LoadingModule
	],
	declarations: [
		LoginComponent,
	],
})
export class LoginModule {
}
