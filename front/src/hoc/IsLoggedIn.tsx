import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkMe } from '../utils/fetch';
import { useDispatch } from 'react-redux';
import { setUserAC } from '../state/reducers/user-reducer';

const IsLoggedIn = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkMe().then((response: any) => {
          if (response) {
            dispatch(setUserAC(response))
          }else {
            navigate('/login')
          }
        })
    }, [])
  return (
    <>{props.children}</>
  )
}

export default IsLoggedIn