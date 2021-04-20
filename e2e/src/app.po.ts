import { browser, by, element } from 'protractor';

export class AppPage {
  boutonSubmit() {
    throw new Error('Method not implemented.');
  }
  setChampsValidesScenarioNominal() {
    throw new Error('Method not implemented.');
  }
  viderToutesLesZones() {
    throw new Error('Method not implemented.');
  }
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('Inter-root h5')).getText();
  }

  
}
