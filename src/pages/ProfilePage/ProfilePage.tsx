import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'

import auth from '../../db/auth'
import { LOGO_COLOR_DARK } from '../../constants'
import { Logo } from '../../components/Logo/Logo'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { UserCourses } from '../../components/UserCourses/UserCourses'
import { ReactComponent as ReactLogo } from './assets/arrow.svg'

import styles from './style.module.css'

export const ProfilePage: FC = () => {
  const [currentUser, setCurrentUser] = useState<User>()
  
  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(undefined)
      }
    })
        
    return () => {
      listener()
    }
  }, [])

  if(!currentUser) return <p>ERROR: No currentUser</p>

  return (
    <div className={styles.profilePage}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <Link to="/">
            <Logo color={LOGO_COLOR_DARK} />
          </Link>
          <div className={styles.navUser}>
            <div className={styles.navUserAvatar} />
            <div className={styles.navUserName}>
              {currentUser.displayName || currentUser.email}
            </div>
            <ReactLogo />
          </div>
        </nav>
        <UserInfo user={currentUser}/>
        <UserCourses user={currentUser}/>
      </div>
    </div>
  )
}