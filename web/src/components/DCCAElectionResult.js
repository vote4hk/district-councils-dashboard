
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const DCCAElectionResult = (props) => {
    const { electors, year, cacode } = props
    const yearIndex = electors.findIndex(o => o.year === parseInt(year))
    const result = yearIndex > -1 ? electors[yearIndex].election.find(e => e.cacode === cacode) : false
    return (
        <React.Fragment>
            {`${result.cacode}`} <br />
            {`${result.cname} ${result.ename}`} <br />
            {result &&
                <List>
                    {
                        result.candidates.map(r => <ListItem key={`${r.number}`}>
                            <ListItemText
                                primary={`${r.number > 0 ? r.cName : ''} ${r.eName}`}
                                secondary={r.vote > 0 ? `${r.vote}票` : '自動當選'}
                            />
                        </ListItem>)

                    }
                </List>}
        </React.Fragment>
    )
}

export default DCCAElectionResult