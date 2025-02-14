 function showThemes (show=true) {
    /* Reveal submenu. */
    const sm = document.getElementsByClassName('theme-submenu');
    for (let i = 0; i < sm.length; i++) {
        if (show) {
            sm[i].style.display = 'block';
        } else if (show === null) {
            /* If 'show' undefined then toggle the display. */
            if (sm[i].style.display === 'none') {
                sm[i].style.display = 'block';
            } else {
                sm[i].style.display = 'none';
            }
        } else {
            /* Hide the menu instead. */
            sm[i].style.display = 'none';
        }
    }
 };

 function selectTheme (theme) {
    showThemes(false)
    document.getElementById('color-scheme').value = theme;
    /* Find all anchors that point to pages on this site. */
    let links = document.getElementsByClassName('localdoc')
    for (i of links) {
        /* Add the user-selected theme to the search content of local pages. */
        i.href = replaceUrlParam(i.href, 'selected-theme', theme);
    }

    /* Clear styling from all menu options. */
    for (i of ['System', 'Dark', 'Light']) {
        document.getElementById(i).classList.remove('selected-theme');
    }
    /* Reapply to selected option. */
    document.getElementById(theme).classList = ['selected-theme'];
 };

 function replaceUrlParam(url, paramName, paramValue) {
    if (paramValue == null) {
        paramValue = '';
    }
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
    if (url.search(pattern)>=0) {
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/[?#]$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
};

class themeMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <!--
  Conditional formatting for light/dark theme is controlled by hidden input.
  -->
  <input type="hidden" id="color-scheme" value="System"></input>
    <!-- Popup menu to control light/dark theme. -->
    <div class="theme-menu">
        <button type="button" onclick="showThemes(null);" title="Toggle light/dark mode"
        aria-label="Toggle light/dark mode">
        <span class="material-icons">contrast</span>
        </button>
        <ul class="theme-submenu" style="display:none">
        <li id="System" class="selected-theme">
            <button type="button" onclick="selectTheme('System');">
            <span class="material-icons">contrast</span>
            <span class="button-text">System</span>
            </button>
        </li>
        <li id="Light">
            <button type="button" onclick="selectTheme('Light');">
            <span class="material-icons">light_mode</span>
            <span class="button-text">Light</span>
            </button>
        </li>
        <li id="Dark">
            <button type="button" onclick="selectTheme('Dark');">
            <span class="material-icons">dark_mode</span>
            <span class="button-text">Dark</span>
            </button>
        </li>
        </ul>
    </div>`;
  }
};
/* Create custom HTML element to populate with the themeMenu. */
customElements.define('theme-menu', themeMenu);

/* Called once full page has loaded. Updates page then sets it to visible. */
function updateAndReveal() {
    let params = new URLSearchParams(document.location.search);
    let theme = params.get('selected-theme');
    if (theme !== null && ['System', 'Dark', 'Light'].includes(theme)) {
        selectTheme(theme);
    }
    document.body.style.visibility = 'visible';
};
