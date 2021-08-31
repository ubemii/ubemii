import React, {useState} from "react";
import {Button, Table} from "antd";
import {DownloadOutlined} from "@ant-design/icons";

const CourseLecturesList = (props) => {
  const [selectedRowKeys, setSelectedRows] = useState([]);
  const columns = [{
    title: 'Index',
    dataIndex: 'index',
  }, {
    title: 'Title',
    dataIndex: 'title',
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
    }} columns={columns} rowSelection={rowSelection} dataSource={props.lectures}/>
  );
};

export default CourseLecturesList;
