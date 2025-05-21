class themeMenu extends HTMLElement {
  static themes = ['System', 'Dark', 'Light'];

  constructor() {
    super();
    // Set the default theme to system.
    this.theme = 'System';
  }

  showThemes (show=true) {
    // Reveal submenu.
    const sm = document.getElementsByClassName('theme-submenu');
    for (let i = 0; i < sm.length; i++) {
      if (show) {
        sm[i].style.display = 'block';
      } else if (show === null) {
        // If 'show' is undefined then toggle the display.
        if (sm[i].style.display === 'none') {
          sm[i].style.display = 'block';
        } else {
          sm[i].style.display = 'none';
        }
      } else {
        // Hide the menu instead.
        sm[i].style.display = 'none';
      }
    }
  }

  selectTheme (theme) {
    this.showThemes(false)
    document.getElementById('color-scheme').value = theme;
    // Find all anchors that point to pages on this site.
    let links = document.getElementsByClassName('localdoc')
    for (const i of links) {
      // Add the user-selected theme to the search content of local pages.
      i.href = themeMenu.replaceUrlParam(i.href, 'selected-theme', theme);
    }
  
    // Clear styling from all menu options.
    for (const i of themeMenu.themes) {
      document.getElementById(i).classList.remove('selected-theme');
    }
    // Reapply to selected option.
    document.getElementById(theme).classList = ['selected-theme'];
  }

  static replaceUrlParam(url, paramName, paramValue) {
    if (paramValue == null) {
      paramValue = '';
    }
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
    if (url.search(pattern)>=0) {
      return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/[?#]$/, '');
    return url + (
      url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
  }

  connectedCallback() {
    this.appendChild(document.createComment(
      'Conditional formatting of light / dark theme controlled by hidden input.'
    ));

    const input = document.createElement('input');
    input.type = 'hidden';
    input.id = 'color-scheme';
    input.value = this.theme;
    this.appendChild(input);
  
    this.appendChild(document.createComment(
      'Popup menu to control light/dark theme.'));
    
    const themeMenu = document.createElement('div');
    themeMenu.className = 'theme-menu';
    this.appendChild(themeMenu);

    const button = document.createElement('button');
    button.type = 'button';
    button.title = 'Toggle light/dark mode';
    button.innerHTML = '<span class="material-icons">contrast</span>';
    button.addEventListener('click', () => this.showThemes(null));

    themeMenu.appendChild(button);
    const ul = document.createElement('ul');
    ul.className = 'theme-submenu';
    ul.style.display = 'none';
    themeMenu.role = 'menu';
    ul.ariaLabel = 'Theme selection';

    const icons = ['contrast', 'light_mode', 'dark_mode'];
  
    // TODO: Should work: const t = themeMenu.themes;
    const t = ['System', 'Light', 'Dark'];
    for (let i = 0; i < t.length; i++) {
      const li = document.createElement('li');
      li.id = t[i];
      if (t[i] === this.theme) li.className = 'selected-theme';
      li.role = 'menuitem';

      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = `
        <span class="material-icons">${icons[i]}</span>
        <span class="button-text">${t[i]}</span>`;
      button.addEventListener('click', () => this.selectTheme(t[i]));

      li.appendChild(button);
      ul.appendChild(li);
    }
    themeMenu.appendChild(ul);
  }
};
/* Create custom HTML element to populate with the themeMenu. */
customElements.define('theme-menu', themeMenu);

/* Called once full page has loaded. Updates theme then sets it to visible. */
window.addEventListener('DOMContentLoaded', () => {
  let params = new URLSearchParams(document.location.search);
  let theme = params.get('selected-theme');
  if (theme !== null && themeMenu.themes.includes(theme)) {
    document.querySelector('theme-menu').selectTheme(theme);
  }
  document.body.style.visibility = 'visible';
});
