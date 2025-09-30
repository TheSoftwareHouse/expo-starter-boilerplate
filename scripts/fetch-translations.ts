import { writeJSONFile } from 'babelsheet2-json-writer';
import { fromBabelsheet } from 'babelsheet2-reader';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { groupBy, mergeMap } from 'rxjs/operators';

const projectRoot = path.resolve(__dirname, process.cwd());
const configPath = path.join(projectRoot, './babelsheet.json');

if (!existsSync(configPath)) {
  console.error('❌ babelsheet.json not found. Please create it first.');
  process.exit(1);
}

const babelsheetConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

const credentialsPath = path.join(projectRoot, babelsheetConfig.credentials);
if (!existsSync(credentialsPath)) {
  console.error(`❌ Credentials file '${credentialsPath}' not found. Please create it first.`);
  process.exit(1);
}

const credentials = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

fromBabelsheet({
  spreadsheetId: babelsheetConfig.spreadsheetId,
  credentials,
})
  .pipe(
    groupBy(({ language }) => language, { element: ({ path, ...entry }) => ({ ...entry, path: path.join('.') }) }),
    mergeMap((languageEntries$) =>
      languageEntries$.pipe(writeJSONFile(`./src/i18n/data/${languageEntries$.key}.json`)),
    ),
  )
  .subscribe(({ filePath, entryCount }) => {
    console.log(`Wrote file: "${filePath}" with ${entryCount} entries`);
  });
