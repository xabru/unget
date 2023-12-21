import Cli from './cli';

if (import.meta.url === `file://${process.argv[1]}` || !import.meta.url) {
  console.log('arg:', process.argv.slice(2));
  Cli(...process.argv.slice(2));
}

export default Cli;
