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

module.exports = {
  GetUdemyToken,
  GetSubscribedCourses,
  GetSubscribedCourseCategories,
  GetSubscribedInstructors
}
