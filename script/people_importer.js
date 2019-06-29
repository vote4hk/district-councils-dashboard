const { runQuery } = require('./hasura');

const constituencyHash = {};

async function upsertPerson(person) {
  const {
    name_chi, name_eng, gender, estimated_birth,
  } = person;

  const query = `
    mutation insertPersion($person: dc_people_insert_input!) {
      insert_dc_people(objects: [
        $person
      ], on_conflict: {
        constraint: dc_people_name_zh_name_en_estimated_yob_key,
        update_columns: [ gender ]
      }) {
        returning {
          id
        }
      }
    }
  `;

  // TODO: assume we will have the valid yob
  // To avoid duplicated records (yob is null)
  const yob = estimated_birth.length === 0 ? 1900 : parseInt(estimated_birth.replace(/\/\d+/g, ''), 10);

  const variables = {
    person: {
      name_zh: name_chi ? name_chi : null,
      name_en: name_eng ? name_eng : null,
      estimated_yob: yob,
      gender: gender === '男' ? 'male' : 'female',
    }
  };

  const res = await runQuery(query, variables);
  return res.body.data.insert_dc_people.returning[0].id;
}


async function upsertAffiliation(name_zh) {
  const query = `
    mutation insertAffilation($name: String!) {
      insert_dc_political_affiliations(objects: [
        {
          name_zh: $name
        }
      ], on_conflict: {
        constraint: dc_political_affiliations_name_zh_key,
        update_columns: [ name_zh ]
      }) {
        returning {
          id
        }
      }
    }
  `;

  const variables = {
    name: name_zh,
  };

  const res = await runQuery(query, variables);
  return res.body.data.insert_dc_political_affiliations.returning[0].id;
}

async function upsertElection(personId, election) {
  const {
    year, CACODE, candi_number, occupation, win_or_not,
    political_affiliation, votes, percentage,
  } = election;

  let paId = null;
  if (political_affiliation) {
    paId = await upsertAffiliation(political_affiliation);
  }

  const query = `
    mutation insertCandidates($candidate: dc_candidates_insert_input!) {
      insert_dc_candidates(objects: [
        $candidate
      ], on_conflict: {
        constraint: dc_candidates_people_id_year_cacode_key
        update_columns: [ candidate_number, political_affiliation_id ]
      }) {
        returning {
          id
        }
      }
    }
  `;

  const variables = {
    candidate: {
      year: parseInt(year, 10),
      cacode: CACODE,
      people_id: personId,
      candidate_number: candi_number !== '' ? candi_number : null,
      occupation,
      won: win_or_not === 'Y',
      votes: votes === '' ? null : parseInt(votes, 10),
      vote_percentage: percentage === '' ? null : parseFloat(percentage),
      political_affiliation_id: paId,
    }
  };

  const res = await runQuery(query, variables);
  if (res.statusCode !== 200) {
    console.log(res.body);
  }
  return res.body.data.insert_dc_candidates.returning[0].id;
}

async function upsertConstituencyWithoutName(year, code) {
  const key = `${year}-${code}`;
  if (constituencyHash[key]) {
    return;
  }
  const query = `
  mutation insertConstituency($year: Int!, $code: String!) {
    insert_dc_constituencies(objects: {
      year: $year
      code: $code
      name_zh: ""
    } on_conflict: {
      constraint: dc_boundaries_code_year_key
      update_columns: []
    }) {
      returning {
        id
      }
    }
  }
`;

  const variables = {
    year: parseInt(year, 10),
    code,
  };
  await runQuery(query, variables);
  constituencyHash[key] = 1;
}

async function upsertConstituencyName(year, { CACODE, ENAME, CNAME}) {
  const query = `
  mutation insertConstituency($year: Int!, $code: String!, $nameZh: String!, $nameEn: String!) {
    insert_dc_constituencies(objects: {
      year: $year
      code: $code
      name_zh: $nameZh
      name_en: $nameEn
    } on_conflict: {
      constraint: dc_boundaries_code_year_key
      update_columns: [name_zh, name_en]
    }) {
      returning {
        id
      }
    }
  }
`;

  const variables = {
    year: parseInt(year, 10),
    code: CACODE,
    nameEn: ENAME,
    nameZh: CNAME,
  };
  const res = await runQuery(query, variables);
  if (res.statusCode !== 200) {
    console.log(res.body);
  }

  return res.body.data.insert_dc_constituencies.returning[0].id;
}

async function upsertConstituencyPolygon(id, polygon) {
  const query = `
  mutation insert_geometry($id: uuid!, $polygon: geometry!) {
  insert_dc_constituency_geometries( objects: [{
    constituency_id: $id
    polygon: $polygon
  }] on_conflict:{
    constraint: dc_constituency_geometries_constituency_id_key
    update_columns: [ polygon ]
  }) {
    returning {
      id
    }
  }
}
`;


  const variables = {
    id,
    polygon: {
      type: "Polygon",
      coordinates: polygon[0]
    }
  };
  const res = await runQuery(query, variables);
  if (res.statusCode !== 200) {
    console.log(res.body);
  }
}


async function insertCandidate(person) {
  try {
    const personId = await upsertPerson(person);
    for (const election of person.elections) {
      await upsertElection(personId, election);
      // in case the constituency not exists
      await upsertConstituencyWithoutName(election.year, election.CACODE);
    }
  } catch (error) {
    console.error(`Cannot insert people: ${person.name_chi}`);
    console.error(error);
  }
}

async function upsertConstituency(year, feature) {
  try {
    const constituencyId = await upsertConstituencyName(year, feature.properties);
    await upsertConstituencyPolygon(constituencyId, feature.geometry.coordinates);
  } catch (error) {
    console.error(`Cannot insert people: ${person.name_chi}`);
    console.error(error);
  }
}

module.exports = {
  insertCandidate,
  upsertConstituency,
}