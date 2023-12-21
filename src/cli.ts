import { defineCommand, renderUsage, runMain } from 'citty';
import consola from 'consola';
import defu from 'defu';

import Task from './task';

import { DownloadTemplateOptions } from './types';

function Cli(...params: string[]) {
  const main = defineCommand({
    meta: {
      name: 'unget',
      version: '0.0.0',
      description:
        '`Unget` is a `Giget` fork\nfeaturing a vibrant CLI menu \nwith `Citty` and `Consola`!',
    },

    args: {
      source: {
        type: 'string',
        description:
          'Input source in format of [provider]:repo[/subpath][#ref].',
        alias: 's',
        required: true,
      },
      dir: {
        type: 'string',
        description: 'Destination directory to clone to.',
        alias: 'd',
      },
      provider: {
        type: 'string',
        description: 'Either github, gitlab, bitbucket, or sourcehut.',
        alias: 'p',
      },
      repo: {
        type: 'string',
        description: 'Name of repository in format of {username}/{reponame}.',
        alias: 'r',
      },
      ref: {
        type: 'string',
        description: 'Git ref (branch or commit or tag).',
        alias: 'm',
      },
      subdir: {
        type: 'string',
        description: 'Directory of the repo to clone from.',
      },
      force: {
        type: 'boolean',
        description: 'Enable Force option.',
        alias: 'f',
      },
      'force-clean': {
        type: 'boolean',
        description: 'Clean ups any existing directory or file before cloning.',
        alias: 'F',
      },
      offline: {
        type: 'boolean',
        description: 'Do not attempt to download and use cached version.',
        alias: 'o',
      },
      preferOffline: {
        type: 'boolean',
        description: 'Use cache if exists otherwise try to download.',
        alias: 'O',
      },
      cwd: {
        type: 'string',
        description:
          'Current working directory to resolve dirs relative to it.',
        alias: 'D',
      },
      token: {
        type: 'string',
        description:
          'Custom Authorization token to use for downloading template.',
        alias: 't',
      },
    },

    run: ({ args }) => {
      const defaultOptions: DownloadTemplateOptions = {
        source: '',
        options: {
          dir: '',
          provider: 'github',
          repo: '',
          ref: 'main',
          subdir: '',
          force: false,
          forceClean: false,
          offline: false,
          preferOffline: false,
          cwd: '',
          auth: process.env.GITHUB_TOKEN,
        },
      };

      if (args.hasOwnProperty('force-clean')) {
        defaultOptions.options!.forceClean = args['force-clean'];
      }

      const finalArgs = defu(args, defaultOptions);
      console.log('merge args:', { args });
      console.log('final args:', { finalArgs });

      Task(finalArgs);
    },
  });

  runMain(main, {
    rawArgs: params,

    showUsage: async (cmd, parent) => {
      consola.box({
        title: '  Help  ',
        message: await renderUsage(cmd, parent),
        style: { padding: 4, borderColor: 'yellow', borderStyle: 'rounded' },
      });
    },
  });
}

export default Cli;
