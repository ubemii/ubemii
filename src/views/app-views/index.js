import React, {lazy, Suspense, useEffect, useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import {
  getSubscribedCourseCategories,
  getSubscribedCourses,
  getSubscribedInstructors, getToken
} from "../../services/UbemiiService";
import {setSubscribedCategories, setSubscribedCourses, setSubscribedInstructors} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {authenticated} from "../../redux/actions/Auth";

export const AppViews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getSubscribedCourses().then(async courses => {
      const instructors = await getSubscribedInstructors();
      const categories = await getSubscribedCourseCategories();
      const token = await getToken();
      dispatch(authenticated(token));

      setSubscribedCourses(courses);
      setSubscribedInstructors(instructors);
      setSubscribedCategories(categories);
    });
  }, []);
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/downloads`} component={lazy(() => import(`./downloads`))} />
        <Route path={`${APP_PREFIX_PATH}/course/:courseId/`} component={lazy(() => import(`./course`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
