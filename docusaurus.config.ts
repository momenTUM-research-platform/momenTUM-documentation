import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'momenTUM Documentation',
  tagline: 'Interactive documentation for the momenTUM Research Platform',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://momenTUM-research-platform.github.io',
  baseUrl: '/momenTUM-documentation/',
  
  organizationName: 'momenTUM-research-platform',
  projectName: 'momenTUM-documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'momenTUM',
      logo: {
        alt: 'momenTUM logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        // {
        //   href: 'https://github.com/momenTUM-research-platform/momenTUM-app',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview/platform-overview',
            },
            {
              label: 'Example Study',
              to: '/docs/examples/example-study-v3',
            },
            {
              label: 'Question Types',
              to: '/docs/schemas/question-types',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Participant App Download',
              href: 'https://momentumresearch.eu/participants.html',
        
            },
            {
              label: 'Designer',
              href: 'https://designer.momentumresearch.eu/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} momenTUM Research Platform.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;