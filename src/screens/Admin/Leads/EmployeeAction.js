import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import LeadsAdmin from "../../Admin/Leads/LeadsAdmin";
import nodata from "./../../../assests/nodata.png";
import {Row, Col} from "react-bootstrap";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(0),
  },
  resetContainer: {
    padding: theme.spacing(0),
  },
}));

function getSteps() {
  return ["Action Type", "Select Option", "What Next", "Action"];
}



function StepperUI({ label, content,length,index, data }) {
 
  function getStepContent(step) {
    switch (step) {
      case 0:
        return data.action_type;
      case 1:
        return data.select_option;
      case 2:
        return data.what_next;
      default:
        if(data.comments==null ||data.comments=="" ){
          return <div>
             <Typography>Date {data.date}</Typography>
             <Typography>Time {data.time}</Typography>
             {/* <div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"20px",justifyContent:"center",backgroundColor:"green",height}}> */}

             <div style={{width:"100%",border:"2px solid gray",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}}>
               <p style={{position:"absolute",marginTop:"13px",backgroundColor:"white"}}>Created At: {data.created_at}</p>
             </div>
            
             {/* </div> */}
          </div>
        }
        else{
          return <div>
          {data.comments}
          <div style={{width:"100%",border:"2px solid gray",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}}>
               <p style={{position:"absolute",marginTop:"13px",backgroundColor:"white"}}>Created At: {data.created_at}</p>
             </div>
          </div>
        }
        
       
    }
  }
  return (

    <>
    
    <Stepper style={{padding:0}} activeStep={index} orientation="vertical">
      {
        Array.from({length:length},(v,i)=>{
          if(i==index) {
            return  ( 
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(i)}</Typography>
                </StepContent>
              </Step>
            )
          }
          else 
          return  (<div style={{display:'none'}}/>)
        })
      }
    </Stepper>
    </>
  );
}
export default function VerticalLinearStepper(props) {
  const [data, setData] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(false);
console.log(props)
const leadID=props.location.query;
React.useEffect(() => {
  setIsLoading(true);
  if (leadID.item.id != undefined) handleFetchData();
}, []);

// React.useEffect(() => {
//   handleFetchData();
// }, []);
const history = useHistory();
const handleFetchData = async () => {

 
  let res = await GET(
    ApiUrls.GET_EMPLOYEE_LEAD_ACTION + "/" + leadID.item.id
  );
  // console.log("--",res,ApiUrls.GET_EMPLOYEE_LEAD_ACTION + "/" + leadID.item.id);
  // console.log("--",JSON.stringify(res));
  if (res.success != false) {
    setData(res.data.EmpAction);
  }
 
 
  setIsLoading(false);
};
// React.useEffect(() => {
//   handleFetchData();
// }, []);
function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

  const classes = useStyles();
  
  
  const label = ["Action Type", "Select Option", "What Next", "Action"];
  console.log("empty",data);
  
  if(data.length==0)
  { console.log("empty");
  console.log(history, "----------------------------")
   return <div>
       <Row className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-3">
         
       <IconButton
     
          onClick={() => {
            history.push("/admin/leads");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        
        <h3 style={{ color: "#818181" }}>Employee Action </h3>
      </Row>
     <div style={{ display: "block",
   marginLeft: "auto",
   marginRight: "auto",
   marginTop:"10%",
   marginBottom:"auto",
   width:"50%",
   alignItems:"center",
   justifyContent:"center",}}> 
   <img style={{ width:"100%",height: "500px" }} src={nodata} /></div>
     </div>
  }
  else
  return (
    <Container fluid>

    <div className={classes.root}>
     
       <Row className=" shadow p-3 mb-3 bg-white rounded ml-2">
       <IconButton
          onClick={() => {
            history.push("/admin/leads");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <h3 style={{ color: "#818181" }}>Employee Action </h3>
        {/* <button className="btn btn-primary mt-0" style={{float:"right"}}>Abc</button> */}
      </Row>
      {
        data.map((val)=>{
          return (<div style={{marginBottom:"40px",backgroundColor:"gray"}}>
          
          {label.map((item, index) => {
            return <StepperUI label={item} content={getStepContent(index)} data={val} length={label.length} index={index} />;
            
          })}
          </div>)
        })
      }
      {/* <div style={{ height:'5px',width:'100%',backgroundColor:'grey'}}/> */}
    </div>
    </Container>
  );
}
