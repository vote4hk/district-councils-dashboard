#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const async = require('async');
const csv2json = require('csvtojson');

const { runQuery } = require('./lib/hasura');
const { QUERY_UPSERT_DISTRICT_NAME } = require('./lib/gql');


require('dotenv').config();

// default logger
const log = {
  debug: msg => console.log(chalk.cyan(msg)),
  info: msg => console.log(chalk.yellow(msg)),
  error: msg => console.log(chalk.red(msg)),
};

/**
 * Termination process
 */
function end() {
  process.exit(1);
}


async function importDistrict(filePath, cmd) {
  log.info(`Trying to import the district data from ${filePath}`);
  let districts = await csv2json().fromFile(filePath);

  if (cmd.name) {
    districts = districts.map(district => ({
      year: parseInt(district.year, 10),
      code: district.dccode,
      name_zh: district.dcname_chi,
      name_en: district.dcname_eng,
    }));
    const res = await runQuery(QUERY_UPSERT_DISTRICT_NAME, { objects: districts });

    if (res.statusCode !== 200) {
      log.error('Error when inserting data.');
      console.error(res.body);
      return;
    }

    log.info(`${districts.length} data imported successfully`);
  }
}

program
  .version('0.1.0');

/**
 * Simple mathematic calcuation
 */
program
  .command('district <file>')
  .description('import the district data')
  .option('-n, --name', 'import the name only')
  .action(importDistrict);


program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
