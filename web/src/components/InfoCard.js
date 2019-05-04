import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import StarIcon from '@material-ui/icons/Star'
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {    
        width: '400px',
        position: 'absolute',
        top: '20%',
        left: '100px'
    },
    pos: {
        marginBottom: 12,
    },
}


const candiNumMapping = {
        1: '①',
        2: '②',
        3: '③',
        4: '④',
        5: '⑤',
        6: '⑥',
        7: '⑦',
        8: '⑧',
        9: '⑨',
        10: '⑩'
}

const SimpleCard = props => {
    const { classes, electors, year, cacode } = props

    const yearIndex = electors.findIndex(o => o.year === parseInt(year))

    const result = yearIndex > -1 ? electors[yearIndex].election.find(e => e.cacode === cacode) : false
    
    return (
        <React.Fragment>
            {result && <Card className={classes.card}>
                <CardContent>
                    <Typography variant="subtitle1" color="textSecondary" >
                        {year}
                    </Typography>
                    <Typography variant="h6">
                        {result.cacode} {result.cname}
                    </Typography>
                    <Typography variant="subtitle2">
                        {result.ename}
                    </Typography>
                    <List>
                    {
                        result.candidates.map(candi => <ListItem alignItems="flex-start" key={`${candi.number}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${candi.number > 0 ? candiNumMapping[candi.number] : ''} ${candi.cName} ${candi.eName}`}
                                secondary={candi.vote > 0 ? `${candi.vote}票` : '自動當選'}
                            />
                            {candi.win &&
                            <ListItemSecondaryAction>
                                <StarIcon color="secondary" />
                            </ListItemSecondaryAction>}
                        </ListItem>)

                    }
                </List>
                </CardContent>
            </Card>}
        </React.Fragment>
    )
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)