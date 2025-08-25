export interface Userlist{
    success: boolean,
    users: [
        {
            kycDetails: {
                status: string
            },
            _id: string,
            name: string,
            username: string,
            email: string,
            role: string,
            isActive: boolean,
            isKycCompleted: boolean,
            country:string,
            contact:string,
            createdAt: string,
            updatedAt: string,
            __v: number
        }
    ]
}
export interface UserDelete {
  success: false;
  message: string;
}
export interface Viewuserlist{
    success: boolean,
    data:
        {
            kycDetails: {
                status: string
            },
            _id: string,
            name: string,
            username: string,
            email: string,
            role: string,
            isActive: boolean,
            isKycCompleted: boolean,
            country:string,
            contact:string,
            createdAt: string,
            updatedAt: string,
            __v: number
        },
        statusCode:number
}
export type UserListResponse = Userlist;
export type UserDeleteResponse = UserDelete;
export type UserViewResponse = Viewuserlist;
