import React, {useEffect, useState, Suspense} from 'react'
import CourseCard from "../../../components/custom-components/CourseCard";
import {Button, Card, Col, Collapse, Rate, Row, Tag} from "antd";
import {useParams} from "react-router-dom";
import {getCourseDetail} from "../../../services/UbemiiService";
import Loading from "../../../components/shared-components/Loading";
import {DownloadOutlined, CloudOutlined} from "@ant-design/icons";


const { Panel } = Collapse;

const CourseDetail = () => {
  let { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState({});
  useEffect(async () => {
    const detail = await getCourseDetail(courseId);
    console.log(detail);
    setCourseDetail(detail);
  }, []);

  return (
    <div>
      <Suspense fallback={<Loading cover="content"/>}>
        <h3>
          {courseDetail.title}
        </h3>
        <div style={{
          marginBottom: 16
        }}>
          <Rate allowHalf disabled defaultValue={5} value={courseDetail['avg_rating_recent']} />
        </div>
        <Row gutter={16}>
          <Col xs={16}>
            <Card>
              <h5>About</h5>
              <div style={{marginBottom: 8}}>
                <Tag color="default">
                  {courseDetail['primary_category']?.title}
                </Tag>
                <Tag color="default">
                  {courseDetail['primary_subcategory']?.title}
                </Tag>
              </div>
              <div>
                Created by {(courseDetail['visible_instructors'] || []).map((instructor, index) => {
                if (instructor && instructor.display_name) {
                  return (
                    <a key={index}>{instructor.display_name}, </a>
                  )
                }
              })}
              </div>
              <p>
                {courseDetail.headline}
              </p>
              <Collapse accordion>
                <Panel header="Course Description" key="1">
                  <div dangerouslySetInnerHTML={{
                    __html: courseDetail.description
                  }}>
                  </div>
                </Panel>
              </Collapse>
            </Card>
          </Col>
          <Col xs={8}>
            <Card bodyStyle={{
              padding: 0,
            }}>
              <img src={courseDetail.image_240x135} style={{
                width: "100%",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
              }}/>
              <div style={{
                padding: 16
              }}>
                <h5>You have purchased this course.</h5>
                <Button icon={<CloudOutlined />} block style={{marginBottom: 16}} onClick={() => {
                  const shell = window.require('electron').shell;
                  shell.openExternal(`https://www.udemy.com/${courseId}`).then(r => {
                    console.log("URL Opened");
                  });
                }}>Open this course in Browser</Button>
                <Button icon={<DownloadOutlined />} type="primary" block>Download this course</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Suspense>
    </div>
  )
}

export default CourseDetail
