export interface user {
    id: number,
    name: string,
    lastname: string,
    age: number,
    phoneNumber: number,
    engineering: string,
    experienceYear: number
}

export interface  responsePg{
    data: user[],
    pageSize: number,
    length: number,
    numberPage: number
}