/**
 * Terminal output — single responsibility: write text to stdout.
 * No network, no CLI parsing, no business logic.
 */

export class Terminal {
  write(text) {
    process.stdout.write(text);
  }

  writeLine(text) {
    process.stdout.write(text + "\n");
  }

  error(text) {
    process.stderr.write(text + "\n");
  }
}
