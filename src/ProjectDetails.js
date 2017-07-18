import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height : 80,
    padding : 15,
    marginTop : 10,
    margnBottom : 30,
    marginLeft:5,
    marginRight:5
}

const titleStyle =
{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flexStart',
    flexGrow: 4
}

const style = {margin: 5};

class ProjectDetails extends React.Component {

    constructor(props)
    {
        super();
    }

    render()
    {
        return (
            <Paper  zDepth={1} >
            <Avatar
                color={deepOrange300}
                backgroundColor={purple500}
                size={30}
                style={style}>
                A
            </Avatar>
                <h4 style={titleStyle}> Unga </h4>       
            </Paper>
        );
    }
}

export default ProjectDetails;