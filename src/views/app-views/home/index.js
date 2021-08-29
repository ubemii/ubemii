import React, {useEffect, useState} from 'react'
import {
  getSubscribedCourseCategories,
  getSubscribedCourses,
  getSubscribedInstructors
} from "../../../services/UbemiiService";
import CourseCard from "../../../components/custom-components/CourseCard";
import {Row} from "antd";
import {useSelector} from "react-redux";

const Home = () => {
  const {courses} = useSelector(state => state.courses);

  return (
    <div>
      <Row gutter={16}>
        {courses.map((course, index) => (
          <CourseCard course={course} key={index}/>
        ))}
      </Row>
    </div>
  )
}

export default Home
