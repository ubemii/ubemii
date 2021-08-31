import React, {useState} from "react";
import {Button, Table} from "antd";
import {
  DownloadOutlined,
  LockOutlined,
  UnlockOutlined,
  StopOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  PaperClipOutlined
} from "@ant-design/icons";

const CourseChaptersList = (props) => {
  const [selectedRowKeys, setSelectedRows] = useState([]);
  const lectures = props.lectures.filter(lecture => lecture._class === "lecture");
  const columns = [{
    title: 'Title',
    dataIndex: 'title',
  }, {
    title: 'Type',
    render: column => {
      let icon;
      if (!column['asset']) {
        icon = <PaperClipOutlined/>;
      } else {
        switch (column['asset']['asset_type']) {
          case "Article":
            icon = <ReadOutlined/>;
            break;
          case "Video":
            icon = <VideoCameraOutlined/>;
            break;
          default:
            icon = <PaperClipOutlined/>;
        }
      }
      return (
        <div style={{textAlign: "center"}}>
          {icon}
        </div>
      )
    }
  }, {
    title: 'DRM',
    render: column => {
      if (column['asset']) {
        return (<div style={{
          textAlign: "center"
        }}>
          {column['asset']['course_is_drmed'] ? (
            <LockOutlined style={{
              color: "red"
            }}/>
          ) : (
            <UnlockOutlined style={{
              color: "green"
            }}/>
          )}
        </div>);
      } else {
        return (<div style={{
          textAlign: "center"
        }}>
          <StopOutlined/>
        </div>)
      }
    }
  }, {
    title: 'Action',
    render: column => {
      console.log(column);
      return (
        <div>
          <Button type={"primary"}>
            <DownloadOutlined/>
          </Button>
        </div>
      )
    }
  }];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
    hideDefaultSelections: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
    ]
  };

  return (
    <Table style={{
      padding: 0
    }} columns={columns} rowSelection={rowSelection} dataSource={lectures}/>
  );
};

export default CourseChaptersList;
