export interface IPermissions {
        leads: boolean,
        deposits: boolean,
        analytics: boolean,
        settings: boolean,
        offices: boolean,
        dashboard: boolean,
}
export interface IUser {
    full_name: string,
    title: string,
    phone: string,
    email: string,
    password: string,
    user_logo: string,
    active: boolean,
    role_id: number,
    role_name:string,
    background_color: string,
    notes: string,
    address: string,
    user_identifier: string,
    permissions: IPermissions
}

