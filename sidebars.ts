import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: ['overview/platform-overview'],
    },
    {
      type: 'category',
      label: 'Example Study',
      collapsed: false,
      items: ['examples/example-study-v3'],
    },
    {
      type: 'category',
      label: 'Study JSON',
      collapsed: false,
      items: ['schemas/study-object', 'schemas/question-types'],
    },
    {
      type: 'category',
      label: 'Sample Data',
      collapsed: false,
      items: ['sample-data/example-responses'],
    },
  ],
};

export default sidebars;