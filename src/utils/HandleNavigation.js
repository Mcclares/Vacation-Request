import {useNavigate} from 'react-router-dom';
export function HandleNavigation() {
   const navigate = useNavigate();
   const goToPage = (path) => {
      navigate(path)
   };
   return {navigate}
}