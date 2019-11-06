import React from 'react'
import DCSearchBox from 'components/organisms/SearchAllBox'
import { PeopleOption } from 'components/molecules/SearchBoxOption'

export default { title: 'Search' }

export const Search = () => <DCSearchBox></DCSearchBox>
export const People = () => (
  <PeopleOption
    data={{
      uuid: 'a2d7c7d9-85d1-4b24-a233-153dd3987c53',
      name_zh: 'Test Name',
    }}
  ></PeopleOption>
)
