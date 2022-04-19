import React from 'react'
import styles from '../styles/Nav.module.css'


function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.title_container}>
          <svg className={styles.title_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M24 24c4.42 0 8-3.59 8-8 0-4.42-3.58-8-8-8s-8 3.58-8 8c0 4.41 3.58 8 8 8zm0 4c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
          <h2 className={styles.titulo_personal}>Nombre del usuario</h2>
        </li>
        <li className={styles.cerrar_sesion_container}>
          <button type='button' title='logout' className={styles.cerrar_sesion_btn} onClick={borrarCokie}>
            <svg className={styles.cerrar_sesion_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
          </button>
          <button type='button' className={styles.cerrar_sesion} onClick={borrarCokie}>Cerrar Sesión</button>
        </li>
      </ul>
    </nav>
  )
}

const borrarCokie = async () => {
  await fetch('/api/deleteCookie')
  window.location.reload()
}

export default Nav