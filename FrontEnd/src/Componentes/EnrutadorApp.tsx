import React from "react";
import { rutas } from "../Rutas/index";
import { Switch, Route, Redirect } from "react-router";

// Componente que maneja las rutas de la aplicación

const EnrutadorApp = () => {
    return (
        <Switch>
            {rutas.map((ruta) => (
                <Route
                    key= {ruta.path}
                    component = {ruta.componente}
                    path= {ruta.path}
                    exact= {ruta.exacta}
                />
            ))}
            {/* Redirige a la main si ninguna ruta coincide */}
            <Redirect to="/" />
        </Switch>
    );
};

export default EnrutadorApp;
