import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {CTX} from'./Store'


const useStyles = makeStyles(theme => ({
  root: {
  	margin:'50px',
    padding: theme.spacing(3, 2),
  },
  flex: {
  	display: 'flex',
  	alignItems: 'center'
  },

  topicsWindow:{
  	width:'30%',
    height:'300px',
    borderRight: '1px solid grey'
  },

  chatWindow:{
    width:'70%',    
    height:'300px',
    padding:'20px'
  },
    chatBox:{
    width:'85%'
  },

  button:{
    width:'15%'
  }


}));

export default function Dashboard()
{


	const classes = useStyles();

	const {allChats, sendChatAction, user} = React.useContext(CTX);

	const topics = Object.keys(allChats);

    const [activeTopic,changeActiveTopic]= React.useState(topics[0])

	const [textValue, changeTextValue] = React.useState('');

	return (
		<div>
		    <Paper className={classes.root}>
				      <Typography variant="h5" component="h4">
				        CHAT APP
				      </Typography>

				      <Typography variant="h5" component="h3">
				       {activeTopic}
				      </Typography>

				 <div className={classes.flex}>

                        <div className={classes.topicsWindow}>                     
		                    <List>              
                             {
						        topics.map(topic=>(
						        	<ListItem  onClick={(e =>changeActiveTopic(e.target.innerText))} key={topic} button>
						        		<ListItemText primary={topic}/>

					        		</ListItem>

						        ))

						    }
		                     </List>
				      	</div>

			      		<div className={classes.chatWindow}>


                        <List>              

						        {
						        	allChats[activeTopic].map((chat, i)=>(

						        	 <div classeName={classes.flex} key={i}>

						        	 <Chip label={chat.from} />

				   				   <Typography variant="p">{chat.msg}</Typography>


						        	 </div>

						        	))
						        }
		                     </List>


			      		</div>

				 </div>

 				<div className={classes.flex}>
                    <TextField
				          id="standard-basic"
				          className={classes.chatBot}
				          label="transferer la discussion"
				          //margin="normal"
				          onChange ={ e=>changeTextValue(e.target.value)}
				        />

				    <Button 
				    variant="contained" 
				    color="primary"
				     className={classes.button}
                      onClick={()=> {
                      	sendChatAction({from:user, msg:textValue, topic:activeTopic});
                      	changeTextValue('');
                      }
                  }>

				       send
				      </Button>
 

				     

				 </div>
		    </Paper>


		</div>
	)
}

