import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "./editTable";

export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          editable: true,
        },
        {
          title: "Project Name",
          dataIndex: "projectName",
          editable: true,
        },
        {
          title: "Area",
          dataIndex: "area",
          editable: true,
        },
        {
          title: "Budget",
          dataIndex: "budget",
          editable: true,
        },
        {
          title: "Time",
          dataIndex: "time",
          editable: true,
        },
        {
          title: "Assigned Person ",
          dataIndex: "assignedPerson",
          editable: true,
        },
        {
          title: "Phone Number",
          dataIndex: "contact",
          editable: true,
        },
        {
          title: "Country/City",
          dataIndex: "city",
          editable: true,
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) =>
            this.state.rows.length >= 1 ? (
              <Popconfirm
                placement="left"
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <DeleteOutlined
                  type="delete"
                  style={{ color: "red", fontSize: "20px" }}
                />
              </Popconfirm>
            ) : null,
        },
      ],
    };
  }

  handleSave = (row) => {
    const newData = [...this.state.rows];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    return errorMessage;
  }

  fileHandler = (fileList) => {
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!",
      });
      return false;
    }
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!",
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              id: row[0],
              projectName: row[1],
              area: row[2],
              budget: row[3],
              time: row[4],
              assignedPerson: row[5],
              contact: row[6],
              city: row[7],
            });
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!",
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null,
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {
    //submit to API
    //if successful, banigate and clear the data
    //this.setState({ rows: [] })
  };

  handleDelete = (key) => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter((item) => item.key !== key) });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.state.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <>
        <Row gutter={16}>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  style={{ marginBottom: 16, marginLeft: 10 }}
                >
                  Submit Data
                </Button>
              </>
            )} */}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              {/* <Icon type="upload" /> Click to Upload Excel File */}
              {/* < style={{ marginBottom: "5px" }} /> */}
              Upload
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </>
    );
  }
}
