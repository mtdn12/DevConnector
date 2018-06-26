import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { object, array, func, any } from 'prop-types'
import moment from 'moment'

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Button,
} from '@material-ui/core'

const EducationTable = props => {
  const { classes, items, handleDeleteEdu } = props
  return (
    <div className={classes.credentialWrapper}>
      <Typography variant="title" gutterBottom>
        Education Credentials
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>School</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Years</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell>No infomation</TableCell>
            </TableRow>
          ) : (
            items.map(item => (
              <TableRow key={item.get('_id')}>
                <TableCell>{item.get('school')}</TableCell>
                <TableCell>{item.get('degree')}</TableCell>
                <TableCell>
                  {moment(item.get('from')).format('DD-MM-YYYY')}---{item.get(
                    'current'
                  )
                    ? 'current'
                    : moment(item.get('to')).format('DD-MM-YYYY')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={() => handleDeleteEdu(item.get('_id'))}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

EducationTable.propTypes = {
  classes: object.isRequired,
  items: any.isRequired,
  handleDeleteEdu: func.isRequired,
}

export default withStyles(styles)(EducationTable)
