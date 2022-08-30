import { readFileSync } from 'node:fs';

/**
 * `package.json` represented as constructable Class.
 */
export class PackageJson {
  private readonly json: {
    name: string;
    scripts: Record<string, string>;
  };

  constructor(cwd: string) {
    const contents = readFileSync(`${cwd}/package.json`, { encoding: 'utf-8' });
    if (contents === undefined) {
      throw new Error('package.json not found');
    }
    this.json = JSON.parse(contents);
  }

  /**
   * @return {string} name of the project
   */
  getName(): string | undefined {
    return this.json.name;
  }

  /**
   * @param {string} name of the script to lookup
   * @return {string} script
   */
  getScript(name: string): string | undefined {
    return this.json.scripts[name];
  }

  /**
   * @param {string} name of the script to lookup
   * @return {boolean} if exist
   */
  hasScript(name: string): boolean {
    return this.getScript(name) !== undefined;
  }
}
