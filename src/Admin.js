import React from 'react';
//  import './Admin.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

var data = require('./fakeusers.json');



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
  const [fileName, setfileName]= React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let fileReader;
  
  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(JSON.parse(content))
    // console.log(Object.entries(content))
    // … do something with the 'content' …
  };
  
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className={classes.root}  >
      <AppBar position="static" style={{width:"100vw"}}>
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
        <input
            type='file'
            id='file'
            className='input-file'
            accept='.json'
            onChange={e => handleFileChosen(e.target.files[0])}
          />
            </div>

   
      </TabPanel>
      <TabPanel value={value} index={2}>
        Evaluate page link goes here
        <div>
        <TableContainer style={{width:"70vw",margin:"auto"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>e-Mail</TableCell>
            <TableCell align="right">MCQ Marks</TableCell>
            <TableCell align="right">Descriptive Marks</TableCell>
            <TableCell align="right">Status</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          
        {data.map((row) => (
            <TableRow key={row.UserID}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.mcqmark}</TableCell>
              <TableCell align="right">{row.descmark}</TableCell>
              <TableCell align="right">{row.status===true?"evaluated":<button style={{width:"100px",fontSize:"15px"}}>Evaluate</button>}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
          </div>
      </TabPanel>



      <TabPanel value={value} index={3}>
        Result page link goes here
        <div>
        <TableContainer style={{width:"70vw",margin:"auto"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>e-Mail</TableCell>
            <TableCell align="right">MCQ Marks</TableCell>
            <TableCell align="right">Descriptive Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.filter(item => 
    item.descmark>0).map(row => (
      <TableRow key={row.UserID}>
      <TableCell component="th" scope="row">
        {row.email}
      </TableCell>
      <TableCell align="right">{row.mcqmark}</TableCell>
      <TableCell align="right">{row.descmark}</TableCell>
    </TableRow>
  ))}
  </TableBody>
      </Table>
    </TableContainer>
          </div>
      </TabPanel>
    </div>
  );
}