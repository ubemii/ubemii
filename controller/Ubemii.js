const axios = require("axios");
const {GetCookies, GetLoginState} = require("./utils");
const UDEMY_API_BASE = "https://www.udemy.com/api-2.0";

const GetUdemyToken = async () => {
  if (await GetLoginState()) {
    const cookies = await GetCookies();
    return cookies.find(x => x.name === "access_token").value;
  } else {
    throw Error("Unauthorized.");
  }
};

const GetSubscribedCourses = async (limit) => {
  const params = `ordering=-last_accessed&fields[course]=@min,categories,visible_instructors,image_240x135,favorite_time,archive_time,completion_ratio,last_accessed_time,enrollment_time,is_practice_test_course,features,num_collections,published_title,is_private,is_published,buyable_object_type&fields[user]=@min,job_title&page=1&page_size=${limit}&is_archived=false`;
  const token = await GetUdemyToken();
  return await axios.get(UDEMY_API_BASE + "/users/me/subscribed-courses/?" + params, {
    headers: {
      "authorization": "Bearer " + token,
      "x-udemy-authorization": "Bearer " + token,
      "origin": "https://www.udemy.com"
    }
  });
}

const GetSubscribedCourseCategories = async () => {
  const params = `[course_category]=id,title&previewing=false&page_size=15&is_archived=false`;
  const token = await GetUdemyToken();
  return await axios.get(UDEMY_API_BASE + "/users/me/subscribed-courses-categories/?" + params, {
    headers: {
      "authorization": "Bearer " + token,
      "x-udemy-authorization": "Bearer " + token,
      "origin": "https://www.udemy.com"
    }
  });
}

const GetSubscribedInstructors = async (limit = 500) => {
  const params = `page=1&page_size=${limit}&is_archived=false`;
  const token = await GetUdemyToken();
  return await axios.get(UDEMY_API_BASE + "/users/me/subscribed-courses-instructors/?" + params, {
    headers: {
      "authorization": "Bearer " + token,
      "x-udemy-authorization": "Bearer " + token,
      "origin": "https://www.udemy.com"
    }
  });
}

const GetCourseDetail = async (courseId) => {
  console.log("Course ID", courseId);
  const params = `fields[course]=title,url,headline,image_240x135,context_info,primary_category,primary_subcategory,avg_rating_recent,visible_instructors,locale,estimated_content_length,num_subscribers,description`;
  const token = await GetUdemyToken();
  return await axios.get(UDEMY_API_BASE + `/courses/${courseId}/?` + params, {
    headers: {
      "authorization": "Bearer " + token,
      "x-udemy-authorization": "Bearer " + token,
      "origin": "https://www.udemy.com"
    }
  });
}

const GetCourseChapters = async (courseId) => {
  const params = `page_size=1400&fields[lecture]=title,object_index,is_published,sort_order,created,asset,supplementary_assets,is_free&fields[quiz]=title,object_index,is_published,sort_order,type&fields[practice]=title,object_index,is_published,sort_order&fields[chapter]=title,object_index,is_published,sort_order&fields[asset]=title,filename,asset_type,status,time_estimation,is_external&caching_intent=True`;
  const token = await GetUdemyToken();
  return await axios.get(UDEMY_API_BASE + `/courses/${courseId}/subscriber-curriculum-items/?` + params, {
    headers: {
      "authorization": "Bearer " + token,
      "x-udemy-authorization": "Bearer " + token,
      "origin": "https://www.udemy.com"
    }
  });
}

// TODO: get lecture - https://www.udemy.com/api-2.0/users/me/subscribed-courses/947098/lectures/16888054/?fields[lecture]=asset,description,download_url,is_free,last_watched_second&fields[asset]=asset_type,length,media_license_token,course_is_drmed,media_sources,captions,thumbnail_sprite,slides,slide_urls,download_urls&q=0.6919867670251394

module.exports = {
  GetUdemyToken,
  GetSubscribedCourses,
  GetSubscribedCourseCategories,
  GetSubscribedInstructors,
  GetCourseDetail,
  GetCourseChapters
}
