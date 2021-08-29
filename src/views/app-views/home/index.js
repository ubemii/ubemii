import React, {useEffect, useState} from 'react'
import {
  getSubscribedCourseCategories,
  getSubscribedCourses,
  getSubscribedInstructors
} from "../../../services/UbemiiService";
import CourseCard from "../../../components/custom-components/CourseCard";
import {Row} from "antd";

const Home = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getSubscribedCourses().then(async courses => {
      const instructors = await getSubscribedInstructors();
      const categories = await getSubscribedCourseCategories();
      setCourses(courses);
    });
  }, []);
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
