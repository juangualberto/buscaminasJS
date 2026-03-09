
export default class PanelRouter {
  constructor({ panelSelector = '.panel', menuPrefix = 'menu_', panelPrefix = 'panel_' } = {}) {
    this.panelSelector = panelSelector;
    this.menuPrefix = menuPrefix;
    this.panelPrefix = panelPrefix;
    this.activePanel = null;
  }

  init(initialPanelId) {
    const menus = document.querySelectorAll(`[id^="${this.menuPrefix}"]`);

    for (const menu of menus) {
      menu.addEventListener('click', (event) => {
        event.preventDefault();
        const panelId = menu.id.replace(this.menuPrefix, this.panelPrefix);
        this.activate(panelId);
      });
    }

    this.activate(initialPanelId);
  }

  activate(panelId) {
    const panels = document.querySelectorAll(this.panelSelector);

    for (const panel of panels) {
      panel.hidden = panel.id !== panelId;
    }

    this.activePanel = panelId;
  }
}