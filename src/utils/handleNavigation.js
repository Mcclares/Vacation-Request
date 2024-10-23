import {useNavigate} from 'react-router-dom';
export function handleNavigation() {
   const navigate = useNavigate();
   const goToPage = (path) => {
      navigate(path)
   };
   return goToPage;
}