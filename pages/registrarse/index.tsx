import React, { SyntheticEvent, useState } from 'react'
import styles from '../../styles/Registrarse.module.css'

function Registro() {

  const [image, setImage] = useState<File>()

  const uploadToClient = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (target.files && file) {

      setImage(file);      
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    let body = new FormData(event.target as HTMLFormElement)

    if(image){
      body.append('image', image, image.name)
    }
  
    const response = await fetch('/api/user', {
      method: 'POST',
      body
    })
    const auth: boolean = response.status === 200
  
    if (auth) {
      alert('Registro exitoso')
      return
    }
  
    alert('Error al registrarse')
  }
  

  return (
    <div className={styles.container}>
      <a href="/" className={styles.volver}>Volver</a>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <h1>Registrarse</h1>
        <label htmlFor="nombre">Nombre*</label>
        <input type="text" name="nombre" id="nombre" placeholder='Nombre' required />

        <label htmlFor="apellido">Apellido*</label>
        <input type="text" name="apellido" id="apellido" placeholder='Apellido' required />

        <label htmlFor="correo">Correo*</label>
        <input type="email" name="correo" id="correo" placeholder='Correo' required />

        <label htmlFor="contraseña">Contraseña*</label>
        <input type="password" name="contraseña" id="contraseña" placeholder='Contraseña' required />

        <label htmlFor="foto">Foto</label>
        <input type="file" name="foto" id="foto" accept="image/*" onChange={uploadToClient}/>

        <button type="submit">Registrarse</button>

        <p className={styles.requerido}>* Dato requerido</p>
      </form>
    </div>
  )
}

export default Registro
