import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboad from './../Pages/Dashboard/index';
import List from './../Pages/List/index';
import Layout from './../components/Layout/index';


const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/dashoboard" exact component={Dashboad} />
        <Route path="/list/:type" exact component={List} />
      </Switch>
    </Layout>
  )
}

export default AppRoutes;