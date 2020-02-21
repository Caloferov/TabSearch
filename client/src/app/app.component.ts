import { Component, HostListener } from '@angular/core';
import { Tab } from './tab';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeTabID = 1;
  baseID = 1;
  title = 'ScaleFocusClient';

  tabs: Tab[] = [{
    id: 1,
    title: 'New Tab'
  }];

  createNewTab() {
    let nextID = this.baseID + 1;
    this.tabs.push({ id: nextID, title: "New Tab" });
    this.baseID++;
    this.activeTabID = nextID;
  }

  chooseTab(chosenID) {
    this.activeTabID = chosenID;
  }

  closeTab(tabToCloseID) {
    this.tabs = this.tabs.filter(tab => {
      return tab.id != tabToCloseID;
    });
    if (tabToCloseID === this.activeTabID) {
      this.activeTabID = this.tabs[this.tabs.length - 1].id;
    }
  }

  updateTabTitle(update) {
    let index = this.tabs.findIndex(tab => tab.id == update.id);
    this.tabs[index].title = update.title;
  }
}
