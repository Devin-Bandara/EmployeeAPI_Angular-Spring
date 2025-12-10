export interface Department {
id: number;
name: string;
// add other fields if backend returns them
}

export interface GetAllDepartments{
    depName:string
}

export interface AddDepartment{
    depName:string
}

export interface GetDepartmentByIdResponse {
    depID: number,
    depName: string
}

export interface GetAllDepartmentsResponse {
    depID: number,
    depName: string
}

export interface UpdateDepartmentRequest {
    depName: string
}