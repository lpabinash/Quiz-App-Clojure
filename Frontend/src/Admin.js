import React from 'react';
 import './Admin.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} >
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Upload" {...a11yProps(1)} />
          <Tab label="Evaluate" {...a11yProps(2)} />
          <Tab label="Result" {...a11yProps(3)} />

            <button  className="log" href = "/login/" > Logout </button>

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
<h1>Welcome Admin</h1>

<h4>You can Upload, Evaluate or see the results by navigating the tabs above</h4>


</TabPanel>
      
      <TabPanel value={value} index={1}>
        Click to upload a file.
        <div>
                <input type="file" />
                <button > 
                  Upload
                </button>
            </div>

   
      </TabPanel>
      <TabPanel value={value} index={2}>
        Evaluate page link goes here
      </TabPanel>
      <TabPanel value={value} index={3}>
        Result page link goes here
      </TabPanel>
    </div>
  );
}