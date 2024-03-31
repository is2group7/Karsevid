import { useState } from "react"

const initialUserForm = {
    username: '',
    email: '',
    password: '',
    r_password: '',
}

export const Formulario = () => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {username, email, password, r_password} = userForm;

    const onInputChange = ({target}) => {
        console.log(target.value)
        const {name, value} = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }
    const onSubmit = (event) => {
        event.preventDefault(); //Para evitar perdida de datos.

        if (!username.trim() || !password.trim() || !r_password.trim() || !email.trim()) {
            alert('Debe completar los campos del formulario!');
            return;
        }
        if (password !== r_password) {
            alert('Las contraseñas deben coincidir.');
            return;
        }
        console.log(userForm);
        //Guardar el user form en el listado de usuarios.
        setUserForm(initialUserForm);
    }
    return (
        <form onSubmit={onSubmit}>
            <h3>Registrarse</h3>
            <p>Crea tu cuenta</p>
            <input
                className="form-control my-3 w-75"
                placeholder="Nombre de Usuario"
                name="username"
                value={ username}
                onChange={onInputChange} />
            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <input
                className="form-control my-3 w-75"
                placeholder="Contraseña"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange} />
            <input
                className="form-control my-3 w-75"
                placeholder="Confirmar contraseña"
                type="password"
                name="r_password"
                value={r_password}
                onChange={onInputChange} />
            <button
                className="btn btn-primary"
                type="submit">
                Regístrate
            </button>

        </form>
    )
}