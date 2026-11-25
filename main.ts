const ENTRY_TEXT = 'PRODUCTION DOWN: I optimized the slow query by removing the WHERE clause. 40,000 users are one row now. It was my fastest deploy ever.';

const USAGE = `Usage: node main.ts [--help]

Print the competition entry text.

Options:
  --help  Show this help message.`;

type ParseResult =
  | { action: 'print' }
  | { action: 'help' }
  | { action: 'error'; message: string };

function parseArgs(args: string[]): ParseResult {
  if (args.length === 0) {
    return { action: 'print' };
  }

  if (args.length === 1 && args[0] === '--help') {
    return { action: 'help' };
  }

  return { action: 'error', message: `Unknown argument: ${args[0]}` };
}

function main(): void {
  const result = parseArgs(process.argv.slice(2));

  if (result.action === 'print') {
    console.log(ENTRY_TEXT);
    return;
  }

  if (result.action === 'help') {
    console.error(USAGE);
    return;
  }

  console.error(result.message);
  console.error(USAGE);
  process.exitCode = 1;
}

main();
