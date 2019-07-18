#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const async = require('async');
const { insertCandidate, upsertConstituency } = require('./lib/people_importer');

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

function tryGetEngName(person) {
  return person.elections.map(ele => ele.name_eng).find(name => name !== '') || null;
}

function getInsertCandidateFunc() {
  return async.asyncify(async (person) => {
    person.name_eng = tryGetEngName(person);
    await insertCandidate(person); //eslint-disable-line
  });
}

function getUpsertConstituencyFunc(year) {
  return async.asyncify(async (feature) => {
    await upsertConstituency(year, feature); //eslint-disable-line
  });
}

async function upsertPeople(filePath) {
  if (!fs.existsSync(filePath)) {
    log.error('File does not exists');
    return;
  }

  try {
    const rawPeople = JSON.parse(fs.readFileSync(filePath).toString());
    log.info(`Total ${rawPeople.length} people`);

    async.eachOfLimit(rawPeople, 50, getInsertCandidateFunc(), (err) => {
      if (err) {
        log.error(err);
      } else {
        log.info('Finished!');
      }
      end();
    });
  } catch (error) {
    log.error(error);
  }
}

async function upsertPolygon(year, filePath) {
  if (!fs.existsSync(filePath)) {
    log.error('File does not exists');
    return;
  }

  if ((year - 1999) % 4 !== 0) {
    log.error(`Invalid year ${year}`);
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath).toString());
    log.info(`Total ${data.features.length} region`);

    async.eachOfLimit(data.features, 50, getUpsertConstituencyFunc(year), (err) => {
      if (err) {
        log.error(err);
      } else {
        log.info('Finished!');
      }
      end();
    });
  } catch (error) {
    log.error(error);
  }
}

program
  .version('0.1.0');

/**
 * Simple mathematic calcuation
 */
program
  .command('upsert_people <filePath>')
  .description('insert/update the people data')
  .action(upsertPeople);

program
  .command('upsert_polygon <year> <filePath>')
  .description('insert/update the polygon data for constituency')
  .action(upsertPolygon);

program.command('export [command]', 'export data from hasura to csv');
program.command('import [command]', 'import data from csv to hasura');

program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
