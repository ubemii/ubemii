import {Card, Avatar, Col} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, EyeOutlined } from '@ant-design/icons';
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from "../../configs/AppConfig";
import {useHistory} from "react-router-dom";
const { Meta } = Card;

const CourseCard = (props, context) => {
  const course = props.course;
  const instructors = course['visible_instructors'].map(instructor => instructor['display_name']);
  const history = useHistory();
  const OpenCourse = () => {
    history.push(APP_PREFIX_PATH + "/course/" + course.id + "/");
  };

  return (
    <Col sm={12} lg={8} xxl={4}>
      <Card
        style={{
          flexGrow: 1,
          cursor: "pointer"
        }}
        cover={
          <img
            alt="example"
            src={course['image_240x135']}
            onClick={OpenCourse}
          />
        }
        actions={[
          <EyeOutlined key="eye" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          title={course.title}
          description={"Instructors: " + instructors.join(', ')}
          onClick={OpenCourse}
        />
      </Card>
    </Col>
  );
}

export default CourseCard;
