export interface InterfazUsuario {
    id: string;
    nom_usuario: string;
    nombres: string;
    apellidos: string;
    dir_correo: string;
    pass_usuario: string;
    tableros: string[];
}

export interface TableroState {
	// eslint-disable-next-line @typescript-eslint/ban-types
	usuarios: {
		[usuarioID: string]: InterfazUsuario;
	};
}

export enum UsuarioActionTypes {
    ADD_ESPACIO= "ADD_ESPACIO",


}