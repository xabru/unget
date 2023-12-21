import Cli from './cli';

if (import.meta.url === `file://${process.argv[1]}` || !import.meta.url) {
  Cli(...process.argv.slice(2));
}

export default Cli;
