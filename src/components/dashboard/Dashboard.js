import React from 'react'
import DateFilter from './DateFilter'
import Summary from './Summary'
import {makeStyles, Box} from '@material-ui/core'
import Graph from './Graph'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: '20px'
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    graph: {
        border: 'solid',
        borderColor: 'white',
        borderWidth: '1px',

    }
})

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root} boxShadow={4}>
            <div className={classes.header}>
                <Summary />
                <DateFilter />
            </div>

            <Graph className={classes.graph}/>
        </Box>
    )
}

export default Dashboard
