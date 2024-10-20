import {useHistory} from 'react-router-dom';
export function handleNavigation() {
   const history = useHistory();
   const navigate = (path) => {
      history.push(path)
   };
   return {navigate}
}