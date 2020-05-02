export interface PackageJson {
  name: string;
  version: string;
  main: string;
  types?: string;
  module?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  [key: string]: any;
}

export interface PackageInfo {
  /** Package path relative to the project root */
  packagePath: string;
  /** package.json contents */
  packageJson: PackageJson;
}

export type AllPackageInfo = { [packageName: string]: PackageInfo };

export declare function findGitRoot(): string;

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package
 * (in the CWD when this was called)
 */
export declare function findRepoDeps(): Map<string, Set<string>>;

export declare function getAllPackageInfo(): AllPackageInfo;
