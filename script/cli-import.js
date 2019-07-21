#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const async = require('async');
const csv2json = require('csvtojson');

const { runQuery } = require('./lib/hasura');
const { QUERY_UPSERT_DISTRICT_NAME, MUTATION_UPSERT_VOTE_DATA } = require('./lib/gql');


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

async function importMetrics(year, filePath, cmd) {
  log.info(`Trying to import the metricñ data from ${filePath}`);
  const data = await csv2json().fromFile(filePath);
  const AGES = ['18_20', '21_25', '26_30', '31_35', '36_40', '41_45', '46_50', '51_55', '56_60', '61_65', '66_70', '71_above'];
  const GENDERS = ['male', 'female'];

  const votes = [];

  let count = 0;
  // TODO: A better way to do this is use async.eachOfLimit
  for (const record of data) {
    const cacode = record.code.substr(0, 3);
    const vote = {
      station_code: record.code,
      name_en: record.name_en,
      name_zh: record.name_zh,
      year: parseInt(year, 10),
      votes: {
        data: [],
        on_conflict: {
          constraint: 'dc_constituency_votes_stat_id_gender_age_key',
          update_columns: ['votes']
        },
      },
    };

    for (const age of AGES) {
      for (const gender of GENDERS) {
        vote.votes.data.push({
          age,
          gender,
          votes: parseInt(record[`${age}_${gender}`], 10),
        });
      }
    }

    votes.push(vote);

    const res = await runQuery(MUTATION_UPSERT_VOTE_DATA, { votes, year, code: cacode });

    if (res.statusCode !== 200) {
      log.error('Error when inserting data.');
      console.error(res.body);
      
    }
  }

  log.info(`${data.length} data imported successfully`);
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

program
  .command('votes <year> <filePath>')
  .description('import the votes data')
  .action(importMetrics);


program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
