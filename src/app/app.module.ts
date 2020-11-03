import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { DataService } from './services/data.service';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { SkillEditorComponent } from './components/skill-editor/skill-editor.component';
import { ExpGeneratorComponent } from './components/exp-generator/exp-generator.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';

@NgModule({
  declarations: [AppComponent, PlayerFormComponent, SkillEditorComponent, ExpGeneratorComponent, PlayerDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
