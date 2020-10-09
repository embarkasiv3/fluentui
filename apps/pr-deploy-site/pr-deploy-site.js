// If you are adding a new tile into this site, place make sure it is also being copied from `just.config.ts`

const siteInfo = [
  {
    package: '@fluentui/public-docsite-resources',
    link: './public-docsite-resources/index.html',
    icon: 'FavoriteStar',
    title: 'Demo Site',
  },
  {
    package: '@fluentui/react',
    link: './react/dist-storybook/index.html',
    icon: 'FavoriteStar',
    title: 'Fabric Storybook Site',
  },
  {
    package: '@fluentui/public-docsite',
    link: './public-docsite/index.html?devhost',
    icon: 'Website',
    title: 'Website',
  },
  { package: '@fluentui/docs', link: './react-northstar', icon: 'FavoriteStar', title: 'react-northstar' },
  {
    package: '@fluentui/react-avatar',
    link: './react-avatar/dist-storybook/index.html',
    icon: 'Contact',
    title: 'Avatar',
  },
  {
    package: '@fluentui/react-button',
    link: './react-button/dist-storybook/index.html',
    icon: 'LikeSolid',
    title: 'Button',
  },
  {
    package: '@fluentui/react-checkbox',
    link: './react-checkbox/dist-storybook/index.html',
    icon: 'CheckboxComposite',
    title: 'Checkbox',
  },
  {
    package: '@fluentui/react-image',
    link: './react-image/dist-storybook/index.html',
    icon: 'FileImage',
    title: 'Image',
  },
  {
    package: '@fluentui/react-toggle',
    link: './react-toggle/dist-storybook/index.html',
    icon: 'ToggleLeft',
    title: 'Toggle',
  },
  {
    package: '@fluentui/react-tabs',
    link: './react-tabs/dist-storybook/index.html',
    icon: 'BrowserTab',
    title: 'Tabs',
  },
  {
    package: '@fluentui/react-text',
    link: './react-text/dist-storybook/index.html',
    icon: 'TextOverflow',
    title: 'Text',
  },
  {
    package: '@fluentui/react-slider',
    link: './react-slider/dist-storybook/index.html',
    icon: 'Slider',
    title: 'Slider',
  },
  {
    package: '@fluentui/react-link',
    link: './react-link/dist-storybook/index.html',
    icon: 'Link',
    title: 'Link',
  },
  {
    package: '@fluentui/react-next',
    link: './react-next/dist-storybook/index.html',
    icon: 'DoubleChevronRight12',
    title: 'Next',
  },
  { package: '@uifabric/experiments', link: './experiments/index.html', icon: 'TestBeaker', title: 'Experiments' },
  { package: '@uifabric/charting', link: './charting/index.html', icon: 'BarChart4', title: 'Charting' },
  { package: '@uifabric/date-time', link: './date-time/index.html', icon: 'PrimaryCalendar', title: 'Date/Time' },
  { package: 'todo-app', link: './todo-app/index.html', icon: 'CheckMark', title: 'Todo Example' },
  {
    package: 'theming-designer',
    link: './theming-designer/index.html',
    icon: 'CheckMark',
    title: 'Theme Designer Example',
  },
  { package: 'perf-test', link: './perf-test/index.html', icon: 'SpeedHigh', title: 'Perf Tests' },
];

var siteLink = document.getElementById('site-list');

window.renderSiteLinks = function(packages) {
  siteInfo.forEach(function(info) {
    if (packages.indexOf(info.package) > -1) {
      var li = document.createElement('LI');
      li.className = 'Tile';
      li.innerHTML = `<a href="${info.link}" class="Tile-link">
        <i class="ms-Icon ms-Icon--${info.icon}"></i>${info.title}
      </a>`;

      siteLink.appendChild(li);
    }
  });
};
