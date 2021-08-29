import React, {useEffect, useState} from 'react'
import CourseCard from "../../../components/custom-components/CourseCard";
import {Col, Row} from "antd";
import {useParams} from "react-router-dom";

const CourseDetail = () => {
  let { courseId } = useParams();

  return (
    <div>
      <Row>
        <Col xs={18}>
          <h1>
            {courseId}
          </h1>
        </Col>
        <Col xs={6}>

        </Col>
      </Row>
    </div>
  )
}

export default CourseDetail
