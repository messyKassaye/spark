import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {ChatOutlined, Person, PostAdd } from '@material-ui/icons';
import Post from './Post';
import MatchesCard from './widgets/MatchesCard';
import Matches from './widgets/Matches';
import Messages from './widgets/Messages';
import SmallDeviceProfile from './widgets/SmallDeviceProfile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height:'100vh',
    marginTop:-20,
    backgroundColor: theme.palette.background.paper,
  },
  tabs:{
      marginRight:20
  }
}));

export default function UsersSmallDevice() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab 
          icon={<PostAdd />} aria-label="posts" {...a11yProps(0)} className={classes.tabs} />
          <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} className={classes.tabs} />
          <Tab icon={<ChatOutlined />} aria-label="chat" {...a11yProps(2)} className={classes.tabs} />
          <Tab icon={<Person />} aria-label="person" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Post/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Matches/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Messages/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SmallDeviceProfile/>
      </TabPanel>
    </div>
  );
}