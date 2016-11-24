import { GamedbPage } from './app.po';

describe('gamedb App', function() {
  let page: GamedbPage;

  beforeEach(() => {
    page = new GamedbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
