import { defineCommand, renderUsage, runMain } from 'citty';
import consola from 'consola';
import defu from 'defu';

import Wrapper from './wrapper';

import { GigetOptions } from './types';

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
        alias: 'S',
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
      'prefer-offline': {
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
      const gigetDefaultOptions: GigetOptions = {
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
          auth: process.env.GITHUB_TOKEN || '',
        },
      };

      const mappingOptions = {
        token: 'auth',
        'force-clean': 'forceClean',
        'prefer-offline': 'preferOffline',
      };

      const { options } = gigetDefaultOptions;

      for (const [argKey, optionKey] of Object.entries(mappingOptions)) {
        options![optionKey] = args.hasOwnProperty(argKey)
          ? args[argKey]
          : options![optionKey];
      }

      // console.log({ args }, { gigetDefaultOptions });

      const gigetOptions = defu(args, gigetDefaultOptions);

      Wrapper(gigetOptions);
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
