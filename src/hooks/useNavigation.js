import {useNavigate} from 'react-router-dom';
export function useNavigation() {
   const navigate = useNavigate();
   const goToPage = (path) => {
      navigate(path)
   };
   return goToPage;
}