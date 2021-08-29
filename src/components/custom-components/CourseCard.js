import {Card, Avatar, Col} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CourseCard = (props) => {
  const course = props.course;
  return (
    <Col md={8}>
      <Card
        cover={
          <img
            alt="example"
            src={course['image_240x135']}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          title={course.title}
          description="This is the description"
        />
      </Card>
    </Col>
  );
}

export default CourseCard;
