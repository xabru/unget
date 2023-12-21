import { createConsola } from 'consola';
import { downloadTemplate } from 'giget';

import { GigetOptions } from './types';

export default function Wrapper(args: GigetOptions) {
  const consola = createConsola({
    formatOptions: {
      compact: false,
      colors: true,
      date: true,
      columns: 10,
    },
  }).withTag(' INFO ');

  false &&
    consola.box({
      title: '  Debug Args  ',
      message: args,
      style: {
        padding: 2,
        marginLeft: 4,
        borderColor: 'magenta',
        borderStyle: 'double-single-rounded',
      },
    });

  (async () => {
    const { source, dir } = await downloadTemplate(args.source, args.options);
    consola.success('Downloaded template:', source);
    consola.success('Downloaded directory:', dir);
  })();
}
