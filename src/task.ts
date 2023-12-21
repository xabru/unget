import consola from 'consola';
import { downloadTemplate } from 'giget';
import { DownloadTemplateOptions } from './types';

export default function Task(args: DownloadTemplateOptions) {
  consola.box({
    title: '  Task Args  ',
    message: args,
    style: {
      padding: 2,
      marginLeft: 4,
      borderColor: 'magenta',
      borderStyle: 'double-single-rounded',
    },
  });

  console.log(args);

  (async () => {
    const { source, dir } = await downloadTemplate(args.source, args.options);
    console.log('Downloaded template:', source);
    console.log('Destination directory:', dir);
  })();
}
