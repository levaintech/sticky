/** @type {import('@birthdayresearch/contented').ContentedConfig} */
const config = {
  preview: {
    name: 'Sticky',
    url: 'https://sticky.birthday.dev',
    github: {
      url: 'https://github.com/birthdayresearch/sticky',
    },
  },
  processor: {
    rootDir: '../../',
    pipelines: [
      {
        type: 'Sticky',
        pattern: '**/*.md',
        processor: 'md',
        transform: (file) => {
          if (file.path === '/readme') {
            file.path = '/';
          } else {
            file.path = file.path.replaceAll(/\/readme$/g, '');
            file.sections = ['Packages'];
          }
          return file;
        },
        sort: (a, b) => {
          if (a.sections.length === 0) {
            return -1;
          }
          return 0;
        },
      },
    ],
  },
};

export default config;
