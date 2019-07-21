#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const async = require('async');
const json2csv = require('json2csv');

const { runQuery } = require('./lib/hasura');
const { QUERY_GET_PEOPLE, QUERY_GET_CONSTITUENCIES, QUERY_GET_CANDIDATES } = require('./lib/gql');


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


async function exportPeople(filePath) {
  log.info(`Prepare to export the pepole data to ${filePath} ...`);
  const res = await runQuery(QUERY_GET_PEOPLE, {});
  const { dc_people } = res.body.data;
  log.info(`Total people: ${dc_people.length}`);

  const csv = json2csv.parse(dc_people);
  fs.writeFileSync(filePath, csv);
}

async function exportDistrict(filePath) {
  log.info(`Prepare to export the constituencies data to ${filePath} ...`);
  const res = await runQuery(QUERY_GET_CONSTITUENCIES, {});
  const { dc_constituencies } = res.body.data;
  log.info(`Total district: ${dc_constituencies.length}`);

  const csv = json2csv.parse(dc_constituencies);
  fs.writeFileSync(filePath, csv);
}

async function exportCandidate(filePath) {
  log.info(`Prepare to export the candidate data to ${filePath} ...`);
  const res = await runQuery(QUERY_GET_CANDIDATES, {});
  const { dc_candidates } = res.body.data;
  log.info(`Total candidates: ${dc_candidates.length}`);

  const csv = json2csv.parse(dc_candidates);
  fs.writeFileSync(filePath, csv);
}


program
  .version('0.1.0');

program
  .command('people <file>')
  .description('export the people data')
  .action(exportPeople);


program
  .command('district <file>')
  .description('export the district data')
  .action(exportDistrict);


program
  .command('candidates <file>')
  .description('export the candidates data')
  .action(exportCandidate);


program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
