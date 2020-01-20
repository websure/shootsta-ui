import React from 'react';
import { withRouter } from 'react-router';

const useRouter = (component: React.FC) => {
    let Comp = withRouter(component)
    return <Comp />
};

export default useRouter;