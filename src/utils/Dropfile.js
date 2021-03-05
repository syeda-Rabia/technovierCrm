import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback } from "react";
import { useDropzone, Dropzone } from "react-dropzone";
import Dialog from "@material-ui/core/Dialog";
import { Box, Button, Paper } from "@material-ui/core";
import * as XLSX from "xlsx";
import { Container } from "react-bootstrap";
import ApiUrls from "./../utils/ApiUrls";
import { GET, POST, formatDate,POSTFile } from "./../utils/Functions";
import SuccessNotification from "../components/SuccessNotification";
import ErrorNotification from "../components/ErrorNotification";
export default function Dropfile(props) {
  const [toggle, setToggle] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState([]);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      // reader.onload = function (e) {
      //   var data = new Uint8Array(e.target.result);
      //   var workbook = XLSX.read(data, { type: "array" });
      //    ;
      //   /* DO SOMETHING WITH workbook HERE */
      // };
      // reader.readAsArrayBuffer(file);

      reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary", cellDates: true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        /* Update state */
        let mappingData = data.slice(1, data.length).map((item) => {
          const obj = new Object();
          if (item.length > 0) {
            data[0].map((val, index) => {
              obj[val] = item[index];
            });
          }
          //  ;

          return obj;
        });
        setSelectedFile((state) => [...state, ...mappingData]);
      };
      reader.readAsBinaryString(file);
    });
  }, []);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: ".xls  , .xlsx",
    maxFiles: 1,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {/* { } */}
    </li>
  ));

  const SendFileToServer = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append("file", { 
    //   name: "record.aac",
    //   type: "audio/aac",
    //   // uri: `file://${audioPath}`,
    // });
    // formData.append("file", selectedFile);
    let data={
      data:selectedFile
    }
    console.log(selectedFile)
    // selectedFile.map((item,index)=>{
    //   formData.append(`data[${index}][interest_name]`,item.interest_name)
    //   formData.append(`data[${index}][project_name]`,item.project_name)
    //   formData.append(`data[${index}][client_name]`,item.client_name)
    //   formData.append(`data[${index}][contact]`,item.contact)
    //   formData.append(`data[${index}][country_city]`,item.country_city)
    //   formData.append(`data[${index}][time_to_call]`,item.time_to_call)
    //   formData.append(`data[${index}][budget]`,item.budget)
    // })
    //webhook
    await fetch("https://webhook.site/28e57da0-e629-45a4-83bb-d4a90d8076fc",
  // let resp=await POST(ApiUrls. POST_ADD_LEAD_USING_EXCEL_SHEET,
     {
      method: "post",
      mode: "no-cors",
      crossDomain: true,
      headers: {
        // "Content-Disposition": "attachment; filename=report.xlsx",
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    })
   
      .then((res) => {
        // return res;
      })
      .catch((error) => {
        console.error(error);
        // return error;
      });
      console.log("string",JSON.stringify(selectedFile));
        //webhook end-
        // setIsLoading(true);

        let response = await POST(ApiUrls. POST_ADD_LEAD_USING_EXCEL_SHEET, data);             
        console.log("---------excel sheet--------------",response);
        // // console.log(resp);
        setSelectedFile([])
        if (response.error === false) {
          setAlertMessage("file submitted Successfully");
          setShowSuccessAlert(true);
          props.setRefresh(state=>!state);
        } else {
          setAlertMessage("File not submitted");
          setShowErrorAlert(true);
        }
        // setIsLoading(false);
  };

  return (
    <>
      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={alertmessage}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={alertmessage}
        closeError={setShowErrorAlert}
      />
      <button
        className="btn btn-primary "
        style={{ backgroundColor: "#2258BF" }}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <FontAwesomeIcon icon={faFileExcel} />{" "}
        <span className="">Import Excel</span>
      </button>
      {toggle ? (
        <>
          <Dialog
            onClose={() => setToggle(false)}
            aria-labelledby="simple-dialog-title"
            open={toggle}
          >
            {/* <div className="dropzone  p-5 mx-auto">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  // SendFileToServer(e);
                  //  ;
                }}
              />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div> */}
            <div className="dropzone  p-5 mx-auto" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <em>(Only *.xls and *.xlsx Files will be accepted)</em>
            </div>
            <br />
            <Container>
              <h6>Accepted files</h6>
              <ul>{acceptedFileItems}</ul>
            </Container>
            {/* <div
            {...getRootProps({
              ,
            })}
          >
            <input
              type="file"
              name="file"
              onChange={(e) => {
                ReadFile(e);

                // setSelectedFile(e.target.files[0]);
                // SendFileToServer(e);
                //  ;
              }}
            />

            {/* <input
              onChange={(e) => {
                // setSelectedFile(ReadFile(e));
                ReadFile(e);

                //  ;
              }}
              className="w-100"
              {...getInputProps()}
            /> */}
            {/* <p>Drag drop files here , or click to select files</p>
            <em>(Only *.xls and *.xlsx Files will be accepted)</em>
          </div> */}{" "}
            {/* */}
            <Box display="flex" justifyContent="center">
              {/* <br />
              <h6>Accepted files</h6>
              <ul>{acceptedFileItems}</ul> */}
              {/* <h4>Rejected files</h4>
      <ul>{fileRejectionItems}</ul> */}
            </Box>
            <Button
              onClick={(e) => {
                SendFileToServer(e);
                setToggle(false);
              }}
            >
              Done
            </Button>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
