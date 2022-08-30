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
        fields: {
          title: {
            type: 'string',
          },
        },
        transform: (file) => {
          if (file.path === '/readme') {
            file.path = '/';
            file.fields.title = 'Sticky';
          } else {
            file.path = file.path.replaceAll(/\/readme$/g, '');
            file.sections = file.sections.slice(0, 1).map((v) => v.toUpperCase());
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
